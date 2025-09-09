import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MyCarousel from './Carsoul.js';
import PrimarySearchAppBar from './altnav.js';
import Posts from './components/Posts/Posts.jsx';
import { Paper } from '@material-ui/core';
import Pagination from '../src/components/Pagination.jsx';
import { useHistory,useLocation } from 'react-router-dom';
import { getPostsBySearch } from './actions/posts.js';
import { useDispatch } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center', // centers horizontally
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: `${theme.spacing(2)}px auto`, // centers the Paper itself
    maxWidth: 300, // keep it small (adjust as needed)
    borderRadius: 8,
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Homepage({currentId,setCurrentId}) {
  const query = useQuery();
  const page = query.get('page') || 1;
  const classes = useStyles();
  

  return (
    <React.Fragment>
      <CssBaseline />
      <PrimarySearchAppBar setCurrentId={setCurrentId} currentId={currentId}/>
      <main>
        <MyCarousel />
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
            >
              Refreshing Moments
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.8rem' }}
            >
              “This is the day that the Lord has made; let us rejoice and be glad
              in it.”
              <br />— Psalm 118:24
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="textPrimary"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.4rem',
                marginTop: '20px',
              }}
            >
              Start your mornings with uplifting words of Jesus. Daily
              encouragement to strengthen your faith and fill your day with joy
              ✨
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
