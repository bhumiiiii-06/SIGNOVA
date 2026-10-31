import { useEffect, useState } from "react";
import "./SigningAvatar.css";

export default function SigningAvatar({ word = "", words = [] }) {
  // Normalize word list
  const wordList = (words && words.length > 0)
    ? words.map((w) => String(w).trim().toUpperCase()).filter(Boolean)
    : String(word)
        .trim()
        .toUpperCase()
        .split(/\s+/)
        .filter(Boolean);

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [imageError, setImageError] = useState(false);

  // Preload alphabet images
  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    characters.split("").forEach((character) => {
      const image = new Image();
      image.src = `/assets/signing-poses/${character.toLowerCase()}.png`;
    });
  }, []);

  const activeWord = wordList[activeWordIndex] || "";
  const letters = activeWord.replace(/[^A-Z0-9]/g, "").split("");
  const currentLetter = letters[currentIndex] || "";

  // Reset when word / wordList changes
  useEffect(() => {
    setActiveWordIndex(0);
    setCurrentIndex(0);
    setIsPlaying(false);
    setImageError(false);
  }, [word, JSON.stringify(words)]);

  // Animation timer
  useEffect(() => {
    if (!isPlaying || letters.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < letters.length - 1) {
          return prev + 1;
        } else {
          // If we reached the end of the current word
          if (activeWordIndex < wordList.length - 1) {
            setActiveWordIndex((wIdx) => wIdx + 1);
            return 0;
          } else {
            // Reached end of entire sequence
            setIsPlaying(false);
            return prev;
          }
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, letters.length, speed, activeWordIndex, wordList.length]);

  function play() {
    if (activeWordIndex === wordList.length - 1 && currentIndex === letters.length - 1) {
      setActiveWordIndex(0);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }

  function pause() {
    setIsPlaying(false);
  }

  function restart() {
    setActiveWordIndex(0);
    setCurrentIndex(0);
    setImageError(false);
    setIsPlaying(false);
  }

  function nextSign() {
    setIsPlaying(false);
    if (currentIndex < letters.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    } else if (activeWordIndex < wordList.length - 1) {
      setActiveWordIndex((wIdx) => wIdx + 1);
      setCurrentIndex(0);
    } else {
      setActiveWordIndex(0);
      setCurrentIndex(0);
    }
  }

  function selectWord(idx) {
    setIsPlaying(false);
    setActiveWordIndex(idx);
    setCurrentIndex(0);
  }

  return (
    <section className="signing-avatar">
      {wordList.length > 1 && (
        <div style={{ marginBottom: "14px" }}>
          <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: "700", color: "#6b7280", letterSpacing: "1px" }}>
            ISL SEQUENCE WORDS ({wordList.length}):
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {wordList.map((w, idx) => (
              <button
                key={`${w}-${idx}`}
                type="button"
                onClick={() => selectWord(idx)}
                style={{
                  padding: "5px 12px",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "20px",
                  border: idx === activeWordIndex ? "2px solid #3456bd" : "1px solid #ccd4e7",
                  background: idx === activeWordIndex ? "#3456bd" : "#edf1ff",
                  color: idx === activeWordIndex ? "#ffffff" : "#20243a",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {letters.length > 0 ? (
        <>
          <div className="signing-stage">
            {!imageError ? (
              <img
                key={`${activeWord}-${currentIndex}`}
                className="signing-pose-image"
                src={`/assets/signing-poses/${currentLetter.toLowerCase()}.png`}
                alt={`ISL fingerspelling pose for ${currentLetter}`}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <p className="signing-error">
                Could not load the pose for {currentLetter}.
                Check that {currentLetter}.png exists in
                public/assets/signing-poses/.
              </p>
            )}

            <div className="signing-current-letter">
              {currentLetter}
            </div>

            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(4px)",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#20243a",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              Word: <span style={{ color: "#3456bd" }}>{activeWord}</span>
              {wordList.length > 1 && ` (${activeWordIndex + 1}/${wordList.length})`}
            </div>
          </div>

          <p className="signing-progress">
            Letter {currentIndex + 1} of {letters.length} in <strong>{activeWord}</strong>
          </p>

          <div className="signing-progress-track">
            <div
              className="signing-progress-fill"
              style={{
                width: `${((currentIndex + 1) / letters.length) * 100}%`,
              }}
            />
          </div>

          <div className="signing-controls">
            {!isPlaying ? (
              <button onClick={play}>
                ▶ Play Sequence
              </button>
            ) : (
              <button onClick={pause}>Ⅱ Pause</button>
            )}

            <button onClick={nextSign}>Next →</button>
            <button onClick={restart}>↺ Restart</button>
          </div>

          <div className="signing-speed">
            <label htmlFor="signing-speed">Signing speed</label>
            <select
              id="signing-speed"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            >
              <option value={1100}>Slow</option>
              <option value={700}>Normal</option>
              <option value={400}>Fast</option>
            </select>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
          No valid characters to fingerspell.
        </p>
      )}
    </section>
  );
}
