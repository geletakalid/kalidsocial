import React, { useState, useEffect } from "react";
import { Paper, Button, IconButton, CircularProgress } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const items = [
  {
    name: "Sunset over the mountains",
    description: "A calm evening view of the mountains.",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Forest trail",
    description: "Walking through the green forest.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Ocean cliff",
    description: "Waves hitting the rocky cliff.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function CustomCarousel() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Auto-play every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  });

  const handleNext = () => {
    setLoaded(false);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setLoaded(false);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[index];

  return (
    <Paper
      elevation={3}
      style={{
        position: "relative",
        borderRadius: 0, // full width style
        overflow: "hidden",
        width: "100%",   // ✅ stretches full width
        margin: "0 auto",
        textAlign: "center",
         marginTop:'4vw'
      }}
    >
      {/* IMAGE WRAPPER */}
      <div
        style={{
          width: "100%",
          height: 400, // fixed height (desktop & mobile)
          backgroundColor: "#ddd",
          position: "relative"
        }}
      >
        {!loaded && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <CircularProgress />
          </div>
        )}
        <img
          src={currentItem.img}
          alt={currentItem.name}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: loaded ? "block" : "none",
            transition: "opacity 0.6s ease-in-out"
          }}
        />
      </div>

      {/* TEXT */}
      <div style={{ padding: 16 }}>
        <h2>{currentItem.name}</h2>
        <p>{currentItem.description}</p>
        <Button variant="contained" color="primary">
          Learn More
        </Button>
      </div>

      {/* NAVIGATION */}
      <IconButton
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.7)"
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.7)"
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* INDICATORS */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        {items.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              margin: "0 4px",
              cursor: "pointer",
              backgroundColor: i === index ? "#10716B" : "#ccc",
              transition: "background-color 0.3s ease"
            }}
          />
        ))}
      </div>
    </Paper>
  );
}