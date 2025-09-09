import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  LinearProgress,
} from "@material-ui/core";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";

const Form = ({ currentId, setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  const post = currentId ? posts.find((p) => p._id === currentId) : null;
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
   youtubelink:"",
    selectedFile: "",
 
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();
useEffect(() => {
  if (post) {
    setPostData(post);
  } else {
    setPostData({ title: "", message: "", tags: "", selectedFile: "",youtubelink:"", }); // ✅ reset fields
  }
}, [currentId, post]);

  const clear = () => {
    setPostData({ title: "", message: "", tags: "", selectedFile: "",youtubelink:"", });
    setCurrentId(null);
    setProgress(0);
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    } else {
      (user?.result?.sub
        ? dispatch(
            createPost(
              { ...postData, name: user?.result?.name, creator: user?.result?.sub },
              history
            )
          )
        : dispatch(
            createPost(
              { ...postData, name: user?.result?.name, creator: user?.result?._id },
              history
            )
          ));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own post and like other's post
        </Typography>
      </Paper>
    );
  }

  // Simulate progress bar animation when FileBase finishes
  const handleFileDone = ({ base64 }) => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    setPostData({ ...postData, selectedFile: base64 });
  };

  return (
    <Paper elevation={6} className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom>
          {!currentId ? "Create a Post" : "Update a Post"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="youtubelink"
          variant="outlined"
          label="YouTube Link"
          fullWidth
          value={postData.youtubelink}
          onChange={(e) =>
            setPostData({ ...postData, youtubelink: e.target.value })
          }
        />

        {/* Upload Box */}
        <div className={classes.uploadBox}>
          <label className={classes.uploadLabel}>
            {postData.selectedFile ? (
              <img
                src={postData.selectedFile}
                alt="preview"
                className={classes.preview}
              />
            ) : (
              <div className={classes.uploadPlaceholder}>
                <CloudUploadIcon fontSize="large" color="action" />
                <Typography variant="body2" color="textSecondary">
                  Click to upload
                </Typography>
              </div>
            )}
            <FileBase
              type="file"
              multiple={false}
              onDone={handleFileDone}
            />
          </label>

          {uploading && (
            <LinearProgress
              variant="determinate"
              value={progress}
              className={classes.progress}
            />
          )}
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;