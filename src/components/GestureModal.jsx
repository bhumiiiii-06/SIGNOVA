import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getConceptSign } from "../data/islConceptSigns";
import ConceptSignVisualizer from "./ConceptSignVisualizer";
import SigningAvatar from "./SigningAvatar";
import "./GestureModal.css";

export default function GestureModal({ sign, isOpen, onClose }) {
  const [modalMode, setModalMode] = useState("concept"); // "concept" | "fingerspelling"
  const [replayKey, setReplayKey] = useState(0);

  const activeSignData = sign ? getConceptSign(sign.name) : null;
  const hasWholeSign = Boolean(activeSignData);

  useEffect(() => {
    if (sign) {
      setModalMode(hasWholeSign ? "concept" : "fingerspelling");
      setReplayKey((k) => k + 1);
    }
  }, [sign?.name, hasWholeSign]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // Prevent layout shift
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && sign && (
        <motion.div
          className="gesture-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-concept-title"
        >
          <motion.div
            className="gesture-modal-container"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="gesture-modal-header">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span className="category-badge" style={{ background: "var(--pastel-yellow)" }}>
                    {sign.category}
                  </span>
                  {hasWholeSign ? (
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        background: "var(--pastel-mint)",
                        border: "1.5px solid var(--dribbble-ink)",
                        fontSize: "11px",
                        fontWeight: "900",
                        boxShadow: "1.5px 1.5px 0px var(--dribbble-ink)",
                      }}
                    >
                      ★ WHOLE SIGN GESTURE
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        background: "var(--pastel-lavender)",
                        border: "1.5px solid var(--dribbble-ink)",
                        fontSize: "11px",
                        fontWeight: "800",
                      }}
                    >
                      🔤 FINGERSPELLING
                    </span>
                  )}
                </div>

                <h2 id="modal-concept-title" className="gesture-modal-title">
                  {sign.name}
                </h2>
                <p className="gesture-modal-desc">{sign.description}</p>
              </div>

              {/* Close Button */}
              <motion.button
                type="button"
                className="gesture-modal-close"
                onClick={onClose}
                aria-label="Close modal"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Mode Switcher Pills */}
            <div className="gesture-mode-switcher">
              <button
                type="button"
                onClick={() => setModalMode("concept")}
                className={`mode-btn ${modalMode === "concept" ? "active" : ""}`}
                disabled={!hasWholeSign}
                title={hasWholeSign ? "View whole-concept ISL gesture" : "Whole sign not available"}
              >
                🌟 Whole-Concept Gesture {!hasWholeSign && "(Unavailable)"}
              </button>
              <button
                type="button"
                onClick={() => setModalMode("fingerspelling")}
                className={`mode-btn ${modalMode === "fingerspelling" ? "active" : ""}`}
              >
                🔤 Letter Fingerspelling
              </button>
            </div>

            {/* Gesture Playback Stage - Immediately Visible */}
            <div className="gesture-modal-stage">
              {modalMode === "concept" && activeSignData ? (
                <ConceptSignVisualizer
                  key={`${sign.name}-${replayKey}`}
                  signData={activeSignData}
                />
              ) : (
                <div className="modal-avatar-wrapper">
                  <SigningAvatar
                    key={`${sign.name}-${replayKey}`}
                    word={sign.name}
                  />
                </div>
              )}
            </div>

            {/* Modal Bottom Toolbar */}
            <div className="gesture-modal-footer">
              <motion.button
                type="button"
                className="replay-btn"
                onClick={() => setReplayKey((k) => k + 1)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>↺ Replay Demonstration</span>
              </motion.button>

              <button
                type="button"
                className="synapse-btn-secondary"
                style={{ padding: "8px 20px", fontSize: "13px" }}
                onClick={onClose}
              >
                Done Watching
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

