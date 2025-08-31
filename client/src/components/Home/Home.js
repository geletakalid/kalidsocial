import React ,{useState,useEffect} from 'react';

import { Container,Grid,Grow,Paper,AppBar,TextField,Button} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import {getPosts} from '../../actions/posts';
import Pagination from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const history = useHistory();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const page=query.get('page')||1;
  const searchQuery=query.get('searchQuery');
  const [search ,setSearch] = useState(searchQuery);
  const [tags, setTags] = useState([]);
useEffect(() => {
    dispatch(getPosts());
  }, [dispatch,currentId]);


  const searchPost=()=>{
if(search.trim()){
  
}
else{
  history.push('/')
}
}
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      // Perform search action
  searchPost();
    }
  };


  const handleDelete=(tagToDelete)=>{
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

const handleAdd=(tag)=>setTags([...tags, tag]);

  return (

 <Grow in>
          <Container maxWidth="xl">
            
          
                <Grid className={classes.gridContainer} container spacing={3} justify="space-between" alignItems="stretch">
                  <Grid item xs={12} sm={12} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={6 } md={3}>
                  <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField name="search" variant="outlined" label="Search Posts" value={search} onKeyPress={handleKeypress} onChange={(e)=>{setSearch(e.target.value)}} fullWidth />
                    
                    <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined"  />
                   <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" >Search</Button>
                    </AppBar>

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