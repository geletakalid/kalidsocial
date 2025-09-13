import React from "react";
import Post from "./Post/Post";
import useStyles from './styles';
import {Grid ,CircularProgress,Container} from '@material-ui/core';
import { useSelector } from "react-redux";



const Posts=({setCurrentId})=>{    
    const {posts,isLoading} = useSelector((state) => state.posts);
    
  const  classes = useStyles();
//if(!posts.length && isLoading) return 'No posts';

    return (
       isLoading ? <CircularProgress style={{ color: "#10716B" }} /> : (
        <Container className={classes.cardGrid} maxWidth="md">
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
               {posts.map((post) => (
                   <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                       <Post post={post} setCurrentId={setCurrentId} />
                   </Grid>
               ))}
           </Grid>
           </Container>
       )

    )
        
}

export default Posts;