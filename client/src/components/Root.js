import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g. fetching user, API, assets)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FAF3E7",
        flexDirection: "column"
      }}>
        <img src="/logo192.png" alt="Loading..." width="80" />
        <h2 style={{ color: "#10716B" }}>Loading...</h2>
      </div>
    );
  }

  return <App />;
}