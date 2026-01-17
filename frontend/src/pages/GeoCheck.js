import React, { useState } from "react";

function GeoCheck() {
  const [status, setStatus] = useState(null);
  const [distance, setDistance] = useState(null);
  const [punch, setPunch] = useState(null);

  // 📍 SITE LOCATION (example)
  const SITE_LAT = 28.6292;
  const SITE_LNG = 77.3727;
  const ALLOWED_RADIUS = 500; // meters

  // 📐 Distance calculation (Haversine)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  // 📡 Check location
  const checkLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = getDistance(
          pos.coords.latitude,
          pos.coords.longitude,
          SITE_LAT,
          SITE_LNG
        );

        setDistance(dist.toFixed(2));
        setStatus(dist <= ALLOWED_RADIUS ? "INSIDE" : "OUTSIDE");
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>📍 Geo-Fencing & Attendance</h3>

      {/* Location Button */}
      <button
        onClick={checkLocation}
        style={styles.btn}
        onMouseOver={(e) => (e.target.style.opacity = "0.85")}
        onMouseOut={(e) => (e.target.style.opacity = "1")}
      >
        📡 Check My Location
      </button>

      {/* Distance */}
      {distance && (
        <p style={styles.text}>
          <b>Distance:</b> {distance} meters
        </p>
      )}

      {/* Status */}
      {status && (
        <p
          style={{
            fontWeight: "bold",
            color: status === "INSIDE" ? "green" : "red",
          }}
        >
          Status: {status === "INSIDE" ? "INSIDE ✅" : "OUTSIDE ❌"}
        </p>
      )}

      {/* Punch IN / OUT */}
      {status === "INSIDE" && (
        <div style={{ marginTop: "10px" }}>
          <button
            style={{ ...styles.btn, background: "#28a745" }}
            onClick={() => setPunch("IN")}
          >
            ⏱ Punch IN
          </button>

          <button
            style={{ ...styles.btn, background: "#dc3545", marginTop: "8px" }}
            onClick={() => setPunch("OUT")}
          >
            ⏱ Punch OUT
          </button>
        </div>
      )}

      {punch && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Attendance Status:{" "}
          {punch === "IN" ? "🟢 PUNCHED IN" : "🔴 PUNCHED OUT"}
        </p>
      )}

      {/* 🌍 Google Map */}
      <iframe
        title="Site Location"
        width="100%"
        height="230"
        style={{ borderRadius: "10px", marginTop: "15px" }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps?q=${SITE_LAT},${SITE_LNG}&z=15&output=embed`}
      ></iframe>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "380px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    color: "#333",
  },
  heading: {
    marginBottom: "10px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s",
  },
  text: {
    marginTop: "8px",
  },
};

export default GeoCheck;
