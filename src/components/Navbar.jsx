import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const navItems = [
  { name: "Home", icon: "⌂" },
  { name: "News Translator", icon: "◈" },
  { name: "Detected Concepts", icon: "◇" },
  { name: "Sign Dictionary", icon: "▤" },
  { name: "How It Works", icon: "ⓘ" },
];

export default function Navbar({ activePage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSelect(pageName) {
    onNavigate(pageName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className={`top-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand Left */}
        <div className="navbar-brand" onClick={() => handleSelect("Home")}>
          <div className="brand-logo-frame">
            <img
              src="/assets/samvaad_logo.png"
              alt="SAMVAAD"
              className="navbar-logo-img"
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">SAMVAAD</span>
            <span className="brand-tagline">News Without Barriers</span>
          </div>
        </div>

        {/* Center Desktop Navigation (Single Horizontal Line, white-space: nowrap) */}
        <nav className="navbar-center-links" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                type="button"
                className={`nav-pill-btn ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(item.name)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-pill-icon">{item.icon}</span>
                <span className="nav-pill-label">{item.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activePillIndicator"
                    className="nav-active-pip"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: ISL Live, Theme Toggle, CTA & Mobile Toggle */}
        <div className="navbar-right">
          {/* Live Indicator */}
          <div className="access-indicator" title="AI ISL Engine Active & Verified">
            <span className="pulse-dot" />
            <span className="access-text">ISL LIVE</span>
          </div>

          {/* Theme Toggle Button (Light / Dark Mode) */}
          <motion.button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="theme-icon"
                >
                  🌙
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="theme-icon"
                >
                  ☀️
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Start Translating CTA */}
          <button
            type="button"
            className="navbar-cta-btn"
            onClick={() => handleSelect("News Translator")}
          >
            <span>Start Translating</span>
            <span className="cta-arrow">→</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="mobile-menu-links">
              {navItems.map((item) => {
                const isActive = activePage === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`mobile-nav-item ${isActive ? "active" : ""}`}
                    onClick={() => handleSelect(item.name)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-title">{item.name}</span>
                    {isActive && <span className="mobile-check">✓</span>}
                  </button>
                );
              })}

              <div className="mobile-theme-row">
                <span style={{ fontSize: "13px", fontWeight: "800" }}>Appearance</span>
                <button
                  type="button"
                  className="theme-toggle-btn mobile"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </div>

              <div className="mobile-cta-wrapper">
                <button
                  type="button"
                  className="mobile-cta-btn"
                  onClick={() => handleSelect("News Translator")}
                >
                  Start Translating Now →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
