import { useState } from "react";
import IntroScreen from "./components/Introscreen";
import Navbar from "./components/Navbar";
import HomeLanding from "./components/HomeLanding";
import NewsTranslator from "./components/NewsTranslator";
import DetectedConcepts from "./components/DetectedConcepts";
import SignDictionary from "./components/SignDictionary";
import Working from "./components/Working";
import "./App.css";
import "./DribbbleTheme.css";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="app-shell">
      {/* Global Modern Horizontal Top Navbar (Replacing all sidebars) */}
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {/* Main Content Area */}
      <main className="main-content">
        {activePage === "Home" ? (
          <HomeLanding onNavigate={setActivePage} />
        ) : activePage === "News Translator" ? (
          <NewsTranslator />
        ) : activePage === "Detected Concepts" ? (
          <DetectedConcepts />
        ) : activePage === "Sign Dictionary" ? (
          <SignDictionary />
        ) : activePage === "How It Works" ? (
          <Working onNavigate={setActivePage} />
        ) : (
          <section className="workspace-card">
            <h2>{activePage}</h2>
            <p>This section is ready for exploration.</p>
          </section>
        )}

        <footer
          style={{
            marginTop: "64px",
            paddingTop: "28px",
            borderTop: "2px dashed rgba(18, 18, 18, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            color: "var(--dribbble-ink-muted)",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "16px" }}>🤟</span>
            <span>SAMVAAD — News Without Barriers</span>
          </div>
          <div>
            <span>Indian Sign Language (ISLRTC) Standardized Architecture</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
