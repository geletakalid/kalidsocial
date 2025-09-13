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
    height: "500px",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
  },
  image: {
    width: "100%",
    height: "500px",
    objectFit: "cover",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
  },
  messageBox: {
    maxHeight: "100px",
    overflowY: "auto", // ✅ allow scroll
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    position: "relative",
   

    // Hide scrollbar but keep scrolling
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",

     [theme.breakpoints.down("sm")]: {
      maxheight: "400px",
    },
  },
  scrollControls: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginBottom: "15px", // space after buttons
  },
  scrollButton: {
    background: "#10716B",
    color: "#fff",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "0.8rem",
    textTransform: "none",
    "&:hover": {
      background: "#1565c0",
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
    boxShadow: theme.shadows[3],
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[6],
    },
  },
  recommendedImage: {
    height: 150,
    width: "100%",
    objectFit: "cover",
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
    maxHeight: "100px",
    overflowY: "auto",
    marginRight: "10px",
    padding: "5px",
    background: "#f7f5f5ff",
    borderRadius: "10px",
  },
}));