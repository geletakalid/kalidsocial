import { colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",  // centers horizontally
    alignItems: "center",
    padding: theme.spacing(1),
    margin: `${theme.spacing(2)}px auto`, // centers the Paper itself
    maxWidth: 300,  // keep it small (adjust as needed)
    borderRadius: 8,
    
  }
}));