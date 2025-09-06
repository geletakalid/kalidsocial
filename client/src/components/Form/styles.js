import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: "0 auto",
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  uploadBox: {
    margin: theme.spacing(2, 0),
    textAlign: "center",
    width: "100%",
  },
  uploadLabel: {
    display: "block",
    border: "2px dashed #ccc",
    borderRadius: 8,
    padding: theme.spacing(3),
    cursor: "pointer",
    position: "relative",
    "& input": {
      display: "none",
    },
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  uploadPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#777",
  },
  preview: {
    maxWidth: "100%",
    maxHeight: 200,
    borderRadius: 8,
    objectFit: "cover",
  },
  progress: {
    marginTop: theme.spacing(1),
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));