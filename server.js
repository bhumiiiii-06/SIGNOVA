import express from "express";
import cors from "cors";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import dotenv from "dotenv";
import Groq, { toFile } from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 3001;

const currentFile = fileURLToPath(import.meta.url);
const projectDirectory = path.dirname(currentFile);
const predictionScript = path.join(
  projectDirectory,
  "ml_model",
  "predict_model.py"
);

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);
app.use(express.json({ limit: "25mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "SAMVAAD backend is running",
    llmEngineReady: Boolean(groq),
    whisperReady: Boolean(groq),
  });
});

async function translateToISL(text) {
  if (!groq) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const systemPrompt = `You are an expert Indian Sign Language (ISL) linguist and translator.
Convert the given English text into an authentic Indian Sign Language (ISL) Gloss sequence.

ISL Grammar Rules:
1. Sentence Order: Time -> Location/Place -> Subject -> Object -> Action/Verb (TSOV).
2. Elimination: Remove all English function words, articles (a, an, the), prepositions (in, at, on, to, for, due to, with), and auxiliary/linking verbs (is, are, was, were, will, have, has, been, be, remain).
3. Glossing: Use capitalized root words for all glosses (e.g., TOMORROW, MUMBAI, HEAVY, RAIN, FLOOD, SCHOOL, CLOSE).
4. Put negation (NOT, NONE) near the action/verb.
5. Provide a JSON response strictly matching this structure:
{
  "gloss_sequence": ["UPPERCASE_WORD1", "UPPERCASE_WORD2"],
  "grammar_breakdown": [
    {
      "role": "Time" | "Location" | "Subject" | "Object" | "Action" | "Context" | "Modifier",
      "gloss": "UPPERCASE_WORD",
      "source": "Corresponding English word or phrase"
    }
  ],
  "grammar_notes": "A concise explanation of the linguistic transformation from English SVO to ISL TSOV order, highlighting omitted auxiliary words and word order adjustments.",
  "simplified_text": "Readable ISL gloss string"
}`;

  const models = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b"];
  let lastError = null;

  for (const model of models) {
    try {
      const completion = await groq.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Translate this news text to ISL gloss:\n"${text}"` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      return parsed;
    } catch (err) {
      console.warn(`Groq model ${model} failed, trying next:`, err.message);
      lastError = err;
    }
  }

  throw lastError;
}

function runPythonModel(text, res) {
  const python = spawn("python", [predictionScript, text], {
    cwd: projectDirectory,
    windowsHide: true,
  });

  let output = "";
  let errorOutput = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  python.on("error", (error) => {
    console.error("Could not start Python:", error.message);
    if (!res.headersSent) {
      res.status(500).json({
        error: "Could not start Python. Check your Python installation.",
      });
    }
  });

  python.on("close", (code) => {
    if (res.headersSent) return;

    if (code !== 0) {
      console.error("SAMVAAD prediction failed:", errorOutput);
      return res.status(500).json({
        error: "The word-recognition model could not process the input.",
      });
    }

    try {
      const result = JSON.parse(output.trim());
      console.log("SAMVAAD Python ML input:", text);
      console.log("SAMVAAD Python ML concepts:", result.gloss_sequence);

      return res.json({
        ...result,
        mode: "PYTHON_ML_MODEL",
        grammar_notes: "Processed via SAMVAAD character n-gram LinearSVC word classifier.",
      });
    } catch (error) {
      console.error("Invalid Python output:", output);
      return res.status(500).json({
        error: "The model returned an invalid response.",
      });
    }
  });
}

// 1. Text Translation to ISL Endpoint
app.post("/api/translate", async (req, res) => {
  const text = req.body?.text;
  const requestedMode = req.body?.mode || "auto"; // "sentence", "word", or "auto"

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      error: "Please enter a word or sentence.",
    });
  }

  if (text.length > 2000) {
    return res.status(400).json({
      error: "Input must be under 2000 characters.",
    });
  }

  const wordCount = text.trim().split(/\s+/).length;
  const isSentence = wordCount > 2 || /[.,!?;]/.test(text);

  // If sentence translation is explicitly requested, or auto-detected with > 2 words
  if ((requestedMode === "sentence" || (requestedMode === "auto" && isSentence)) && groq) {
    try {
      console.log(`[SAMVAAD] Translating full sentence via Groq ISL Engine (${wordCount} words):`, text);
      const islResult = await translateToISL(text);

      return res.json({
        mode: "ISL_GRAMMAR_LLM",
        gloss_sequence: islResult.gloss_sequence || [],
        grammar_breakdown: islResult.grammar_breakdown || [],
        grammar_notes: islResult.grammar_notes || "Restructured to Indian Sign Language TSOV grammatical order.",
        simplified_text: islResult.simplified_text || (islResult.gloss_sequence || []).join(" "),
        unsupported: [],
      });
    } catch (llmError) {
      console.error("[SAMVAAD] Groq translation failed, falling back to ML model:", llmError.message);
      // Fallback gracefully to Python model
    }
  }

  // Word-by-word classification via scikit-learn
  runPythonModel(text, res);
});

// 2. Whisper Speech-to-Text Audio Transcription Endpoint
app.post("/api/transcribe-audio", async (req, res) => {
  const { audioBase64, mimeType = "audio/webm" } = req.body || {};

  if (!audioBase64) {
    return res.status(400).json({ error: "No audio data provided." });
  }

  if (!groq) {
    return res.status(500).json({ error: "Groq Whisper API is not configured." });
  }

  try {
    const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
    const audioBuffer = Buffer.from(base64Data, "base64");
    const extension = mimeType.includes("mp3") ? "mp3" : mimeType.includes("wav") ? "wav" : "webm";
    const file = await toFile(audioBuffer, `speech_input.${extension}`);

    console.log(`[SAMVAAD Whisper] Transcribing audio buffer (${audioBuffer.length} bytes)...`);
    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3-turbo",
      language: "en",
      temperature: 0.2,
    });

    console.log("[SAMVAAD Whisper] Transcribed text:", transcription.text);
    return res.json({
      text: transcription.text,
      language: "en",
    });
  } catch (err) {
    console.error("[SAMVAAD Whisper Error]:", err.message);
    return res.status(500).json({
      error: "Audio transcription failed. " + err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`SAMVAAD backend running at http://localhost:${PORT}`);
  console.log(`ISL Grammar Engine: ${groq ? "ENABLED (Groq LLM)" : "DISABLED (No API Key)"}`);
  console.log(`Whisper Speech Engine: ${groq ? "ENABLED (whisper-large-v3-turbo)" : "DISABLED"}`);
});
