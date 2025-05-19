import { useState } from "react";
import stateData from "./stateData";

export default function Sidebar({ stateName, onClose }) {
  const [filter, setFilter] = useState("All");

  const stateInfo = stateData[stateName] || {};
  const destinations = stateInfo.places || [];
  const banner = stateInfo.banner;

  const filtered = destinations.filter(
    (place) => filter === "All" || place.category === filter.toLowerCase()
  );

  // Helper function to create Google search URL
  const getGoogleSearchUrl = (title) => {
    const query = encodeURIComponent(title);
    return `https://www.google.com/search?q=${query}`;
  };

  return (
    <div
      className="sidebar open"
      style={{
        position: "relative",
        maxWidth: "100%",
        width: "80vw",
        overflowX: "hidden",
      }}
    >
      {/* Back arrow button on left side */}
      <button
        onClick={() => onClose()}
        aria-label="Close sidebar"
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          fontSize: "1.8rem",
          background: "transparent",
          border: "none",
          cursor: "poicss nter",
          fontWeight: "bold",
          lineHeight: 1,
          zIndex: 9999,
        }}
      >
        ←
      </button>

      {banner && (
        <img
          src={banner}
          alt={`${stateName} banner`}
          style={{
            width: "900px",
            maxHeight: "500px",
            objectFit: "fill",
            borderRadius: "8px",
            marginBottom: "15px",
            marginTop: "50px",
            marginLeft: "0px",
          }}
        />
      )}
      <h2 style={{ marginLeft: "20px" }}>{stateName}</h2>

      <div className="filters" style={{ marginLeft: "20px" }}>
        {["All", "Spiritual", "Historic", "Educational", "Nature"].map(
          (cat) => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => setFilter(cat)}
              style={{ marginRight: "10px" }}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="cards" style={{ marginLeft: "20px" }}>
        {filtered.map((place, idx) => (
          <div className="card" key={idx}>
            <a
              href={getGoogleSearchUrl(place.title)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Search Google for ${place.title}`}
            >
              <img src={place.img} alt={place.title} style={{ cursor: "pointer" }} />
            </a>
            <div className="title">{place.title}</div>
            <div className="stars">{"⭐".repeat(place.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
