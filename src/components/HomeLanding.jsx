import { useState } from "react";
import "./HomeLanding.css";

const interactiveDemos = [
  {
    title: "🌧️ Mumbai Flood Warning",
    english: "Schools in Mumbai will remain closed tomorrow due to severe flooding.",
    tsovGloss: ["TOMORROW (Time)", "MUMBAI (Location)", "FLOOD HEAVY (Context)", "SCHOOL (Subject)", "CLOSE (Action)"],
    rule: "English SVO converted to authentic ISL TSOV: Time & location fronted, auxiliary verbs dropped.",
  },
  {
    title: "🏥 Delhi Medical Alert",
    english: "Emergency health alert declared in Delhi, doctors rush to hospitals.",
    tsovGloss: ["DELHI (Location)", "EMERGENCY HEALTH (Context)", "DOCTOR (Subject)", "HOSPITAL (Object)", "GO URGENT (Action)"],
    rule: "Contextual prioritization with medical domain signs and direct spatial movement.",
  },
  {
    title: "🌀 Pune Cyclone Bulletin",
    english: "Cyclone warning issued for Pune, bus and train services suspended today.",
    tsovGloss: ["TODAY (Time)", "PUNE (Location)", "CYCLONE WARNING (Context)", "BUS TRAIN (Subject)", "STOP (Action)"],
    rule: "Compound subject grouping (Bus + Train) with immediate imperative action terminal.",
  },
];

const featuredConcepts = [
  { name: "RAIN", category: "Weather", tag: "Whole Sign", icon: "🌧️", bg: "var(--pastel-blue)" },
  { name: "FLOOD", category: "Disaster", tag: "Whole Sign", icon: "🌊", bg: "var(--pastel-coral)" },
  { name: "HOSPITAL", category: "Health", tag: "Whole Sign", icon: "🏥", bg: "var(--pastel-mint)" },
  { name: "POLICE", category: "Public", tag: "Whole Sign", icon: "👮", bg: "var(--pastel-yellow)" },
  { name: "GOVERNMENT", category: "Public", tag: "Whole Sign", icon: "🏛️", bg: "var(--pastel-lavender)" },
  { name: "WARNING", category: "Disaster", tag: "Whole Sign", icon: "⚠️", bg: "var(--pastel-coral)" },
];

export default function HomeLanding({ onNavigate }) {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  return (
    <div className="home-landing">
      {/* ==========================================================================
          HERO SECTION (TWO-COLUMN PRODUCT SHOWCASE)
          ========================================================================== */}
      <section className="hero-showcase">
        {/* Decorative Doodles */}
        <div className="hero-doodle-heart" title="Made for Deaf Inclusion">♡</div>
        <div className="hero-doodle-sparkle">✦</div>

        {/* Left Column: Typography, Copy & CTAs */}
        <div className="hero-left">
          <div className="hero-pill-badge">
            <span style={{ fontSize: "14px" }}>🤟</span>
            <span>Empowering Deaf Accessibility</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-pill coral">Breaking</span>
            <span className="headline-pill blue">News.</span>
            <span className="headline-pill yellow">Without</span>
            <span className="headline-pill mint">Barriers.</span>
          </h1>

          <p className="hero-description">
            Making information accessible to everyone through intelligent Indian Sign Language translation. Transform spoken voice broadcasts and written news into authentic ISL grammar and whole-concept gestures in real time.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="synapse-btn-primary"
              onClick={() => onNavigate("News Translator")}
              style={{ fontSize: "15px", padding: "14px 28px" }}
            >
              Explore News Translator <span className="btn-circle-arrow">→</span>
            </button>

            <button
              type="button"
              className="synapse-btn-secondary"
              onClick={() => onNavigate("Sign Dictionary")}
              style={{ fontSize: "15px", padding: "14px 24px" }}
            >
              Explore ISL Dictionary <span className="btn-circle-arrow">▤</span>
            </button>
          </div>

          <div className="hero-status-strip">
            <div className="status-item">
              <span className="status-dot-green" />
              <span>ISLRTC Standards Compliant</span>
            </div>
            <div className="status-item">
              <span className="status-dot-green" />
              <span>TSOV Neural Grammar AI</span>
            </div>
            <div className="status-item">
              <span className="status-dot-green" />
              <span>Live Speech-to-Sign Engine</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Sign-Language Demonstration Stage */}
        <div className="hero-right">
          <div className="hero-stage-card">
            {/* Translation Flow Pipeline */}
            <div className="stage-pipeline-flow">
              <span className="flow-step">English News</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">AI Processing</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ color: "#059669" }}>ISL Gestures</span>
            </div>

            {/* Floating Card 1: Active Gesture */}
            <div className="floating-card-1">
              <span>🌧️</span>
              <span>RAIN · Active Sign</span>
            </div>

            {/* Floating Card 2: AI Accuracy */}
            <div className="floating-card-2">
              <span>🧠</span>
              <span>TSOV Grammar Syntax</span>
            </div>

            {/* Animated Signer Character Illustration */}
            <div className="animated-hand-visual">
              <svg className="hero-svg-signer" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Torso & Head Line-Art Vector */}
                <circle cx="100" cy="55" r="28" fill="#FCEECB" stroke="#121212" strokeWidth="3" />
                {/* Hair line */}
                <path d="M74 52C76 35 90 28 100 28C112 28 124 35 126 52" stroke="#121212" strokeWidth="4" strokeLinecap="round" />
                {/* Smile & Eyes */}
                <circle cx="90" cy="54" r="2.5" fill="#121212" />
                <circle cx="110" cy="54" r="2.5" fill="#121212" />
                <path d="M92 65C96 70 104 70 108 65" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" />

                {/* Torso */}
                <path d="M60 145C60 100 80 88 100 88C120 88 140 100 140 145" fill="#D2EBD9" stroke="#121212" strokeWidth="3" />
                <path d="M100 88V125" stroke="#121212" strokeWidth="2" strokeDasharray="3 3" />

                {/* Left Arm & Hand (Signing Gesture) */}
                <path d="M70 105C55 120 48 135 60 145" stroke="#121212" strokeWidth="4" strokeLinecap="round" />
                <circle cx="62" cy="147" r="8" fill="#FBD5D5" stroke="#121212" strokeWidth="2.5" />

                {/* Right Arm & Hand (Signing Gesture with Motion Lines) */}
                <path d="M130 105C148 115 152 130 140 145" stroke="#121212" strokeWidth="4" strokeLinecap="round" />
                <circle cx="138" cy="147" r="8" fill="#FBD5D5" stroke="#121212" strokeWidth="2.5" />

                {/* Motion sparkles around hands */}
                <path d="M155 130L162 130M158 123L158 137" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
                <path d="M42 135L35 135M38 128L38 142" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="stage-caption">
              <h4>Native ISL Signing Avatar</h4>
              <p>Dual-Mode: 20+ Whole Concept Clips + Alphabet Fingerspelling</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 1: ABOUT SAMVAAD & LINGUISTIC MISSION
          ========================================================================== */}
      <section className="about-section">
        <div className="about-left">
          <span className="about-badge">THE ACCESSIBILITY GAP</span>
          <h2>Why Standard Translation Fails Sign Language</h2>
          <p>
            Over <strong>18 million Deaf and Hard-of-Hearing citizens in India</strong> rely on Indian Sign Language (ISL) as their first language. But written news is structured in English <em>Subject-Verb-Object (SVO)</em> filled with auxiliary verbs and passive clauses that lack natural spatial representation.
          </p>
          <p>
            <strong>SAMVAAD</strong> solves this by using neural grammar parsing to convert incoming speech and articles directly into ISL <em>Time-Space-Object-Verb (TSOV)</em> gloss and authentic anatomical gestures.
          </p>
        </div>

        <div className="about-metrics">
          <div className="metric-card mint">
            <div className="metric-number">18M+</div>
            <div className="metric-label">Deaf Citizens in India needing accessible news</div>
          </div>

          <div className="metric-card blue">
            <div className="metric-number">54</div>
            <div className="metric-label">Verified ISL Emergency & Civic Concepts</div>
          </div>

          <div className="metric-card yellow">
            <div className="metric-number">100%</div>
            <div className="metric-label">Real-time TSOV AI Syntactic Restructuring</div>
          </div>

          <div className="metric-card lavender">
            <div className="metric-number">ISLRTC</div>
            <div className="metric-label">Standardized Indian Sign Language parameters</div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: CORE PLATFORM CAPABILITIES (BENTO GRID)
          ========================================================================== */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>INTELLIGENT SUITE</p>
            <h2 style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.8px", margin: "4px 0 0" }}>
              Core Platform Capabilities
            </h2>
          </div>
          <span className="category-badge" style={{ background: "var(--pastel-yellow)" }}>
            Four Unified Modules
          </span>
        </div>

        <div className="stats-grid">
          <div className="stat-card card-mint" onClick={() => onNavigate("News Translator")} style={{ cursor: "pointer" }}>
            <div>
              <span className="stat-card-badge">VOICE & AUDIO</span>
              <h3>Speech-to-Sign</h3>
              <p>Speak news announcements directly into your microphone or upload broadcast audio files with live Whisper AI transcription.</p>
            </div>
            <div className="stat-card-action-btn">
              <span>TRY VOICE INPUT</span>
              <span className="btn-circle-arrow">→</span>
            </div>
          </div>

          <div className="stat-card card-blue" onClick={() => onNavigate("News Translator")} style={{ cursor: "pointer" }}>
            <div>
              <span className="stat-card-badge">AI LINGUISTICS</span>
              <h3>ISL Grammar Engine</h3>
              <p>Linguistic parser restructures English sentences into Time-Location-Subject-Action gloss order with detailed rule notes.</p>
            </div>
            <div className="stat-card-action-btn">
              <span>PARSE SENTENCES</span>
              <span className="btn-circle-arrow">→</span>
            </div>
          </div>

          <div className="stat-card card-lavender" onClick={() => onNavigate("Sign Dictionary")} style={{ cursor: "pointer" }}>
            <div>
              <span className="stat-card-badge">VISUAL SIGNING</span>
              <h3>Whole-Concept Gestures</h3>
              <p>Move beyond simple alphabet spelling with animated ISL demonstrations for 20+ core emergency and disaster concepts.</p>
            </div>
            <div className="stat-card-action-btn">
              <span>EXPLORE GESTURES</span>
              <span className="btn-circle-arrow">→</span>
            </div>
          </div>

          <div className="stat-card card-yellow" onClick={() => onNavigate("Sign Dictionary")} style={{ cursor: "pointer" }}>
            <div>
              <span className="stat-card-badge">KNOWLEDGE BASE</span>
              <h3>54-Sign Dictionary</h3>
              <p>Searchable library across Weather, Disasters, Healthcare, Transport, Municipalities, and Civic bulletins.</p>
            </div>
            <div className="stat-card-action-btn">
              <span>BROWSE 10 DOMAINS</span>
              <span className="btn-circle-arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: LIVE SPEECH-TO-SIGN INTERACTIVE DEMO WIDGET
          ========================================================================== */}
      <section className="live-demo-section">
        <div className="demo-header">
          <div className="demo-title-area">
            <span className="about-badge">LIVE DEMONSTRATION</span>
            <h2>See ISL Grammar in Action</h2>
          </div>
          <button
            type="button"
            className="synapse-btn-secondary"
            onClick={() => onNavigate("News Translator")}
          >
            Launch Full Translator →
          </button>
        </div>

        <div className="demo-box">
          <div className="demo-chips-row">
            {interactiveDemos.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                className={`demo-chip ${activeDemoIndex === idx ? "active" : ""}`}
                onClick={() => setActiveDemoIndex(idx)}
              >
                {demo.title}
              </button>
            ))}
          </div>

          <div style={{ padding: "16px 20px", background: "var(--dribbble-bg)", borderRadius: "16px", border: "1.5px solid #121212" }}>
            <span style={{ fontSize: "11px", fontWeight: "900", color: "var(--dribbble-ink-muted)", textTransform: "uppercase" }}>
              Incoming English News
            </span>
            <p style={{ margin: "6px 0 0", fontSize: "16px", fontWeight: "700" }}>
              &ldquo;{interactiveDemos[activeDemoIndex].english}&rdquo;
            </p>
          </div>

          <div className="demo-output-card">
            <div>
              <span style={{ fontSize: "11px", fontWeight: "900", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                Generated ISL Gloss Sequence (TSOV)
              </span>
              <div className="demo-tokens">
                {interactiveDemos[activeDemoIndex].tsovGloss.map((token, tIdx) => (
                  <span key={tIdx} className="token-badge">
                    {token}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="synapse-btn-primary"
              onClick={() => onNavigate("News Translator")}
              style={{ padding: "10px 20px", fontSize: "13px" }}
            >
              Watch Signing Avatar →
            </button>
          </div>

          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "var(--dribbble-ink-muted)" }}>
            💡 <strong>Linguistic Rule:</strong> {interactiveDemos[activeDemoIndex].rule}
          </p>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: ISL DICTIONARY FEATURED SIGNS PREVIEW
          ========================================================================== */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>ISL GESTURE GALLERY</p>
            <h2 style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.8px", margin: "4px 0 0" }}>
              Core Emergency Signs
            </h2>
          </div>
          <button
            type="button"
            className="synapse-btn-secondary"
            onClick={() => onNavigate("Sign Dictionary")}
          >
            View All 54 Signs →
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {featuredConcepts.map((item) => (
            <div
              key={item.name}
              onClick={() => onNavigate("Sign Dictionary")}
              style={{
                background: item.bg,
                border: "2px solid #121212",
                borderRadius: "22px",
                padding: "20px",
                boxShadow: "3px 3px 0px #121212",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = "5px 5px 0px #121212";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "3px 3px 0px #121212";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "24px" }}>{item.icon}</span>
                  <span style={{ fontSize: "10px", fontWeight: "900", background: "var(--badge-bg)", color: "var(--badge-text)", padding: "2px 8px", borderRadius: "9999px", border: "var(--dribbble-border-thin)" }}>
                    {item.tag}
                  </span>
                </div>
                <h4 style={{ fontSize: "20px", fontWeight: "900", margin: "14px 0 2px" }}>{item.name}</h4>
                <span style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", fontWeight: "700" }}>{item.category}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <span className="btn-circle-arrow" style={{ width: "28px", height: "28px", fontSize: "13px" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: 4-STEP PIPELINE TEASER
          ========================================================================== */}
      <section style={{ background: "var(--card-bg)", border: "var(--dribbble-border)", borderRadius: "32px", padding: "40px", boxShadow: "var(--dribbble-shadow)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>STEP-BY-STEP WORKFLOW</p>
            <h2 style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.5px", margin: "4px 0 0" }}>
              How News Reaches Deaf Audiences
            </h2>
          </div>
          <button
            type="button"
            className="synapse-btn-secondary"
            onClick={() => onNavigate("How It Works")}
          >
            Explore Interactive Timeline →
          </button>
        </div>

        <div className="home-steps">
          <div className="home-step">
            <span>01</span>
            <div>
              <h3>News Ingestion</h3>
              <p>Type text, speak via microphone, or upload broadcast audio files with live Whisper AI.</p>
            </div>
          </div>

          <div className="home-step">
            <span style={{ background: "var(--pastel-lavender)" }}>02</span>
            <div>
              <h3>TSOV Syntactic Parsing</h3>
              <p>Groq neural grammar parser restructures English into natural ISL gloss tokens.</p>
            </div>
          </div>

          <div className="home-step">
            <span style={{ background: "var(--pastel-yellow)" }}>03</span>
            <div>
              <h3>Gesture Routing</h3>
              <p>Maps recognized concepts to whole-sign gestures and proper nouns to fingerspelling.</p>
            </div>
          </div>

          <div className="home-step">
            <span style={{ background: "var(--pastel-coral)" }}>04</span>
            <div>
              <h3>Interactive Visualizer</h3>
              <p>Watch continuous playback with speed adjustments and anatomical handshape guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 6: FINAL CALL TO ACTION BANNER
          ========================================================================== */}
      <section className="final-cta-section">
        <div className="cta-left">
          <h2>Ready to experience news without barriers?</h2>
          <p>
            Join the mission to make emergency alerts, civic bulletins, and daily news 100% accessible to Deaf citizens across India.
          </p>
        </div>

        <div className="cta-buttons">
          <button
            type="button"
            className="synapse-btn-primary"
            onClick={() => onNavigate("News Translator")}
            style={{ fontSize: "16px", padding: "14px 32px" }}
          >
            Open News Translator <span className="btn-circle-arrow">→</span>
          </button>
          <button
            type="button"
            className="synapse-btn-secondary"
            onClick={() => onNavigate("Sign Dictionary")}
            style={{ fontSize: "16px", padding: "14px 28px" }}
          >
            Browse Signs <span className="btn-circle-arrow">▤</span>
          </button>
        </div>
      </section>
    </div>
  );
}

