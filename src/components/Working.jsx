import { useState } from "react";

const workflowSteps = [
  {
    number: "01",
    tag: "INPUT & SPEECH",
    title: "Multimodal News Ingestion",
    description:
      "Users paste full English news headlines, emergency bulletins, or speak directly into the microphone via the integrated Speech-to-Sign engine with live Web Speech & Whisper speech-to-text fallback.",
    icon: "🎙️",
    badgeColor: "var(--pastel-yellow)",
    cardBg: "var(--pastel-yellow)",
    details: ["Type or paste complex news articles", "Live microphone voice recognition", "Audio file (.mp3/.wav/.webm) upload"],
  },
  {
    number: "02",
    tag: "NLP ENGINE",
    title: "TSOV Syntactic Parsing",
    description:
      "The neural grammar engine restructures English Subject-Verb-Object (SVO) sentences into authentic Indian Sign Language Time-Space-Object-Verb (TSOV) gloss order, dropping prepositions and inflecting key entities.",
    icon: "🧠",
    badgeColor: "var(--pastel-lavender)",
    cardBg: "var(--pastel-lavender)",
    details: ["English SVO to ISL TSOV conversion", "Non-essential grammar marker elimination", "Entity tagger (Time, Location, Object, Action)"],
  },
  {
    number: "03",
    tag: "DUAL ENGINE",
    title: "Hybrid Sign Routing",
    description:
      "SAMVAAD performs intelligent dual-mode rendering: concepts with established ISL gestures (like RAIN, FLOOD, HOSPITAL, POLICE) trigger authentic animated signs, while rare proper nouns trigger letter-by-letter fingerspelling.",
    icon: "⚡",
    badgeColor: "var(--pastel-mint)",
    cardBg: "var(--pastel-mint)",
    details: ["Whole-Concept 2D vector animation", "ISLRTC-standard gesture parameters", "Alphabet fingerspelling fallback"],
  },
  {
    number: "04",
    tag: "ACCESSIBILITY",
    title: "Interactive Signing Visualizer",
    description:
      "Deaf and hard-of-hearing users experience smooth, clear, and adjustable sign language playback with speed controls (0.5x, 1.0x, 1.5x), pose scrubbing, step navigation, and detailed linguistic handshape guides.",
    icon: "🤟",
    badgeColor: "var(--pastel-blue)",
    cardBg: "var(--pastel-blue)",
    details: ["Variable speed playback engine", "Linguistic parameter breakdown", "Responsive mobile-ready viewports"],
  },
];

export default function Working({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="translator-page">
      {/* Page Header */}
      <div className="section-intro" style={{ marginBottom: "28px" }}>
        <div>
          <span className="hero-badge" style={{ marginBottom: "12px", display: "inline-flex" }}>
            HOW SAMVAAD WORKS
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-1px", margin: "6px 0 10px" }}>
            The Architecture of Accessibility
          </h2>
          <p className="section-description" style={{ fontSize: "16px", color: "var(--dribbble-ink-muted)" }}>
            Discover how SAMVAAD seamlessly bridges spoken news and native Indian Sign Language (ISL) through AI-driven grammar translation.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "var(--pastel-coral)",
              border: "var(--dribbble-border)",
              boxShadow: "var(--dribbble-shadow-sm)",
              fontWeight: "800",
              fontSize: "13px",
            }}
          >
            4-Stage Pipeline
          </span>
        </div>
      </div>

      {/* Hero Process Banner with Neo-Brutalist Doodles */}
      <section
        style={{
          border: "var(--dribbble-border)",
          borderRadius: "28px",
          background: "var(--card-bg)",
          padding: "36px",
          boxShadow: "var(--dribbble-shadow)",
          marginBottom: "36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating doodle decorations */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "30px",
            fontSize: "32px",
            opacity: 0.8,
            userSelect: "none",
          }}
        >
          ♡
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "60px",
            fontSize: "28px",
            opacity: 0.7,
            userSelect: "none",
          }}
        >
          ☺
        </div>

        <div style={{ maxWidth: "960px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 14px",
              borderRadius: "9999px",
              background: "var(--pastel-yellow)",
              border: "var(--dribbble-border-thin)",
              fontSize: "11px",
              fontWeight: "900",
              letterSpacing: "1px",
              marginBottom: "14px",
              boxShadow: "1.5px 1.5px 0px #121212",
            }}
          >
            END-TO-END PIPELINE
          </span>
          <h3 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            From Spoken & Written Headlines to Native Sign Language
          </h3>
          <p style={{ fontSize: "15px", color: "var(--dribbble-ink-muted)", lineHeight: "1.7", margin: 0 }}>
            Standard text-to-speech tools fail Deaf citizens because sign language possesses completely distinct syntax and whole-concept morphology. SAMVAAD replaces isolated fingerspelling with genuine linguistic translation.
          </p>
        </div>
      </section>

      {/* 4-Step Visual Grid (Neo-Brutalist Soft Pastel Cards) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {workflowSteps.map((step, idx) => (
          <article
            key={step.number}
            onClick={() => setActiveStep(idx)}
            style={{
              background: step.cardBg,
              border: "var(--dribbble-border)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "var(--dribbble-shadow)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-4px, -4px)";
              e.currentTarget.style.boxShadow = "var(--dribbble-shadow-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--dribbble-shadow)";
            }}
          >
            <div>
              {/* Card Top Row: Number & Tag */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--card-bg)",
                    border: "var(--dribbble-border)",
                    boxShadow: "var(--dribbble-shadow-sm)",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: "900",
                    fontSize: "18px",
                    color: "var(--dribbble-ink)",
                  }}
                >
                  {step.number}
                </div>

                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    background: "var(--card-bg)",
                    border: "var(--dribbble-border-thin)",
                    fontSize: "11px",
                    fontWeight: "800",
                    boxShadow: "1.5px 1.5px 0px #121212",
                  }}
                >
                  {step.tag}
                </span>
              </div>

              {/* Title & Icon */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0 8px" }}>
                <span style={{ fontSize: "22px" }}>{step.icon}</span>
                <h3 style={{ fontSize: "20px", fontWeight: "900", margin: 0, letterSpacing: "-0.5px" }}>
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p style={{ fontSize: "14px", color: "var(--dribbble-ink-muted)", lineHeight: "1.6", margin: "0 0 16px" }}>
                {step.description}
              </p>
            </div>

            {/* Checklist Details */}
            <div
              style={{
                background: "var(--card-bg)",
                borderRadius: "16px",
                border: "var(--dribbble-border-thin)",
                padding: "14px",
                marginTop: "12px",
              }}
            >
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", fontWeight: "700", color: "var(--dribbble-ink)", display: "grid", gap: "6px" }}>
                {step.details.map((item, dIdx) => (
                  <li key={dIdx}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Grammar Breakdown Comparison Box */}
      <section
        style={{
          border: "var(--dribbble-border)",
          borderRadius: "28px",
          background: "var(--card-bg)",
          padding: "32px",
          boxShadow: "var(--dribbble-shadow)",
          marginBottom: "36px",
        }}
      >
        <span className="hero-badge" style={{ marginBottom: "12px", display: "inline-flex" }}>
          LINGUISTIC COMPARISON
        </span>
        <h3 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
          English Grammar (SVO) vs. Indian Sign Language (TSOV)
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* English Box */}
          <div
            style={{
              background: "var(--pastel-coral)",
              border: "var(--dribbble-border)",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "var(--dribbble-shadow-sm)",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase" }}>Standard English (SVO)</span>
            <div style={{ margin: "10px 0", fontSize: "18px", fontWeight: "800", fontStyle: "italic" }}>
              &ldquo;Schools in Mumbai will remain closed tomorrow due to severe flooding.&rdquo;
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--dribbble-ink-muted)", lineHeight: "1.5" }}>
              Contains auxiliary verbs (&ldquo;will remain&rdquo;), prepositions (&ldquo;in&rdquo;, &ldquo;to&rdquo;), and passive construction unnatural to visual signing.
            </p>
          </div>

          {/* ISL Box */}
          <div
            style={{
              background: "var(--pastel-mint)",
              border: "var(--dribbble-border)",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "var(--dribbble-shadow-sm)",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase" }}>SAMVAAD ISL Gloss (TSOV)</span>
            <div style={{ margin: "10px 0", fontSize: "18px", fontWeight: "900" }}>
              TOMORROW (Time) → MUMBAI (Location) → FLOOD HEAVY (Context) → SCHOOL (Subject) → CLOSE (Action)
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "#065f46", lineHeight: "1.5", fontWeight: "700" }}>
              ✓ Natural time-first visual orientation, topic-comment structure, direct and intelligible to native Deaf signers.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section
        style={{
          border: "var(--dribbble-border)",
          borderRadius: "24px",
          background: "var(--pastel-lavender)",
          padding: "32px",
          boxShadow: "var(--dribbble-shadow)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h4 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 6px" }}>
            Ready to test live translations?
          </h4>
          <p style={{ margin: 0, fontSize: "14px", color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>
            Experience real-time ISL syntactic translation and whole-concept animation right now.
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            className="synapse-btn-primary"
            onClick={() => onNavigate("News Translator")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              fontSize: "15px",
            }}
          >
            Open News Translator
            <span style={{ fontSize: "18px" }}>→</span>
          </button>
        )}
      </section>
    </div>
  );
}
