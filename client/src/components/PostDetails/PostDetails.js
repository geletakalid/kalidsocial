import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import image from "./../../images/PostDefaultImage.jpg";
import ShareIcon from "@material-ui/icons/Share";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  // ✅ Show buttons if message has more than 935 characters
  useEffect(() => {
    if (post?.message && post.message.length > 935) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, [post?.message]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  // 🔹 Helper to extract embed URL from YouTube link
  const getEmbedUrl = (url) => {
    if (!url) return null;
    let videoId = null;
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
      }
    } catch (err) {
      console.error("Invalid YouTube URL:", url, err);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const videoUrl = getEmbedUrl(post.youtubelink);

  // ✅ Share handler
  const shareLink = `https://refreshingmoments.org/posts/${post._id}`;
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: "Check out this post on Refreshing Moments!",
          url: shareLink,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Paper style={{ padding: "5px", borderRadius: "15px", marginTop: "80px" }}>
      <div className={classes.card}>
        {/* Left Section (Text + Comments) */}
        <div className={classes.section}>
          <Typography variant="h4" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" sx={{ fontSize: "14px" }}>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          {/* Scrollable Message Box */}
          <div className={classes.messageBox} id="messageBox">
            <Typography variant="body1" id="messageText">
              {post.message}
            </Typography>
          </div>

          {/* Scroll Buttons (below message box) */}
          {showScroll && (
            <div className={classes.scrollControls}>
              <Button
                className={classes.scrollButton}
                onClick={() => {
                  const box = document.getElementById("messageBox");
                  const text = document.getElementById("messageText");
                  const lineHeight =
                    parseInt(window.getComputedStyle(text).lineHeight, 10) || 20;
                  box.scrollBy({ top: -lineHeight, behavior: "smooth" });
                }}
              >
                ↑ Up
              </Button>
              <Button
                className={classes.scrollButton}
                onClick={() => {
                  const box = document.getElementById("messageBox");
                  const text = document.getElementById("messageText");
                  const lineHeight =
                    parseInt(window.getComputedStyle(text).lineHeight, 10) || 20;
                  box.scrollBy({ top: lineHeight, behavior: "smooth" });
                }}
              
              >
                ↓ Down
              </Button>
            </div>
          )}

          {/* Author + Share button */}
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: "14px" }}>
              By {post.name}
            </Typography>
            <Tooltip title="Share">
              <IconButton onClick={handleShare} color="primary">
                <ShareIcon style={{ color: "#10716B" }}  />
              </IconButton>
            </Tooltip>
          </div>

          <Typography variant="body2" color="textSecondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />

          <CommentSection post={post} />
        </div>

        {/* Right Section (Video Player or Fallback Image) */}
        <div className={classes.videoSection}>
          {videoUrl ? (
            <iframe
              className={classes.videoPlayer}
              src={videoUrl}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={post.selectedFile || image}
              alt={post.title}
              className={classes.image}
            />
          )}
        </div>
      </div>

      {/* Recommended Section */}
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Card
                  key={_id}
                  className={classes.recommendedCard}
                  onClick={() => openPost(_id)}
                >
                  <CardMedia
                    className={classes.recommendedImage}
                    image={selectedFile || image}
                    title={title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {name}
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Likes: {likes.length}
                    </Typography>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;