import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Card, CardContent } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  // If post.selectedFile is a YouTube link, use it directly
  const videoUrl = post.selectedFile?.includes('youtube.com') || post.selectedFile?.includes('youtu.be')
    ? post.selectedFile
    : null;

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h4" component="h2" gutterBottom>{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1">{post.message}</Typography>
          <Typography variant="subtitle1" color="textSecondary">By {post.name}</Typography>
          <Typography variant="body2" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />

          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>

        <div className={classes.videoSection}>
          {videoUrl ? (
            <iframe
              className={classes.videoPlayer}
              src={videoUrl.replace('watch?v=', 'embed/')}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Typography variant="body1" color="textSecondary">No video available</Typography>
          )}
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Card key={_id} className={classes.recommendedCard} onClick={() => openPost(_id)}>
                <CardContent>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">{name}</Typography>
                  <Typography variant="body2" noWrap>{message}</Typography>
                  <Typography variant="caption" color="textSecondary">Likes: {likes.length}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;