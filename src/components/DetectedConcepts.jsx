import { useState } from "react";
import { getConceptSign } from "../data/islConceptSigns";
import GestureModal from "./GestureModal";

const conceptData = [
  // Weather
  { name: "RAIN", category: "Weather", status: "Available", description: "Water falling from clouds in droplets" },
  { name: "RAINFALL", category: "Weather", status: "Available", description: "Steady atmospheric precipitation" },
  { name: "PRECIPITATION", category: "Weather", status: "Available", description: "Atmospheric moisture condensation" },
  { name: "STORM", category: "Weather", status: "Available", description: "Violent atmospheric disturbance" },
  { name: "CYCLONE", category: "Weather", status: "Available", description: "Rotating low pressure vortex system" },
  { name: "DROUGHT", category: "Weather", status: "Available", description: "Severe deficiency in precipitation" },

  // Disasters
  { name: "FLOOD", category: "Disaster", status: "Available", description: "Submersion of land by excess water" },
  { name: "FLOODING", category: "Disaster", status: "Available", description: "Rising inundation submerging terrain" },
  { name: "LANDSLIDE", category: "Disaster", status: "Available", description: "Mass downward movement of earth materials" },
  { name: "EARTHQUAKE", category: "Disaster", status: "Available", description: "Tectonic seismic crust tremor" },
  { name: "TSUNAMI", category: "Disaster", status: "Available", description: "Harbor waves caused by undersea displacement" },
  { name: "WARNING", category: "Disaster", status: "Available", description: "Urgent threat advisory alert" },
  { name: "RESCUE", category: "Disaster", status: "Available", description: "Emergency extrication and life saving" },

  // Locations
  { name: "MUMBAI", category: "Location", status: "Available", description: "Coastal financial capital of Maharashtra" },
  { name: "INDIA", category: "Location", status: "Available", description: "Federal Republic of India" },
  { name: "DELHI", category: "Location", status: "Available", description: "National Capital Territory" },
  { name: "PUNE", category: "Location", status: "Available", description: "Major cultural city in Western India" },
  { name: "VILLAGE", category: "Location", status: "Available", description: "Rural agrarian settlement" },
  { name: "CITY", category: "Location", status: "Available", description: "High-density urban municipal center" },

  // Time
  { name: "TODAY", category: "Time", status: "Available", description: "Current active 24-hour cycle" },
  { name: "TOMORROW", category: "Time", status: "Available", description: "Next upcoming diurnal cycle" },
  { name: "YESTERDAY", category: "Time", status: "Available", description: "Preceding calendar day" },
  { name: "MORNING", category: "Time", status: "Available", description: "Early daylight hours" },
  { name: "EVENING", category: "Time", status: "Available", description: "Twilight dusk transition hours" },
  { name: "NIGHT", category: "Time", status: "Available", description: "Nocturnal solar absence period" },

  // Education
  { name: "SCHOOL", category: "Education", status: "Available", description: "Primary/secondary academy for youth" },
  { name: "SCHOOLS", category: "Education", status: "Available", description: "Educational campuses and institutions" },
  { name: "COLLEGE", category: "Education", status: "Available", description: "Higher academic degree institution" },
  { name: "STUDENT", category: "Education", status: "Available", description: "Scholar enrolled in coursework" },
  { name: "TEACHER", category: "Education", status: "Available", description: "Faculty imparting education" },
  { name: "EXAM", category: "Education", status: "Available", description: "Formal standardized proficiency assessment" },

  // Health
  { name: "HOSPITAL", category: "Health", status: "Available", description: "Tertiary clinical medical treatment center" },
  { name: "DOCTOR", category: "Health", status: "Available", description: "Licensed medical physician" },
  { name: "HEALTH", category: "Health", status: "Available", description: "Physical, psychological and social wellbeing" },
  { name: "MEDICINE", category: "Health", status: "Available", description: "Curative therapeutic pharmacological compound" },
  { name: "EMERGENCY", category: "Health", status: "Available", description: "Acute life critical situation" },

  // Transport
  { name: "TRAIN", category: "Transport", status: "Available", description: "Rail locomotive carriages" },
  { name: "BUS", category: "Transport", status: "Available", description: "Public passenger transit vehicle" },
  { name: "ROAD", category: "Transport", status: "Available", description: "Engineered vehicular roadway" },
  { name: "TRAFFIC", category: "Transport", status: "Available", description: "Volume of moving vehicles" },
  { name: "AIRPORT", category: "Transport", status: "Available", description: "Aviation runway and passenger terminal" },

  // Government and public services
  { name: "GOVERNMENT", category: "Public Services", status: "Available", description: "Executive, legislative and civic authority" },
  { name: "POLICE", category: "Public Services", description: "Law enforcement civil protection force", status: "Available" },
  { name: "PUBLIC", category: "Public Services", status: "Available", description: "General community populace" },
  { name: "ANNOUNCEMENT", category: "Public Services", status: "Available", description: "Official civic broadcast communique" },
  { name: "HELP", category: "Public Services", status: "Available", description: "Civic assistance and mutual aid" },

  // Environment
  { name: "ENVIRONMENT", category: "Environment", status: "Available", description: "Natural planetary biosphere" },
  { name: "POLLUTION", category: "Environment", status: "Available", description: "Contaminant discharge in air/water" },
  { name: "WATER", category: "Environment", status: "Available", description: "Freshwater aquatic resource" },
  { name: "AIR", category: "Environment", status: "Available", description: "Atmospheric oxygen breathing mixture" },
  { name: "TEMPERATURE", category: "Environment", status: "Available", description: "Degrees Celsius meteorological reading" },

  // General news
  { name: "NEWS", category: "General News", status: "Available", description: "Broadcast report of current events" },
  { name: "ALERT", category: "General News", status: "Available", description: "Critical safety bulletin" },
  { name: "UPDATE", category: "General News", status: "Available", description: "Latest incoming news reports" },
  { name: "IMPORTANT", category: "General News", status: "Available", description: "High-priority imperative information" },
  { name: "INFORMATION", category: "General News", status: "Available", description: "Verified factual public data" },
  { name: "CLOSE", category: "General News", status: "Available", description: "To shut or suspend operations" },
  { name: "CLOSED", category: "General News", status: "Available", description: "Shut or suspended for public access" },
  { name: "STOP", category: "General News", status: "Available", description: "Halt or suspend movement and transit" },
];

export default function DetectedConcepts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"
  const [activeSignName, setActiveSignName] = useState(null);

  const categories = [
    "All",
    ...new Set(conceptData.map((concept) => concept.category)),
  ];

  const filteredConcepts = conceptData.filter((concept) => {
    const matchesSearch = concept.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      (concept.description && concept.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      category === "All" || concept.category === category;

    return matchesSearch && matchesCategory;
  });

  const activeSignData = activeSignName ? getConceptSign(activeSignName) : null;

  return (
    <div className="translator-page">
      {/* Intro Header */}
      <div className="section-intro" style={{ marginBottom: "28px" }}>
        <div>
          <span className="hero-badge" style={{ marginBottom: "12px", display: "inline-flex" }}>
            SAMVAAD KNOWLEDGE BASE
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-1px", margin: "6px 0 10px" }}>
            Detected Concepts Library
          </h2>
          <p className="section-description" style={{ fontSize: "16px", color: "var(--dribbble-ink-muted)" }}>
            Discover the high-priority news vocabulary mapped by SAMVAAD into structured Indian Sign Language (ISL) gloss tokens.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "var(--pastel-mint)",
              border: "var(--dribbble-border)",
              boxShadow: "var(--dribbble-shadow-sm)",
              fontWeight: "800",
              fontSize: "13px",
            }}
          >
            ● {conceptData.length} Live Concepts
          </span>
        </div>
      </div>

      {/* Summary Bento Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            background: "var(--pastel-yellow)",
            border: "var(--dribbble-border)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "var(--dribbble-shadow-sm)",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase" }}>Total Vocabulary</span>
          <div style={{ fontSize: "32px", fontWeight: "900", margin: "4px 0" }}>{conceptData.length}</div>
          <span style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>Key news entities</span>
        </div>

        <div
          style={{
            background: "var(--pastel-lavender)",
            border: "var(--dribbble-border)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "var(--dribbble-shadow-sm)",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase" }}>Categories</span>
          <div style={{ fontSize: "32px", fontWeight: "900", margin: "4px 0" }}>{categories.length - 1}</div>
          <span style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>Domains organized</span>
        </div>

        <div
          style={{
            background: "var(--pastel-blue)",
            border: "var(--dribbble-border)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "var(--dribbble-shadow-sm)",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase" }}>Whole Signs</span>
          <div style={{ fontSize: "32px", fontWeight: "900", margin: "4px 0" }}>20+</div>
          <span style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>ISLRTC-grade animated gestures</span>
        </div>

        <div
          style={{
            background: "var(--pastel-mint)",
            border: "var(--dribbble-border)",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "var(--dribbble-shadow-sm)",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase" }}>Grammar Engine</span>
          <div style={{ fontSize: "28px", fontWeight: "900", margin: "4px 0" }}>TSOV</div>
          <span style={{ fontSize: "12px", color: "var(--dribbble-ink-muted)", fontWeight: "600" }}>Time-Space-Object-Verb parser</span>
        </div>
      </div>

      {/* Main Workspace Card */}
      <section className="workspace-card">
        {/* Search & Filter Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
              <input
                className="concept-search"
                type="search"
                placeholder="Search concepts by keyword or domain..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{ width: "100%", paddingLeft: "42px", boxSizing: "border-box" }}
              />
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", opacity: 0.6 }}>
                🔍
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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

              {/* View Toggle */}
              <div
                style={{
                  display: "inline-flex",
                  background: "var(--card-bg)",
                  border: "var(--dribbble-border)",
                  borderRadius: "9999px",
                  padding: "4px",
                  boxShadow: "var(--dribbble-shadow-sm)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  style={{
                    border: "none",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: "800",
                    background: viewMode === "cards" ? "var(--pastel-yellow)" : "transparent",
                    color: "var(--dribbble-ink)",
                    cursor: "pointer",
                  }}
                >
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  style={{
                    border: "none",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: "800",
                    background: viewMode === "table" ? "var(--pastel-yellow)" : "transparent",
                    color: "var(--dribbble-ink)",
                    cursor: "pointer",
                  }}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Category Quick Pills */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "var(--dribbble-border-thin)",
                    background: isSelected ? "var(--dribbble-ink)" : "var(--card-bg)",
                    color: isSelected ? "var(--dribbble-bg)" : "var(--dribbble-ink)",
                    fontSize: "12px",
                    fontWeight: "800",
                    cursor: "pointer",
                    boxShadow: isSelected ? "none" : "1.5px 1.5px 0px var(--dribbble-ink)",
                    transform: isSelected ? "translate(1px, 1px)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        {filteredConcepts.length === 0 ? (
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
            <span style={{ fontSize: "36px", display: "block", marginBottom: "8px" }}>🔎</span>
            <h4 style={{ margin: "0 0 6px", fontWeight: "800" }}>No matching concepts found</h4>
            <p style={{ margin: 0, color: "var(--dribbble-ink-muted)", fontSize: "14px" }}>
              Try searching with another keyword or select a different category.
            </p>
          </div>
        ) : viewMode === "cards" ? (
          /* Cards Grid View */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredConcepts.map((concept) => {
              const hasWholeSign = Boolean(getConceptSign(concept.name));
              return (
                <div
                  key={concept.name}
                  onClick={() => setActiveSignName(concept.name)}
                  style={{
                    background: "var(--card-bg)",
                    border: "var(--dribbble-border)",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "var(--dribbble-shadow)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-3px, -3px)";
                    e.currentTarget.style.boxShadow = "var(--dribbble-shadow-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "var(--dribbble-shadow)";
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          background: "var(--pastel-yellow)",
                          border: "var(--dribbble-border-thin)",
                          fontSize: "11px",
                          fontWeight: "800",
                          boxShadow: "1.5px 1.5px 0px #121212",
                        }}
                      >
                        {concept.category}
                      </span>

                      {hasWholeSign ? (
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            background: "var(--pastel-mint)",
                            border: "1.5px solid #121212",
                            fontSize: "10px",
                            fontWeight: "800",
                          }}
                        >
                          ★ WHOLE SIGN
                        </span>
                      ) : (
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            background: "#F4F1E8",
                            border: "1.5px solid #121212",
                            fontSize: "10px",
                            fontWeight: "700",
                          }}
                        >
                          🔤 FINGERSPELL
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "22px", fontWeight: "900", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                      {concept.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: "13px", color: "var(--dribbble-ink-muted)", lineHeight: "1.5" }}>
                      {concept.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "16px",
                      paddingTop: "12px",
                      borderTop: "1.5px dashed rgba(18, 18, 18, 0.15)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#059669",
                      }}
                    >
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", border: "1px solid #121212" }} />
                      Live in Engine
                    </span>

                    <button
                      type="button"
                      className="btn-circle-arrow"
                      aria-label={`View sign for ${concept.name}`}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "var(--pastel-mint)",
                        border: "var(--dribbble-border-thin)",
                        boxShadow: "2px 2px 0px #121212",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "14px",
                        fontWeight: "900",
                        cursor: "pointer",
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View Styled in Neo-Brutalist Soft Pastel */
          <div className="concept-table-wrap" style={{ border: "var(--dribbble-border)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--dribbble-shadow-sm)" }}>
            <table className="concept-table" style={{ width: "100%", borderCollapse: "collapse", background: "#FFFFFF" }}>
              <thead>
                <tr style={{ background: "var(--pastel-yellow)", borderBottom: "var(--dribbble-border)" }}>
                  <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}>CONCEPT</th>
                  <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}>CATEGORY</th>
                  <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}>SIGN FORMAT</th>
                  <th style={{ padding: "14px 18px", textAlign: "left", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}>STATUS</th>
                  <th style={{ padding: "14px 18px", textAlign: "right", fontSize: "12px", fontWeight: "900", letterSpacing: "1px" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredConcepts.map((concept) => {
                  const hasWholeSign = Boolean(getConceptSign(concept.name));
                  return (
                    <tr
                      key={concept.name}
                      style={{ borderBottom: "1.5px solid rgba(18, 18, 18, 0.1)", transition: "background 0.15s ease", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pastel-yellow)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                      onClick={() => setActiveSignName(concept.name)}
                    >
                      <td style={{ padding: "14px 18px", fontWeight: "800", fontSize: "15px" }}>
                        <span style={{ marginRight: "8px", opacity: 0.6 }}>✦</span>
                        {concept.name}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span className="category-badge">{concept.category}</span>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        {hasWholeSign ? (
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              background: "var(--pastel-mint)",
                              border: "var(--dribbble-border-thin)",
                              fontSize: "11px",
                              fontWeight: "800",
                            }}
                          >
                            ★ Whole Sign Gesture
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "9999px",
                              background: "var(--card-bg)",
                              border: "var(--dribbble-border-thin)",
                              fontSize: "11px",
                              fontWeight: "700",
                            }}
                          >
                            🔤 Fingerspelling
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            background: "var(--pastel-mint)",
                            border: "1.5px solid var(--dribbble-ink)",
                            fontSize: "11px",
                            fontWeight: "800",
                            color: "var(--dribbble-ink)",
                          }}
                        >
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                          {concept.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "right" }}>
                        <button
                          type="button"
                          style={{
                            padding: "6px 14px",
                            borderRadius: "9999px",
                            background: "var(--btn-secondary-bg)",
                            color: "var(--btn-secondary-text)",
                            border: "var(--dribbble-border-thin)",
                            fontSize: "12px",
                            fontWeight: "800",
                            cursor: "pointer",
                            boxShadow: "var(--dribbble-shadow-sm)",
                          }}
                        >
                          Preview →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div
          style={{
            marginTop: "24px",
            padding: "16px 20px",
            borderRadius: "16px",
            background: "var(--pastel-yellow)",
            border: "var(--dribbble-border-thin)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "20px" }}>💡</span>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "var(--dribbble-ink)" }}>
            <strong>Continuous Expansion:</strong> New disaster bulletins and emergency advisories automatically cross-reference these ISL concepts to determine whole-sign vs fingerspelling rendering pathways.
          </p>
        </div>
      </section>

      {/* PORTAL-BASED GESTURE PLAYBACK MODAL: Centered immediately, zero scrolling needed */}
      <GestureModal
        sign={activeSignName ? conceptData.find((c) => c.name === activeSignName) : null}
        isOpen={Boolean(activeSignName)}
        onClose={() => setActiveSignName(null)}
      />
    </div>
  );
}
