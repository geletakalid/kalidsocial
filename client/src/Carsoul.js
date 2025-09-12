import React, { useState, useEffect } from "react";
import { Paper, Button, IconButton, CircularProgress } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import defaultImg from "./images/PostDefaultImage.jpg";
import { fetchPosts } from "./api";

export default function CustomCarousel() {
  const [initialPosts, setInitialPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch posts from API with page=1
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await fetchPosts(1); // API returns { data, currentPage, totalPages }
        
        setInitialPosts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setInitialPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  // ✅ Prepare items
  const items = initialPosts.slice(0, 5).map((post) => ({
    name: post?.title || "Untitled",
    description: post?.message
      ? post.message.length > 30
        ? post.message.substring(0, 30) + "..."
        : post.message
      : "No description available",
    img:
      post?.selectedFile && post.selectedFile.trim() !== ""
        ? post.selectedFile
        : defaultImg,
    link: `/posts/${post?._id}`,
  }));

  // ✅ Auto-play every 4s
  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handleNext = () => {
    if (items.length === 0) return;
    setLoaded(false);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setLoaded(false);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // ✅ Show message if nothing at all
  if (!isLoading && items.length === 0) {
    return (
      <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
        <p>No posts available</p>
      </Paper>
    );
  }

  const currentItem = items[index] || {};

  return (
    <Paper
      elevation={3}
      style={{
        position: "relative",
        borderRadius: 0,
        overflow: "hidden",
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "4vw",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: 400,
          backgroundColor: "#ddd",
          position: "relative",
        }}
      >
        

        <img
          src={currentItem.img || defaultImg}
          alt={currentItem.name || "Default post"}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "1" ,
            transition: "opacity 0.6s ease-in-out",
          }}
        />
      </div>

      {/* TEXT */}
      <div style={{ padding: 16 }}>
        <h2>{currentItem.name}</h2>
        <p>{currentItem.description}</p>
        <Button
          style={{
            backgroundColor: "#FAF3E7",
            color: "#10716B",
          }}
          variant="contained"
          href={currentItem.link}
        >
          Read More
        </Button>
      </div>

      {/* NAVIGATION */}
      {items.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.7)",
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
              background: "rgba(255,255,255,0.7)",
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}

      {/* INDICATORS */}
      {items.length > 1 && (
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
        >
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
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </Paper>
  );
}