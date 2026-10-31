
import { useState } from "react";

export default function AlphabetPreview() {
  const [word, setWord] = useState("RAIN");
  const [showSigns, setShowSigns] = useState(false);

  const letters = word
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .split("");

  return (
    <section className="workspace-card alphabet-preview">
      <div className="card-heading">
        <div>
          <span className="step-label">STEP 04</span>
          <h3>Alphabet Fingerspelling</h3>
        </div>
        <span className="small-icon">ABC</span>
      </div>

      <label className="field-label" htmlFor="alphabet-word">
        Enter a word
      </label>

      <input
        id="alphabet-word"
        type="text"
        value={word}
        onChange={(event) => {
          setWord(event.target.value);
          setShowSigns(false);
        }}
        placeholder="Enter a word, e.g. RAIN"
        maxLength={30}
      />

      <button
        className="primary-button generate-button"
        onClick={() => setShowSigns(true)}
        disabled={!letters.length}
      >
        Show Alphabet Signs →
      </button>

      {showSigns && (
        <div className="alphabet-sign-list">
          {letters.map((letter, index) => (
            <div className="alphabet-sign" key={`${letter}-${index}`}>
              <img
                src={`/assets/alphabets/${letter}.png`}
                alt={`Reference image for letter ${letter}`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <strong>{letter}</strong>
            </div>
          ))}
        </div>
      )}

      <p className="helper-text">
        Displays alphabet reference images one letter at a time in sequence.
        These are not animated signs or verified full-word ISL translations.
      </p>
    </section>
  );
}
