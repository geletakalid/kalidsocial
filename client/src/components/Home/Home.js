import React ,{useState,useEffect} from 'react';

import { Container,Grid,Grow,Paper} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts';
import Pagination from '../Pagination';
const Home = () => {
     const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
useEffect(() => {
    dispatch(getPosts());
  }, [dispatch,currentId]);
  return (

 <Grow in>
          <Container>
            
          
                <Grid className={classes.mainContainer} container spacing={3} justify="space-between" alignItems="stretch">
                  <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper elevation={6} >
                      <Pagination />
                    </Paper>
                  </Grid>
                </Grid>
           
          </Container>
        </Grow>
  )
}

export default Home;