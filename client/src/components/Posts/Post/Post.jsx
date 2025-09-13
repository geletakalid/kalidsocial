import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost, getPost } from "../../../actions/posts";
import image from "./../../../images/PostDefaultImage.jpg";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.sub || user?.result?._id;
  const hasLikedPost = post.likes.find(
    (like) => like === (user?.result?.sub || user?.result?._id)
  );

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />&nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />&nbsp;
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
      </>
    );
  };

  const openPost = () => {
    dispatch(getPost(post._id, history));
    history.push(`/posts/${post._id}`);
  };

  // ✅ Share handler
  const shareLink = `https://refreshingmoments.org/posts/${post._id}`;
  const handleShare = async (e) => {
    e.stopPropagation(); // prevent card click

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
    <Card className={classes.card}>
      {/* Make entire card clickable */}
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
        component="span"
      >
        <CardMedia
          className={classes.cardMedia}
          image={post.selectedFile || image}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6" style={{ color: "#10716B" }} >{post.name}</Typography>
          <Typography variant="body2" style={{ color: "#10716B" }} >
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ wordBreak: "break-word", whiteSpace: "normal" }}
          >
            {post.message.length > 50
              ? `${post.message.substring(0, 50)}...`
              : post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
       style={{ color: "#10716B" }} 
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              setCurrentId(post._id);
              history.push("/update-post");
            }}
          >
            Edit
          </Button>
        )}

        <Button
          size="small"
        style={{ color: "#10716B" }} 
          disabled={!user?.result}
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            handleLike();
          }}
        >
          <Likes />
        </Button>

        {/* ✅ Share Button */}
        <Tooltip title="Share">
          <IconButton size="small" color="primary" onClick={handleShare}>
            <ShareIcon fontSize="small" style={{ color: "#10716B" }} />
          </IconButton>
        </Tooltip>

        {(user?.result?.sub === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
        style={{ color: "#10716B" }} 
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;