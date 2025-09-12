import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import reducers from "./reducers";
import { fetchPosts } from "./api"; // ✅ your API

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function Root() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { data } = await fetchPosts(1); // wait for API
        console.log("Initial posts loaded:", data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src="/logo192.png" alt="Loading..." className="loading-logo" />
        <h2 className="loading-text">Refreshing Moments</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen" style={{ backgroundColor: "#FFF0F0" }}>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="638337762056-hhputi9bj841r4pklqe4m93d0rrjdaud.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));