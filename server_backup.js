
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const conceptDictionary = {
  rainfall: "RAINFALL",
  rain: "RAIN",
  precipitation: "PRECIPITATION",
  mumbai: "MUMBAI",
  tomorrow: "TOMORROW",
  school: "SCHOOL",
  schools: "SCHOOL",
  flooding: "FLOOD",
  flood: "FLOOD",
};

app.get("/api/health", (req, res) => {
  res.json({ status: "SIGNOVA backend is running" });
});

app.post("/api/translate", (req, res) => {
  const text = req.body?.text;

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      error: "Please enter a supported word.",
    });
  }

  if (text.length > 1000) {
    return res.status(400).json({
      error: "Input must be under 1000 characters.",
    });
  }

  // Match the user's input against the supported vocabulary.
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  const glossSequence = [];
  const unsupported = [];
  const seen = new Set();

  for (const word of words) {
    const label = conceptDictionary[word];

    if (label) {
      if (!seen.has(label)) {
        glossSequence.push(label);
        seen.add(label);
      }
    } else if (!unsupported.includes(word)) {
      unsupported.push(word);
    }
  }

  console.log("SIGNOVA input:", text);
  console.log("SIGNOVA concepts:", glossSequence);

  return res.json({
    gloss_sequence: glossSequence,
    unsupported,
  });
});

app.listen(PORT, () => {
  console.log(`SIGNOVA backend running at http://localhost:${PORT}`);
});
