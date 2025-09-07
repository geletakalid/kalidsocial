import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  videoSection: {
    flex: 1,
    margin: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPlayer: {
    width: "100%",
    height: "420px",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      height: "220px",
    },
  },
  recommendedPosts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  recommendedCard: {
    cursor: "pointer",
    borderRadius: "15px",
    padding: "10px",
    boxShadow: theme.shadows[3],
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[6],
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  commentsInnerContainer: {
    maxHeight: "200px",
    overflowY: "auto",
    marginRight: "10px",
    padding: "5px",
    background: "#f9f9f9",
    borderRadius: "10px",
  },
}));