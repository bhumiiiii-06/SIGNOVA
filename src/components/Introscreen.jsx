
import { useEffect, useRef, useState } from "react";
import "./IntroScreen.css";

export default function IntroScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [showSkip, setShowSkip] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 800);
    return () => clearTimeout(timer);
  }, []);

  async function startVideo() {
    const video = videoRef.current;
    if (!video || isExiting) return;

    try {
      video.muted = true;
      await video.play();
      setPlaybackError(false);
    } catch (error) {
      console.error("SAMVAAD intro autoplay failed:", error);
      setPlaybackError(true);
    }
  }

  function finishIntro() {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(onComplete, 650);
  }

  return (
    <div className={`intro-screen ${isExiting ? "intro-exiting" : ""}`}>
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={startVideo}
        onEnded={finishIntro}
        onError={() => setPlaybackError(true)}
      >
        <source src="/videos/samvaad-intro.mp4" type="video/mp4" />
      </video>

      {showSkip && !isExiting && (
        <button className="intro-skip-button" onClick={finishIntro}>
          Skip intro →
        </button>
      )}

      {playbackError && !isExiting && (
        <div className="intro-playback-message">
          <p>Unable to start the intro automatically.</p>
          <button className="intro-skip-button" onClick={finishIntro}>
            Continue to SAMVAAD →
          </button>
        </div>
      )}
    </div>
  );
}
