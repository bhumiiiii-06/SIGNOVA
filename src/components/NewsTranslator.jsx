import { useState, useRef, useEffect } from "react";
import SigningAvatar from "./SigningAvatar";
import ConceptSignVisualizer from "./ConceptSignVisualizer";
import { getConceptSign } from "../data/islConceptSigns";
import "./NewsTranslator.css";

const conceptCategories = {
  // Weather
  RAIN: "Weather",
  RAINFALL: "Weather",
  PRECIPITATION: "Weather",
  STORM: "Weather",
  CYCLONE: "Weather",
  DROUGHT: "Weather",

  // Disasters
  FLOOD: "Disaster",
  FLOODING: "Disaster",
  LANDSLIDE: "Disaster",
  EARTHQUAKE: "Disaster",
  TSUNAMI: "Disaster",
  WARNING: "Disaster",
  RESCUE: "Disaster",

  // Locations
  MUMBAI: "Location",
  INDIA: "Location",
  DELHI: "Location",
  PUNE: "Location",
  VILLAGE: "Location",
  CITY: "Location",

  // Time
  TODAY: "Time",
  TOMORROW: "Time",
  YESTERDAY: "Time",
  MORNING: "Time",
  EVENING: "Time",
  NIGHT: "Time",

  // Education
  SCHOOL: "Education",
  SCHOOLS: "Education",
  COLLEGE: "Education",
  STUDENT: "Education",
  TEACHER: "Education",
  EXAM: "Education",

  // Health
  HOSPITAL: "Health",
  DOCTOR: "Health",
  HEALTH: "Health",
  MEDICINE: "Health",
  EMERGENCY: "Health",

  // Transport
  TRAIN: "Transport",
  BUS: "Transport",
  ROAD: "Transport",
  TRAFFIC: "Transport",
  AIRPORT: "Transport",

  // Government & public
  GOVERNMENT: "Government",
  POLICE: "Government",
  PUBLIC: "Government",
  ANNOUNCEMENT: "Government",
  HELP: "Government",

  // Environment
  ENVIRONMENT: "Environment",
  POLLUTION: "Environment",
  WATER: "Environment",
  AIR: "Environment",
  TEMPERATURE: "Environment",

  // General news
  NEWS: "General News",
  ALERT: "General News",
  UPDATE: "General News",
  IMPORTANT: "General News",
  INFORMATION: "General News",
  CLOSE: "Action",
  CLOSED: "Action",
  STOP: "Action",
};

const sampleNews = [
  {
    title: "🌧️ Mumbai Rain & Flood Warning",
    text: "Heavy rain in Mumbai tomorrow, schools will remain closed due to flood warning.",
    color: "var(--pastel-blue)",
  },
  {
    title: "🏥 Delhi Health Emergency",
    text: "Emergency health alert declared in Delhi, doctors rush to hospitals.",
    color: "var(--pastel-coral)",
  },
  {
    title: "🌀 Pune Cyclone & Transport",
    text: "Cyclone alert in Pune, government suspends train and bus services tomorrow morning.",
    color: "var(--pastel-yellow)",
  },
  {
    title: "⚠️ Village Earthquake Rescue",
    text: "Earthquake warning in village, police and rescue teams send urgent help today.",
    color: "var(--pastel-mint)",
  },
];

const roleColors = {
  Time: { bg: "var(--pastel-yellow)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Location: { bg: "var(--pastel-blue)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Subject: { bg: "var(--pastel-mint)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Object: { bg: "var(--pastel-lavender)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Action: { bg: "var(--pastel-coral)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Context: { bg: "#FFFFFF", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
  Modifier: { bg: "var(--dribbble-surface)", text: "var(--dribbble-ink)", border: "var(--dribbble-border-thin)" },
};

export default function NewsTranslator() {
  const [newsText, setNewsText] = useState("");
  const [translationMode, setTranslationMode] = useState("sentence"); // "sentence" | "word"
  const [signDisplayMode, setSignDisplayMode] = useState("concept"); // "concept" | "fingerspelling"
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);

  // Speech-to-Sign Microphone states
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speechError, setSpeechError] = useState("");
  const [autoTranslateSpeech, setAutoTranslateSpeech] = useState(true);
  const [isTranscribingAudio, setIsTranscribingAudio] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const [concepts, setConcepts] = useState([]);
  const [grammarBreakdown, setGrammarBreakdown] = useState([]);
  const [grammarNotes, setGrammarNotes] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [unsupported, setUnsupported] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [engineType, setEngineType] = useState("");

  const SpeechRecognition = typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  async function generateSequence(customText) {
    const input = (customText ?? newsText).trim();

    if (!input) {
      setError("Please speak or enter a sentence/word first.");
      setGenerated(false);
      setConcepts([]);
      setGrammarBreakdown([]);
      setGrammarNotes("");
      setSimplifiedText("");
      setUnsupported([]);
      return;
    }

    setLoading(true);
    setError("");
    setGenerated(false);
    setConcepts([]);
    setSelectedConceptIndex(0);
    setGrammarBreakdown([]);
    setGrammarNotes("");
    setSimplifiedText("");
    setUnsupported([]);
    setEngineType("");

    try {
      const response = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          mode: translationMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Translation failed.");
      }

      if (!Array.isArray(data.gloss_sequence)) {
        throw new Error("The backend returned an unexpected response.");
      }

      const mappedConcepts = data.gloss_sequence.map((label) => {
        const normalizedLabel = String(label).toUpperCase();
        return {
          label: normalizedLabel,
          category:
            conceptCategories[normalizedLabel] || "General Concept",
        };
      });

      setConcepts(mappedConcepts);
      setSelectedConceptIndex(0);
      setGrammarBreakdown(data.grammar_breakdown || []);
      setGrammarNotes(data.grammar_notes || "");
      setSimplifiedText(data.simplified_text || "");
      setUnsupported(data.unsupported || []);
      setEngineType(data.mode || "ISL_GRAMMAR_LLM");
      setGenerated(true);
    } catch (err) {
      console.error("SAMVAAD translation error:", err);
      setError(
        err.message ||
          "Could not connect to SAMVAAD backend. Make sure `node server.js` is running on port 3001."
      );
      setConcepts([]);
      setUnsupported([]);
      setGenerated(false);
    } finally {
      setLoading(false);
    }
  }

  function toggleListening() {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setInterimTranscript("");

      if (autoTranslateSpeech && newsText.trim()) {
        generateSequence(newsText.trim());
      }
      return;
    }

    if (!SpeechRecognition) {
      setSpeechError(
        "Live speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or upload an audio file."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError("");
        setInterimTranscript("");
      };

      recognition.onresult = (event) => {
        let finalStr = "";
        let interimStr = "";

        for (let i = 0; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalStr += transcriptChunk + " ";
          } else {
            interimStr += transcriptChunk;
          }
        }

        if (finalStr) {
          setNewsText((prev) => {
            const combined = (prev ? prev.trim() + " " : "") + finalStr.trim();
            return combined;
          });
        }
        setInterimTranscript(interimStr);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setSpeechError("Microphone access denied. Please allow microphone permissions in your browser.");
        } else if (event.error !== "no-speech") {
          setSpeechError(`Speech error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
      };

      recognition.start();
    } catch (err) {
      console.error("Could not start speech recognition:", err);
      setSpeechError("Failed to access microphone. " + err.message);
      setIsListening(false);
    }
  }

  async function handleAudioFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsTranscribingAudio(true);
    setSpeechError("");
    setError("");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Data = reader.result;

        const response = await fetch("http://localhost:3001/api/transcribe-audio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audioBase64: base64Data,
            mimeType: file.type || "audio/wav",
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Whisper audio transcription failed.");
        }

        const transcribed = data.text?.trim() || "";
        if (transcribed) {
          setNewsText(transcribed);
          if (autoTranslateSpeech) {
            generateSequence(transcribed);
          }
        } else {
          setSpeechError("Whisper could not detect any speech in the audio file.");
        }
        setIsTranscribingAudio(false);
      };

      reader.onerror = () => {
        setSpeechError("Failed to read the audio file.");
        setIsTranscribingAudio(false);
      };
    } catch (uploadErr) {
      console.error("Audio upload transcription error:", uploadErr);
      setSpeechError(uploadErr.message || "Failed to transcribe audio.");
      setIsTranscribingAudio(false);
    }
  }

  function handleSelectSample(sample) {
    setNewsText(sample.text);
    generateSequence(sample.text);
  }

  const activeConcept = concepts[selectedConceptIndex]?.label || "";
  const activeSignData = getConceptSign(activeConcept);

  return (
    <div className="translator-page">
      {/* SECTION 1: PAGE HEADER */}
      <div className="section-intro" style={{ marginBottom: "28px" }}>
        <div>
          <span className="category-badge" style={{ background: "var(--pastel-mint)", marginBottom: "8px" }}>
            ✦ AI SIGN ACCESSIBILITY WORKSPACE
          </span>
          <h2 style={{ fontSize: "38px", fontWeight: "900", letterSpacing: "-1px", margin: "6px 0 8px" }}>
            Speak. Translate. Understand.
          </h2>
          <p className="section-description" style={{ color: "var(--dribbble-ink-muted)", fontSize: "16px", maxWidth: "680px", margin: 0 }}>
            Transform spoken voice dictation and English news into grammatically authentic <strong>Indian Sign Language (ISL TSOV)</strong> gloss sequences with synchronized gesture demonstrations.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              background: isListening ? "var(--pastel-coral)" : loading ? "var(--pastel-yellow)" : "var(--pastel-mint)",
              border: "var(--dribbble-border)",
              boxShadow: "var(--dribbble-shadow-sm)",
              fontWeight: "800",
              fontSize: "13px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isListening ? "#EF4444" : "#10B981",
              }}
            />
            {isListening ? "Listening Live..." : loading ? "Translating to ISL..." : "Engine Ready"}
          </span>
        </div>
      </div>

      {/* SECTION 2: TRANSLATION MODE SELECTOR (TWO PROMINENT SELECTABLE CARDS) */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "11px", color: "var(--dribbble-ink)", fontWeight: "900", letterSpacing: "1px" }}>
          SELECT TRANSLATION ENGINE MODE:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {/* Mode Card 1: Full-Sentence ISL Grammar */}
          <div
            onClick={() => setTranslationMode("sentence")}
            style={{
              background: translationMode === "sentence" ? "var(--pastel-lavender)" : "var(--card-bg)",
              border: "var(--dribbble-border)",
              borderRadius: "22px",
              padding: "20px 24px",
              boxShadow: translationMode === "sentence" ? "var(--dribbble-shadow)" : "var(--dribbble-shadow-sm)",
              transform: translationMode === "sentence" ? "translate(-2px, -2px)" : "none",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    background: "var(--badge-bg)",
                    border: "var(--dribbble-border-thin)",
                    fontSize: "10px",
                    fontWeight: "900",
                    color: "var(--badge-text)",
                  }}
                >
                  RECOMMENDED FOR FULL NEWS
                </span>
                <span style={{ fontSize: "18px" }}>{translationMode === "sentence" ? "◉" : "○"}</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "900", margin: "0 0 4px", color: "var(--dribbble-ink)" }}>
                Full-Sentence ISL Grammar (LLM)
              </h3>
              <p style={{ fontSize: "13px", color: "var(--dribbble-ink-muted)", margin: 0, lineHeight: "1.5" }}>
                Neural syntactic parser restructures complex English headlines into authentic Time-Location-Subject-Action (TSOV) gloss order.
              </p>
            </div>
          </div>

          {/* Mode Card 2: Single Word Classifier */}
          <div
            onClick={() => setTranslationMode("word")}
            style={{
              background: translationMode === "word" ? "var(--pastel-yellow)" : "var(--card-bg)",
              border: "var(--dribbble-border)",
              borderRadius: "22px",
              padding: "20px 24px",
              boxShadow: translationMode === "word" ? "var(--dribbble-shadow)" : "var(--dribbble-shadow-sm)",
              transform: translationMode === "word" ? "translate(-2px, -2px)" : "none",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    background: "var(--badge-bg)",
                    border: "var(--dribbble-border-thin)",
                    fontSize: "10px",
                    fontWeight: "900",
                    color: "var(--badge-text)",
                  }}
                >
                  KEYWORD ML MODEL
                </span>
                <span style={{ fontSize: "18px" }}>{translationMode === "word" ? "◉" : "○"}</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "900", margin: "0 0 4px", color: "var(--dribbble-ink)" }}>
                Single Word Classifier (ML Model)
              </h3>
              <p style={{ fontSize: "13px", color: "var(--dribbble-ink-muted)", margin: 0, lineHeight: "1.5" }}>
                Trained scikit-learn character n-gram model to classify individual emergency terms and disaster alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: QUICK TEST SAMPLES (PLACED RIGHT ABOVE WORKSPACE FOR ONE-CLICK ACCESS) */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ margin: "0 0 10px", fontSize: "11px", color: "var(--dribbble-ink)", fontWeight: "900", letterSpacing: "1px" }}>
          QUICK TEST SAMPLES (CLICK TO AUTO-TRANSLATE):
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {sampleNews.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample)}
              style={{
                background: sample.color,
                border: "var(--dribbble-border)",
                color: "var(--dribbble-ink)",
                padding: "8px 18px",
                borderRadius: "var(--radius-pill)",
                fontSize: "13px",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "var(--dribbble-shadow-sm)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "var(--dribbble-shadow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "var(--dribbble-shadow-sm)";
              }}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      <div className="translator-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
        {/* Step 1: Input & Speech Controls */}
        <section className="workspace-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <span className="category-badge" style={{ background: "var(--pastel-yellow)", marginBottom: "4px" }}>
                STEP 01
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", margin: "4px 0 0", color: "var(--dribbble-ink)" }}>
                Speak or Type Announcement
              </h3>
            </div>
            <span style={{ fontSize: "24px" }}>🎙️</span>
          </div>

          {/* SPEECH-TO-SIGN ACTION BAR */}
          <div className="mic-action-bar">
            <div className="mic-btn-group">
              <button
                type="button"
                className={`mic-button ${isListening ? "listening" : ""}`}
                onClick={toggleListening}
              >
                {isListening ? "■ Stop & Translate" : "🎙️ Speak into Mic"}
              </button>

              {isListening && (
                <div className="mic-status-pill">
                  <span className="status-dot" style={{ background: "#EF4444" }} />
                  <span>Listening live...</span>
                  <div className="audio-equalizer">
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                  </div>
                </div>
              )}

              <button
                type="button"
                className="upload-audio-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTranscribingAudio || isListening}
              >
                📁 {isTranscribingAudio ? "Transcribing with Whisper..." : "Upload Voice Audio"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                style={{ display: "none" }}
                onChange={handleAudioFileUpload}
              />
            </div>

            <div className="speech-options-group">
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: "700", color: "var(--dribbble-ink)" }}>
                <input
                  type="checkbox"
                  checked={autoTranslateSpeech}
                  onChange={(e) => setAutoTranslateSpeech(e.target.checked)}
                />
                Auto-translate speech to signs
              </label>
            </div>
          </div>

          {/* Live speech interim feedback */}
          {interimTranscript && (
            <div className="live-transcript-banner" style={{ background: "var(--pastel-blue)", border: "var(--dribbble-border-thin)", color: "var(--dribbble-ink)" }}>
              <strong>Hearing:</strong> &quot;{interimTranscript}&quot;
            </div>
          )}

          {speechError && (
            <p style={{ color: "#DC2626", fontSize: "12px", fontWeight: "700", margin: "8px 0" }}>
              ⚠️ {speechError}
            </p>
          )}

          <label className="field-label" htmlFor="news-input" style={{ marginTop: "14px" }}>
            English News Text (Voice dictation appears here)
          </label>

          <textarea
            id="news-input"
            value={newsText}
            onChange={(event) => {
              setNewsText(event.target.value);
              setGenerated(false);
              setConcepts([]);
              setGrammarBreakdown([]);
              setGrammarNotes("");
              setSimplifiedText("");
              setUnsupported([]);
              setError("");
            }}
            placeholder="Click 'Speak into Mic' to talk, or type: e.g. Schools in Mumbai closed tomorrow due to heavy rain..."
            maxLength={2000}
            rows={5}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0 18px", fontSize: "13px", fontWeight: "700", color: "var(--dribbble-ink-muted)" }}>
            <span>
              {translationMode === "sentence"
                ? "ISL Syntactic Parser (TSOV)"
                : "Word Classifier Mode"}
            </span>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {newsText && (
                <button
                  type="button"
                  onClick={() => {
                    setNewsText("");
                    setGenerated(false);
                  }}
                  style={{
                    background: "transparent",
                    border: 0,
                    color: "var(--dribbble-ink)",
                    fontSize: "12px",
                    fontWeight: "800",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Clear Text
                </button>
              )}
              <span>
                {newsText.trim()
                  ? newsText.trim().split(/\s+/).length
                  : 0}{" "}
                words
              </span>
            </div>
          </div>

          <button
            className="primary-button generate-button"
            onClick={() => generateSequence()}
            disabled={loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Translating to ISL..." : "Translate to ISL Gloss"}{" "}
            <span className="btn-circle-arrow">→</span>
          </button>

          <p style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", margin: "12px 0 0", textAlign: "center", fontWeight: "600" }}>
            {translationMode === "sentence"
              ? "Applies Indian Sign Language (ISL) Time-Location-Subject-Object-Verb syntactic ordering."
              : "Uses character n-gram Support Vector Classifier to map keywords."}
          </p>

          {error && (
            <p style={{ color: "#DC2626", fontSize: "13px", fontWeight: "700", margin: "10px 0 0" }}>
              {error}
            </p>
          )}
        </section>

        {/* Step 2: Visual Sign Playback */}
        <section className="workspace-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <span className="category-badge" style={{ background: "var(--pastel-coral)", marginBottom: "4px" }}>
                STEP 02
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", margin: "4px 0 0", color: "var(--dribbble-ink)" }}>
                Visual Sign Playback
              </h3>
            </div>
            <span style={{ fontSize: "24px" }}>🤟</span>
          </div>

          {generated && concepts.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              {/* Concept Word Pills */}
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--dribbble-ink)", letterSpacing: "1px" }}>
                  SELECT CONCEPT IN SENTENCE:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                  {concepts.map((concept, idx) => {
                    const hasSign = Boolean(getConceptSign(concept.label));
                    const isSelected = idx === selectedConceptIndex;
                    return (
                      <button
                        key={`${concept.label}-${idx}`}
                        type="button"
                        onClick={() => setSelectedConceptIndex(idx)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "var(--radius-pill)",
                          fontSize: "13px",
                          fontWeight: "800",
                          border: "var(--dribbble-border)",
                          background: isSelected ? "var(--pastel-lavender)" : "var(--card-bg)",
                          color: "var(--dribbble-ink)",
                          cursor: "pointer",
                          boxShadow: isSelected ? "var(--dribbble-shadow)" : "var(--dribbble-shadow-sm)",
                          transform: isSelected ? "translate(-2px, -2px)" : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {concept.label}
                        {hasSign && <span style={{ fontSize: "12px", color: "#10B981" }}>★</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Mode Toggle */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  background: "var(--dribbble-surface)",
                  padding: "4px",
                  borderRadius: "var(--radius-pill)",
                  border: "var(--dribbble-border-thin)",
                  width: "fit-content",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSignDisplayMode("concept")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-pill)",
                    border: signDisplayMode === "concept" ? "var(--dribbble-border-thin)" : "1px solid transparent",
                    fontSize: "12px",
                    fontWeight: "800",
                    background: signDisplayMode === "concept" ? "var(--pastel-coral)" : "transparent",
                    color: "var(--dribbble-ink)",
                    cursor: "pointer",
                    boxShadow: signDisplayMode === "concept" ? "var(--dribbble-shadow-sm)" : "none",
                  }}
                >
                  🌟 Whole-Concept Gesture
                </button>
                <button
                  type="button"
                  onClick={() => setSignDisplayMode("fingerspelling")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-pill)",
                    border: signDisplayMode === "fingerspelling" ? "var(--dribbble-border-thin)" : "1px solid transparent",
                    fontSize: "12px",
                    fontWeight: "800",
                    background: signDisplayMode === "fingerspelling" ? "var(--pastel-mint)" : "transparent",
                    color: "var(--dribbble-ink)",
                    cursor: "pointer",
                    boxShadow: signDisplayMode === "fingerspelling" ? "var(--dribbble-shadow-sm)" : "none",
                  }}
                >
                  🔤 Letter Fingerspelling
                </button>
              </div>
            </div>
          )}

          <div className="sign-preview" style={{ minHeight: "auto", padding: 0, background: "transparent" }}>
            {generated && concepts.length > 0 ? (
              signDisplayMode === "concept" && activeSignData ? (
                <ConceptSignVisualizer signData={activeSignData} />
              ) : (
                <SigningAvatar
                  key={`${activeConcept}-${signDisplayMode}`}
                  word={activeConcept}
                />
              )
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", border: "2px dashed rgba(18, 18, 18, 0.2)", borderRadius: "20px" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>👋</span>
                <p style={{ color: "var(--dribbble-ink-muted)", fontWeight: "600", fontSize: "14px", margin: 0 }}>
                  Speak or type an announcement and click &quot;Translate to ISL Gloss&quot; to preview signing.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Step 3: ISL Grammar Restructuring & Concepts */}
      <section className="workspace-card" style={{ marginTop: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <span className="category-badge" style={{ background: "var(--pastel-mint)", marginBottom: "4px" }}>
              STEP 03
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: "900", margin: "4px 0 0", color: "var(--dribbble-ink)" }}>
              ISL Grammatical Structure & Concept Analysis
            </h3>
          </div>

          <span className="category-badge" style={{ background: "var(--pastel-lavender)" }}>
            {generated ? `${concepts.length} Gloss Tokens` : "Awaiting Input"}
          </span>
        </div>

        {!generated ? (
          <div style={{ textAlign: "center", padding: "30px", border: "2px dashed rgba(18, 18, 18, 0.15)", borderRadius: "18px" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "6px" }}>◇</span>
            <p style={{ color: "var(--dribbble-ink-muted)", fontWeight: "600", margin: 0 }}>
              Translate news to view the ISL linguistic breakdown.
            </p>
          </div>
        ) : concepts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", border: "2px dashed rgba(18, 18, 18, 0.15)", borderRadius: "18px" }}>
            <span style={{ fontSize: "32px", display: "block", marginBottom: "6px" }}>⌕</span>
            <p style={{ color: "var(--dribbble-ink-muted)", fontWeight: "600", margin: 0 }}>
              No concepts could be extracted from the input.
            </p>
          </div>
        ) : (
          <div>
            {/* Engine badge */}
            <div style={{ marginBottom: "16px" }}>
              <span className="category-badge" style={{ background: engineType === "ISL_GRAMMAR_LLM" ? "var(--pastel-mint)" : "var(--pastel-blue)" }}>
                {engineType === "ISL_GRAMMAR_LLM"
                  ? "✦ Groq LLaMA / ISL Grammar Engine Active"
                  : "◈ scikit-learn Word Classifier Active"}
              </span>
            </div>

            {/* Grammar Explanation Box (Dribbble Speech/Memo Card) */}
            {grammarNotes && (
              <div
                style={{
                  background: "var(--pastel-yellow)",
                  border: "var(--dribbble-border)",
                  borderRadius: "20px",
                  padding: "18px 22px",
                  marginBottom: "22px",
                  boxShadow: "var(--dribbble-shadow-sm)",
                }}
              >
                <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: "900", color: "var(--dribbble-ink)" }}>
                  💡 ISL Linguistic Transformation
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--dribbble-ink)", lineHeight: "1.6", fontWeight: "500" }}>
                  {grammarNotes}
                </p>
              </div>
            )}

            {/* Grammatical Breakdown (TSOV flow) */}
            {grammarBreakdown.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <p style={{ margin: "0 0 12px", fontSize: "12px", color: "var(--dribbble-ink)", fontWeight: "800", letterSpacing: "1px" }}>
                  ISL SYNTACTIC ORDER (TIME → LOCATION → SUBJECT → ACTION):
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {grammarBreakdown.map((item, idx) => {
                    const color = roleColors[item.role] || roleColors.Modifier;
                    return (
                      <div
                        key={idx}
                        style={{
                          background: color.bg,
                          color: color.text,
                          border: color.border,
                          borderRadius: "18px",
                          padding: "10px 18px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                          boxShadow: "var(--dribbble-shadow-sm)",
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase", opacity: 0.75 }}>
                          {item.role || "Concept"}
                        </span>
                        <strong style={{ fontSize: "17px", fontWeight: "900", letterSpacing: "0.5px" }}>
                          {item.gloss}
                        </strong>
                        {item.source && (
                          <span style={{ fontSize: "12px", opacity: 0.8, fontWeight: "600" }}>
                            from &quot;{item.source}&quot;
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Gloss Sequence Chips with Interactive "View Sign" buttons */}
            <div>
              <p style={{ margin: "0 0 12px", fontSize: "12px", color: "var(--dribbble-ink)", fontWeight: "800", letterSpacing: "1px" }}>
                ALL GENERATED ISL GLOSSES:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {concepts.map((concept, index) => {
                  const hasSign = Boolean(getConceptSign(concept.label));
                  const isSelected = index === selectedConceptIndex;
                  return (
                    <div
                      key={`${concept.label}-${index}`}
                      onClick={() => setSelectedConceptIndex(index)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "var(--radius-pill)",
                        border: "var(--dribbble-border)",
                        background: isSelected ? "var(--pastel-lavender)" : "var(--card-bg)",
                        boxShadow: isSelected ? "var(--dribbble-shadow)" : "var(--dribbble-shadow-sm)",
                        transform: isSelected ? "translate(-2px, -2px)" : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ fontSize: "14px" }}>◇</span>
                      <span>
                        <strong style={{ fontSize: "14px", fontWeight: "800", color: "var(--dribbble-ink)" }}>{concept.label}</strong>
                        <small style={{ display: "block", fontSize: "11px", color: "var(--dribbble-ink-muted)", fontWeight: "700" }}>{concept.category}</small>
                      </span>
                      <span className="category-badge" style={{ background: hasSign ? "var(--pastel-mint)" : "var(--pastel-yellow)", fontSize: "10px" }}>
                        {hasSign ? "★ Whole Sign" : "🔤 Spell"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {generated && unsupported.length > 0 && (
          <div style={{ marginTop: "20px", padding: "12px 16px", borderRadius: "14px", background: "var(--pastel-coral)", border: "var(--dribbble-border-thin)", color: "var(--dribbble-ink)", fontSize: "13px", fontWeight: "700" }}>
            <span>ⓘ Omitted English function words: </span>
            {unsupported.map(String).join(", ")}
          </div>
        )}
      </section>
    </div>
  );
}
