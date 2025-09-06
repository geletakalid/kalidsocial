import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

  overlayRight: {
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
  cursor: "pointer",
},
 card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
     position: 'relative',
  },
   cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
 overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 
    'white',
  },

  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
  display: "block",
  textAlign: "initial",
},
  
});