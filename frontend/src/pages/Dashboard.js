import React, { useEffect, useState } from "react";
import API from "../services/api";
import GeoCheck from "./GeoCheck";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/test/protected");
        setData(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };
    fetchData();
  }, []);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
}, []);


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📊 Dashboard</h1>

      {data ? (
        <div style={styles.card}>
          <p><b>Message:</b> {data.message}</p>
          <p><b>User Role:</b> {data.user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <GeoCheck />

      <button onClick={logout} style={styles.logout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "40px",
    color: "white",
    fontFamily: "Arial",
  },
  heading: {
    marginBottom: "20px",
  },
  card: {
    background: "white",
    color: "#333",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
    width: "350px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  logout: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#ff4b5c",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Dashboard;
