import React,{useState,useEffect} from 'react'
import { AppBar, Toolbar, Typography,Avatar,Button } from '@material-ui/core';
import useStyles from './styles';
import {Link,useHistory,useLocation} from 'react-router-dom';
import memories from '../../images/memories.png';
import {useDispatch} from 'react-redux'
import  jwtDecode  from 'jwt-decode';
const Navbar=()=>{
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    console.log(user)
    useEffect(()=>{

      const token = user?.token;
      if(token){
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    const logout=()=>{
      dispatch({ type: 'LOGOUT' });
      setUser(null);
      history.push('/');
      

    }

    return(
          <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>
                     

            <Typography  className={classes.font} component={Link} to="/" variant="h2" align="center"> <img className={classes.image} src={memories} alt="memories" height="35" />Refreshing moments </Typography>
          </div>
          <Toolbar className={classes.toolbar}>
{user?(
<div className={classes.profile}>
<Avatar className={!user?.result.picture && classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name?.charAt(0)}</Avatar>
<Typography className={classes.userName} variant="p">{user?.result?.name}</Typography>
<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
</div>

):(

<Button component={Link} to="/auth" variant="contained" color="primary" className={classes.font}>Sign In</Button>

)}
          </Toolbar>
          
        </AppBar>
    );
      


}

export default Navbar;