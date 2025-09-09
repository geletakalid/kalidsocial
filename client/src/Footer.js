import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
 
  footer: {
    backgroundColor: '#FAF3E7',
    padding: theme.spacing(6),
    marginTop:'20px'
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        refreshingmoments.org
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
    const classes=useStyles()
  return (
  <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Refreshing Moments
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
Fueling your mornings with positivity and inspiration      
  </Typography>
        <Copyright />
      </footer>
  )
}

export default Footer