import { useState, useEffect } from "react";
import "./ConceptSignVisualizer.css";

export default function ConceptSignVisualizer({ signData }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 0.5x, 1x, 1.5x
  const [currentPhase, setCurrentPhase] = useState(1);

  useEffect(() => {
    setIsPlaying(true);
    setCurrentPhase(1);
  }, [signData?.name]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentPhase((p) => (p === 1 ? 2 : 1));
    }, 1400 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, signData?.name]);

  if (!signData) {
    return (
      <div className="concept-empty">
        <p>No verified whole-concept demonstration available for this word.</p>
      </div>
    );
  }

  const {
    name,
    category,
    signType,
    motionType = "universal-gesture",
    handshape,
    location,
    orientation,
    movement,
    facialExpression,
    instruction,
    tips,
  } = signData;

  return (
    <div className="concept-sign-card">
      {/* Header */}
      <div className="concept-sign-header">
        <div>
          <span className="category-badge" style={{ background: "var(--pastel-lavender)", marginBottom: "6px" }}>
            {signType}
          </span>
          <h3 className="concept-sign-title">{name}</h3>
          <span className="concept-category-tag">{category}</span>
        </div>
        <div className="concept-pulse-status">
          <span className={`live-dot ${isPlaying ? "active" : ""}`} />
          <span>{isPlaying ? "Signer Active" : "Paused"}</span>
        </div>
      </div>

      {/* Main Animated Signer Stage (Dribbble Neo-Brutalist Soft Canvas) */}
      <div
        className={`gesture-stage motion-${motionType} ${isPlaying ? "playing" : "paused"}`}
        style={{
          "--speed-factor": 1 / speed,
        }}
      >
        <div className="stage-backdrop-grid" />

        {/* Humanoid Signer Silhouette + Hand Motion Rig */}
        <div className="signer-viewport">
          {/* Signer Body Skeleton SVG in Clean Line-Art Style */}
          <svg
            className="signer-avatar-svg"
            viewBox="0 0 300 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Halo background */}
            <circle cx="150" cy="110" r="95" fill="var(--pastel-lavender)" opacity="0.6" stroke="#121212" strokeWidth="2" strokeDasharray="4 4" />

            {/* Torso */}
            <path
              d="M 65 260 C 75 195 95 160 115 155 L 125 150 C 135 152 165 152 175 150 L 185 155 C 205 160 225 195 235 260 Z"
              fill="#FFFFFF"
              stroke="#121212"
              strokeWidth="2.5"
            />
            {/* Neck */}
            <rect x="138" y="115" width="24" height="38" rx="6" fill="#FCEECB" stroke="#121212" strokeWidth="2.5" />

            {/* Head */}
            <ellipse cx="150" cy="90" rx="34" ry="42" fill="#FCEECB" stroke="#121212" strokeWidth="2.5" />
            
            {/* Friendly Facial Features (Matching Synapse Doodle Vibe) */}
            <path d="M 142 94 Q 150 102 158 94" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="138" cy="84" r="3.5" fill="#121212" />
            <circle cx="162" cy="84" r="3.5" fill="#121212" />
            {/* Cheeks */}
            <circle cx="132" cy="94" r="5" fill="#FBD5D5" />
            <circle cx="168" cy="94" r="5" fill="#FBD5D5" />
            {/* Eyebrows */}
            <path d="M 132 75 Q 138 72 144 75" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
            <path d="M 156 75 Q 162 72 168 75" stroke="#121212" strokeWidth="2" strokeLinecap="round" />

            {/* Left Arm Base */}
            <path
              className="arm-left-base"
              d="M 85 170 Q 70 215 90 245"
              stroke="#121212"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Right Arm Base */}
            <path
              className="arm-right-base"
              d="M 215 170 Q 230 215 210 245"
              stroke="#121212"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>

          {/* DYNAMIC ANIMATED HAND RIG OVERLAY */}
          <div className="dynamic-motion-rig">
            {/* 1. GOVERNMENT: Temple Twist & Forehead Touch */}
            {motionType === "temple-twist" && (
              <div className="rig-government">
                <div className="temple-target-pulse" />
                <div className="gov-moving-hand">
                  <span className="hand-icon-large">☝️</span>
                </div>
                <div className="motion-indicator-pill">
                  {currentPhase === 1 ? "⟲ Step 1: Circle around temple" : "✓ Step 2: Touch forehead"}
                </div>
              </div>
            )}

            {/* 2. RAIN: Two-Handed Cascading Flutter */}
            {motionType === "cascade-down" && (
              <div className="rig-rain">
                <div className="rain-column col-1">
                  <span className="flutter-hand left">🫳</span>
                </div>
                <div className="rain-column col-2">
                  <span className="flutter-hand right">🫳</span>
                </div>
                <div className="motion-indicator-pill">
                  ↓↓ Fluttering downward rain motion ↓↓
                </div>
              </div>
            )}

            {/* 3. FLOOD: Rising Surge Waves */}
            {motionType === "rising-surge" && (
              <div className="rig-flood">
                <div className="flood-hands-pair">
                  <span className="wave-hand left">🫱</span>
                  <span className="wave-hand right">🫲</span>
                </div>
                <div className="motion-indicator-pill">
                  ↑↑ Rising surge from waist to chest ↑↑
                </div>
              </div>
            )}

            {/* 4. SCHOOL: Clapping Action */}
            {motionType === "double-clap" && (
              <div className="rig-school">
                <div className="school-clap-target">
                  <span className="base-palm">🫲</span>
                  <span className="clapping-active-palm">🫱</span>
                </div>
                <div className="motion-indicator-pill">
                  👏 Rhythmic double-clap learning gesture 👏
                </div>
              </div>
            )}

            {/* 5. HOSPITAL: Red Cross Arm Trace */}
            {motionType === "cross-trace" && (
              <div className="rig-hospital">
                <div className="glowing-red-cross">✚</div>
                <div className="tracing-hand">
                  <span className="finger-pointer">👉</span>
                </div>
                <div className="motion-indicator-pill">
                  {currentPhase === 1 ? "Tracing vertical stroke ↓" : "Tracing horizontal stroke →"}
                </div>
              </div>
            )}

            {/* 6. DOCTOR: Radial Pulse Check */}
            {motionType === "pulse-check" && (
              <div className="rig-doctor">
                <div className="wrist-target">
                  <span className="patient-wrist">🫲</span>
                  <span className="pulse-tapper">✌️</span>
                </div>
                <div className="motion-indicator-pill">
                  💓 Tapping inner wrist pulse 💓
                </div>
              </div>
            )}

            {/* 7. WARNING: Cautionary Alert */}
            {motionType === "tap-alert" && (
              <div className="rig-warning">
                <div className="shaking-alert-finger">
                  <span className="warning-finger">☝️</span>
                </div>
                <div className="motion-indicator-pill">
                  ⚠️ Cautionary alert shake & wrist tap ⚠️
                </div>
              </div>
            )}

            {/* 8. EARTHQUAKE: Seismic Shaking */}
            {motionType === "ground-shake" && (
              <div className="rig-earthquake">
                <div className="shaking-hands-duo">
                  <span className="tremor-hand">🫱</span>
                  <span className="tremor-hand">🫲</span>
                </div>
                <div className="motion-indicator-pill">
                  ⇄ Vigorous ground tremor shaking ⇄
                </div>
              </div>
            )}

            {/* 9. CYCLONE: Rotating Vortex */}
            {motionType === "vortex-spin" && (
              <div className="rig-cyclone">
                <div className="swirling-hands-orbit">
                  <span className="orbit-hand h1">🌪️</span>
                  <span className="orbit-hand h2">🫲</span>
                </div>
                <div className="motion-indicator-pill">
                  ↻ Circular swirling cyclonic vortex ↺
                </div>
              </div>
            )}

            {/* 10. CLOSE: Gates Shutting Inward */}
            {motionType === "doors-close" && (
              <div className="rig-close">
                <div className="doors-swing-pair">
                  <span className="door-hand left">🚪🫱</span>
                  <span className="door-hand right">🫲🚪</span>
                </div>
                <div className="motion-indicator-pill">
                  → Bringing flat palms together firmly ←
                </div>
              </div>
            )}

            {/* 11. HELP: Uplifting Support */}
            {motionType === "lift-support" && (
              <div className="rig-help">
                <div className="help-support-assembly">
                  <span className="lift-fist-thumb">👍</span>
                  <span className="base-support-palm">🫲</span>
                </div>
                <div className="motion-indicator-pill">
                  ↑ Uplifting forward assistance motion ↑
                </div>
              </div>
            )}

            {/* 12. POLICE: Badge Tap & Salute */}
            {motionType === "badge-salute" && (
              <div className="rig-police">
                <div className="badge-target-shield">🛡️</div>
                <div className="salute-active-hand">
                  <span className="police-hand">🫡</span>
                </div>
                <div className="motion-indicator-pill">
                  {currentPhase === 1 ? "1. Double tap police badge" : "2. Formal salute at temple"}
                </div>
              </div>
            )}

            {/* 13. TRAIN: Gliding Wheels on Track */}
            {motionType === "track-slide" && (
              <div className="rig-train">
                <div className="sliding-train-fingers">
                  <span className="train-fingers">✌️</span>
                </div>
                <div className="motion-indicator-pill">
                  ⇄ Gliding rhythmically along tracks ⇄
                </div>
              </div>
            )}

            {/* 14. BUS: Turning Steering Wheel */}
            {motionType === "steering-wheel" && (
              <div className="rig-bus">
                <div className="steering-wheel-ring">
                  <span className="wheel-hand left">✊</span>
                  <span className="wheel-hand right">✊</span>
                </div>
                <div className="motion-indicator-pill">
                  ↷ Turning large steering wheel left & right ↶
                </div>
              </div>
            )}

            {/* 15. EMERGENCY: Rapid Vibrate */}
            {motionType === "rapid-shake" && (
              <div className="rig-emergency">
                <div className="vibrating-e-hand">
                  <span className="e-fist">✊</span>
                </div>
                <div className="motion-indicator-pill">
                  ⚡ High-urgency energetic vibration ⚡
                </div>
              </div>
            )}

            {/* 16. TOMORROW: Rolling into Future */}
            {motionType === "forward-arc" && (
              <div className="rig-tomorrow">
                <div className="rolling-future-hand">
                  <span className="thumb-lead">👍</span>
                </div>
                <div className="motion-indicator-pill">
                  Cheek ──▶ Arc forward into future space
                </div>
              </div>
            )}

            {/* 17. TODAY: Present Drop */}
            {motionType === "drop-now" && (
              <div className="rig-today">
                <div className="drop-hands-pair">
                  <span className="now-hand">👇</span>
                  <span className="now-hand">👇</span>
                </div>
                <div className="motion-indicator-pill">
                  ↓↓ Double downward press in present space ↓↓
                </div>
              </div>
            )}

            {/* 18. WATER: Chin Tap */}
            {motionType === "chin-tap" && (
              <div className="rig-water">
                <div className="w-tapping-hand">
                  <span className="w-hand-shape">🖐️</span>
                </div>
                <div className="motion-indicator-pill">
                  💧 Gentle double tap on chin with W-hand 💧
                </div>
              </div>
            )}

            {/* 19. MUMBAI: Coast Wave Motion */}
            {motionType === "coast-motion" && (
              <div className="rig-mumbai">
                <div className="mumbai-wave-hand">
                  <span className="coast-hand">🌊 🫱</span>
                </div>
                <div className="motion-indicator-pill">
                  Undulating coastal curve of Mumbai
                </div>
              </div>
            )}

            {/* 20. DELHI: Crown Tap */}
            {motionType === "crown-tap" && (
              <div className="rig-delhi">
                <div className="delhi-tap-hand">
                  <span className="crown-hand">👆</span>
                </div>
                <div className="motion-indicator-pill">
                  Touching forehead with D-handshape for capital
                </div>
              </div>
            )}

            {/* Universal Fallback */}
            {![
              "temple-twist",
              "cascade-down",
              "rising-surge",
              "double-clap",
              "cross-trace",
              "pulse-check",
              "tap-alert",
              "ground-shake",
              "vortex-spin",
              "doors-close",
              "lift-support",
              "badge-salute",
              "track-slide",
              "steering-wheel",
              "rapid-shake",
              "forward-arc",
              "drop-now",
              "chin-tap",
              "coast-motion",
              "crown-tap",
            ].includes(motionType) && (
              <div className="rig-universal">
                <div className="universal-hands-motion">
                  <span className="comm-hand left">🫱</span>
                  <span className="comm-hand right">🫲</span>
                </div>
                <div className="motion-indicator-pill">
                  Authentic expressive ISL gesture motion
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Concept Label */}
        <div className="gesture-current-label">
          <span>{name}</span>
        </div>

        {/* Playback Controls */}
        <div className="stage-controls-bar">
          <button
            type="button"
            className="control-mini-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸ Pause Signer" : "▶ Play Signer"}
          </button>
          <div className="speed-pills">
            <button
              type="button"
              className={speed === 0.5 ? "active" : ""}
              onClick={() => setSpeed(0.5)}
            >
              0.5x
            </button>
            <button
              type="button"
              className={speed === 1 ? "active" : ""}
              onClick={() => setSpeed(1)}
            >
              1.0x
            </button>
            <button
              type="button"
              className={speed === 1.5 ? "active" : ""}
              onClick={() => setSpeed(1.5)}
            >
              1.5x
            </button>
          </div>
        </div>
      </div>

      {/* Linguistic Cheremes Breakdown (4 Pastel Cards) */}
      <div className="concept-specs-grid">
        <div className="spec-item" style={{ background: "var(--pastel-yellow)" }}>
          <span className="spec-label">🖐️ Handshape</span>
          <span className="spec-value">{handshape}</span>
        </div>
        <div className="spec-item" style={{ background: "var(--pastel-blue)" }}>
          <span className="spec-label">📍 Body Location</span>
          <span className="spec-value">{location}</span>
        </div>
        <div className="spec-item" style={{ background: "var(--pastel-mint)" }}>
          <span className="spec-label">🧭 Palm Orientation</span>
          <span className="spec-value">{orientation}</span>
        </div>
        <div className="spec-item" style={{ background: "var(--pastel-coral)" }}>
          <span className="spec-label">😃 Non-Manual Marker</span>
          <span className="spec-value">{facialExpression}</span>
        </div>
      </div>

      {/* Movement & Instruction Guide */}
      <div className="concept-instruction-box">
        <h4>How to Sign &quot;{name}&quot; in ISL:</h4>
        <p className="instruction-text">{instruction}</p>
        <p className="movement-details">
          <strong>Dynamic Movement:</strong> {movement}
        </p>
        {tips && (
          <div className="concept-tip" style={{ background: "#FFFFFF", border: "var(--dribbble-border-thin)", color: "var(--dribbble-ink)", borderRadius: "12px", marginTop: "10px" }}>
            <span>💡 Signer Tip:</span> {tips}
          </div>
        )}
      </div>
    </div>
  );
}
