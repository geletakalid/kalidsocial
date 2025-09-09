import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { getPostsBySearch } from './actions/posts';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import MoreIcon from '@material-ui/icons/MoreVert';
import Brandlogo from './images/Brandlogo.jpg';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  AppBar: {
    backgroundColor: '#FAF3E7',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Lora', serif",
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#10716B',
    fontSize: '1rem',
    textAlign: 'center',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8rem',
    },
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: '2px solid #2196f3',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      width: 40,
      height: 40,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff', // search box white
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    border: '1px solid #ddd', // subtle border
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#10716B', // search icon green
  },
  inputRoot: {
    color: 'gray', // typing text gray
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PrimarySearchAppBar({ setCurrentId, currentId }) {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();

  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState(searchQuery);
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search?.trim()) {
      dispatch(getPostsBySearch({ search: search }));
      history.push(`/posts?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      searchPost();
    }
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    history.push('/');
  };

  const createpost = () => {
    setCurrentId(null);
    history.push('/create-post');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user && (
        <>
          <MenuItem onClick={handleMenuClose}>{user?.result?.name}</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <div>
          <MenuItem>
            <IconButton color="inherit">
              <Avatar
                className={!user?.result.picture && classes.purple}
                alt={user?.result?.name}
                src={user?.result?.picture}
              >
                {user?.result?.name?.charAt(0)}
              </Avatar>
            </IconButton>
            <p>{user?.result?.name}</p>
          </MenuItem>

          <MenuItem onClick={createpost}>
            <IconButton color="inherit">
              <AddCircleOutlineIcon />
            </IconButton>
            <p>Create Post </p>
          </MenuItem>

          <MenuItem onClick={logout}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem component={Link} to="/auth">
          <IconButton color="inherit" component={Link} to="/auth">
            <MeetingRoomIcon />
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          {/* Brand with Circular Image + Title wrapped in Link */}
          <Link 
            to="/" 
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img
              src={Brandlogo}
              alt="Brand Logo"
              className={classes.logo}
            />
            <Typography className={classes.title} noWrap>
              <span>Refreshing</span>
              <span>Moments</span>
            </Typography>
          </Link>

          {/* Search */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              name="search"
              placeholder="Search Posts"
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user ? (
              <>
                <Button
                  onClick={createpost}
                  startIcon={<AddCircleOutlineIcon />}
                  style={{ color: '#10716B' }}
                >
                  Create Post
                </Button>

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    className={!user?.result.picture && classes.purple}
                    alt={user?.result?.name}
                    src={user?.result?.picture}
                  >
                    {user?.result?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <IconButton component={Link} to="/auth">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ backgroundColor: 'white' }}
                >
                  Sign In
                </Button>
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
             <MoreIcon style={{ color: '#10716B' }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}