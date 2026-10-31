import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getConceptSign } from "../data/islConceptSigns";
import GestureModal from "./GestureModal";

const signs = [
  // Weather
  { name: "RAIN", category: "Weather", description: "Rain or rainfall falling in drops from clouds." },
  { name: "RAINFALL", category: "Weather", description: "Rain falling steadily from the sky." },
  { name: "PRECIPITATION", category: "Weather", description: "Water falling from the atmosphere in droplets." },
  { name: "STORM", category: "Weather", description: "Severe weather event involving strong winds and rain." },
  { name: "CYCLONE", category: "Weather", description: "Intense rotating storm system with destructive winds." },
  { name: "DROUGHT", category: "Weather", description: "A prolonged period of unusually low rainfall." },

  // Disasters
  { name: "FLOOD", category: "Disaster", description: "An area submerged under rising flood waters." },
  { name: "FLOODING", category: "Disaster", description: "Rising inundation submerging terrain and buildings." },
  { name: "LANDSLIDE", category: "Disaster", description: "Mass rock or soil sliding rapidly down a slope." },
  { name: "EARTHQUAKE", category: "Disaster", description: "Violent seismic shaking of the ground." },
  { name: "TSUNAMI", category: "Disaster", description: "A series of massive sea waves caused by undersea tremor." },
  { name: "WARNING", category: "Disaster", description: "Urgent advisory alert about imminent danger." },
  { name: "RESCUE", category: "Disaster", description: "Saving affected citizens from life-threatening danger." },

  // Locations
  { name: "MUMBAI", category: "Location", description: "Financial metropolis and coastal capital of Maharashtra." },
  { name: "INDIA", category: "Location", description: "Sovereign democratic republic in South Asia." },
  { name: "DELHI", category: "Location", description: "India's capital territory and administrative center." },
  { name: "PUNE", category: "Location", description: "Major cultural and educational hub in Maharashtra." },
  { name: "VILLAGE", category: "Location", description: "A rural agrarian settlement or local community." },
  { name: "CITY", category: "Location", description: "A densely populated urban municipal area." },

  // Time
  { name: "TODAY", category: "Time", description: "The current calendar day / present timeline." },
  { name: "TOMORROW", category: "Time", description: "The immediate following day / future timeline." },
  { name: "YESTERDAY", category: "Time", description: "The day preceding today / past timeline." },
  { name: "MORNING", category: "Time", description: "The early period between sunrise and noon." },
  { name: "EVENING", category: "Time", description: "The closing part of daylight before nightfall." },
  { name: "NIGHT", category: "Time", description: "The nocturnal hours of darkness." },

  // Education
  { name: "SCHOOL", category: "Education", description: "An educational institution for primary and secondary learning." },
  { name: "SCHOOLS", category: "Education", description: "Educational academic institutions and public campuses." },
  { name: "COLLEGE", category: "Education", description: "An institute for undergraduate or postgraduate higher education." },
  { name: "STUDENT", category: "Education", description: "An individual enrolled in educational study." },
  { name: "TEACHER", category: "Education", description: "An educator imparting structured knowledge." },
  { name: "EXAM", category: "Education", description: "A formal evaluation of academic competence." },

  // Health
  { name: "HOSPITAL", category: "Health", description: "A clinical healthcare facility providing acute medical care." },
  { name: "DOCTOR", category: "Health", description: "A licensed healthcare practitioner and physician." },
  { name: "HEALTH", category: "Health", description: "State of complete physical, mental, and social wellness." },
  { name: "MEDICINE", category: "Health", description: "Pharmaceutical substance formulated to heal disease." },
  { name: "EMERGENCY", category: "Health", description: "A sudden crisis calling for urgent medical triage." },

  // Transport
  { name: "TRAIN", category: "Transport", description: "Locomotive carriages moving on designated railway tracks." },
  { name: "BUS", category: "Transport", description: "Large transit passenger road vehicle on scheduled routes." },
  { name: "ROAD", category: "Transport", description: "Paved thoroughfare constructed for vehicular transit." },
  { name: "TRAFFIC", category: "Transport", description: "Vehicular congestion along major metropolitan corridors." },
  { name: "AIRPORT", category: "Transport", description: "Aerodrome infrastructure for passenger and cargo flight operations." },

  // Public services
  { name: "GOVERNMENT", category: "Public Services", description: "Constitutional executive and administrative authorities." },
  { name: "POLICE", category: "Public Services", description: "Civil security force enforcing law and public order." },
  { name: "PUBLIC", category: "Public Services", description: "General citizenry and members of the community." },
  { name: "ANNOUNCEMENT", category: "Public Services", description: "Official bulletin broadcast to inform the populace." },
  { name: "HELP", category: "Public Services", description: "Direct aid, assistance, and humanitarian relief." },

  // Environment
  { name: "ENVIRONMENT", category: "Environment", description: "The natural ecological biosphere and ambient climate." },
  { name: "POLLUTION", category: "Environment", description: "Harmful airborne or environmental particulate contamination." },
  { name: "WATER", category: "Environment", description: "Vital liquid resource essential for life and ecosystems." },
  { name: "AIR", category: "Environment", description: "Atmospheric gaseous mixture breathed by all living organisms." },
  { name: "TEMPERATURE", category: "Environment", description: "Thermal measurement quantifying heat or cold levels." },

  // General news
  { name: "NEWS", category: "General News", description: "Current developments reported across broadcast journalism." },
  { name: "ALERT", category: "General News", description: "High-priority notification demanding immediate public attention." },
  { name: "UPDATE", category: "General News", description: "Fresh developments adding to ongoing reporting." },
  { name: "IMPORTANT", category: "General News", description: "Significantly consequential event or advisory notice." },
  { name: "INFORMATION", category: "General News", description: "Verified factual details communicated to the public." },
  { name: "CLOSE", category: "General News", description: "To shut down or suspend public activities and facilities." },
  { name: "CLOSED", category: "General News", description: "Shut or suspended for public entrance or operation." },
  { name: "STOP", category: "General News", description: "Halt or suspend vehicular transit or event operations." },
];

const PASTEL_THEMES = [
  { bg: "var(--pastel-mint)", tagBg: "var(--dribbble-card-bg)" },
  { bg: "var(--pastel-blue)", tagBg: "var(--dribbble-card-bg)" },
  { bg: "var(--pastel-lavender)", tagBg: "var(--dribbble-card-bg)" },
  { bg: "var(--pastel-yellow)", tagBg: "var(--dribbble-card-bg)" },
  { bg: "var(--pastel-coral)", tagBg: "var(--dribbble-card-bg)" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

export default function SignDictionary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeSign, setActiveSign] = useState(null);

  const categories = [
    "All",
    ...new Set(signs.map((sign) => sign.category)),
  ];

  const filteredSigns = signs.filter((sign) => {
    const matchesSearch =
      sign.name.toLowerCase().includes(search.toLowerCase()) ||
      sign.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || sign.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="translator-page">
      {/* Top Banner with Dribbble-style typography & speech bubble */}
      <div className="section-intro" style={{ marginBottom: "28px" }}>
        <div>
          <span className="hero-badge" style={{ marginBottom: "12px", display: "inline-flex" }}>
            ISL VOCABULARY & GESTURES
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-1px", margin: "6px 0 10px" }}>
            Sign Dictionary & Gestures
          </h2>
          <p className="section-description" style={{ fontSize: "16px", color: "var(--dribbble-ink-muted)" }}>
            Explore verified Indian Sign Language (ISLRTC-standard) whole-concept gestures, linguistic parameters, and alphabet fingerspelling.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "var(--pastel-yellow)",
              border: "var(--dribbble-border)",
              boxShadow: "var(--dribbble-shadow-sm)",
              fontWeight: "800",
              fontSize: "13px",
            }}
          >
            {signs.length} Curated ISL Concepts
          </span>
        </div>
      </div>

      {/* Main Workspace Card */}
      <section className="workspace-card" style={{ marginBottom: "36px" }}>
        {/* Search Bar & Category Quick Pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
              <input
                className="concept-search"
                type="search"
                placeholder="Search signs (e.g. Rain, Flood, Hospital, Doctor, School)..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{ width: "100%", paddingLeft: "42px", boxSizing: "border-box" }}
              />
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.6 }}>
                🔍
              </span>
            </div>

            <select
              className="concept-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{ cursor: "pointer" }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>
          </div>

          {/* Quick-filter Category Pills inspired by Dribbble Synapse header */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "var(--dribbble-border-thin)",
                    background: isSelected ? "var(--dribbble-ink)" : "var(--dribbble-card-bg)",
                    color: isSelected ? "var(--dribbble-bg)" : "var(--dribbble-ink)",
                    fontSize: "12px",
                    fontWeight: "800",
                    cursor: "pointer",
                    boxShadow: isSelected ? "none" : "var(--dribbble-shadow-sm)",
                    transform: isSelected ? "translate(1px, 1px)" : "none",
                    transition: "background 0.15s ease, color 0.15s ease",
                  }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Concept Cards Grid - Framer Motion Staggered Entrances */}
        {filteredSigns.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              background: "var(--pastel-yellow)",
              border: "var(--dribbble-border)",
              borderRadius: "20px",
              boxShadow: "var(--dribbble-shadow-sm)",
            }}
          >
            <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>🧐</span>
            <h4 style={{ margin: "0 0 6px", fontWeight: "800" }}>No matching concepts found</h4>
            <p style={{ margin: 0, color: "var(--dribbble-ink-muted)", fontSize: "14px" }}>
              Try searching another keyword or reset the category filter.
            </p>
          </div>
        ) : (
          <motion.div
            className="dictionary-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={`${category}-${search}`}
          >
            <AnimatePresence>
              {filteredSigns.map((sign, idx) => {
                const hasWholeSign = Boolean(getConceptSign(sign.name));
                const theme = PASTEL_THEMES[idx % PASTEL_THEMES.length];

                return (
                  <motion.article
                    className="dictionary-card"
                    key={sign.name}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSign(sign)}
                    style={{
                      backgroundColor: theme.bg,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "220px",
                    }}
                  >
                    {/* Card Header */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "9999px",
                            background: theme.tagBg,
                            border: "var(--dribbble-border-thin)",
                            boxShadow: "1.5px 1.5px 0px var(--dribbble-ink)",
                            fontSize: "11px",
                            fontWeight: "800",
                            color: "var(--dribbble-ink)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {sign.category}
                        </span>

                        {hasWholeSign ? (
                          <span
                            title="Verified ISL Whole-Sign Gesture Available"
                            style={{
                              padding: "3px 8px",
                              borderRadius: "9999px",
                              background: "#10b981",
                              color: "#FFFFFF",
                              border: "1.5px solid var(--dribbble-ink)",
                              fontSize: "10px",
                              fontWeight: "900",
                              boxShadow: "1.5px 1.5px 0px var(--dribbble-ink)",
                            }}
                          >
                            ★ WHOLE SIGN
                          </span>
                        ) : (
                          <span
                            title="Fingerspelling Available"
                            style={{
                              padding: "3px 8px",
                              borderRadius: "9999px",
                              background: "var(--dribbble-card-bg)",
                              color: "var(--dribbble-ink)",
                              border: "1.5px solid var(--dribbble-ink)",
                              fontSize: "10px",
                              fontWeight: "800",
                            }}
                          >
                            🔤 SPELL
                          </span>
                        )}
                      </div>

                      {/* Word Name */}
                      <h3 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                        {sign.name}
                      </h3>

                      {/* Description */}
                      <p style={{ fontSize: "13px", lineHeight: "1.5", margin: 0, color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>
                        {sign.description}
                      </p>
                    </div>

                    {/* Card Bottom / Action Row with Circular Arrow Button */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "20px",
                        paddingTop: "12px",
                        borderTop: "1.5px dashed rgba(18, 18, 18, 0.2)",
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--dribbble-ink)" }}>
                        {hasWholeSign ? "Watch Gesture" : "View Spell"}
                      </span>
                      <motion.button
                        type="button"
                        className="btn-circle-arrow"
                        aria-label={`View sign for ${sign.name}`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.92 }}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "var(--dribbble-card-bg)",
                          border: "var(--dribbble-border-thin)",
                          boxShadow: "var(--dribbble-shadow-sm)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "15px",
                          fontWeight: "900",
                          cursor: "pointer",
                          color: "var(--dribbble-ink)",
                        }}
                      >
                        →
                      </motion.button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* PORTAL-BASED GESTURE PLAYBACK MODAL: Centered immediately, zero scrolling needed */}
      <GestureModal
        sign={activeSign}
        isOpen={Boolean(activeSign)}
        onClose={() => setActiveSign(null)}
      />
    </div>
  );
}
