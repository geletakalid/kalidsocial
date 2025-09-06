import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";

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

export default function MyCarousel() {
  return (
    
    <Carousel
      autoPlay
      animation="slide"
      indicators
      navButtonsAlwaysVisible
      interval={4000}
    >
      {items.map((item, i) => (
        <Paper
          key={i}
          style={{ padding: 16, textAlign: "center", borderRadius: 12 }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 12 }}
          />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Paper>
      ))}
    </Carousel>
  );
}
