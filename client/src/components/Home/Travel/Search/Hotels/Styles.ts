import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "35px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    flexWrap: "wrap",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: "60%",
    },
  },

  formControl: {
    minWidth: 120,
    width: "70%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing(0.5),
  },

  formLabel: {
    color: "black",
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  formInput: {
    marginBottom: "20px",
    width: "100%", // Updated for better responsiveness
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#50C878",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%", // Adjusted width for larger screens
    },
  },
  buttonTextStyle: {
    fontWeight: "bold",
  },
  formSelect: {
    width: "100%", // Updated for better responsiveness
    marginBottom: "20px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#50C878",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%", // Adjusted width for larger screens
    },
  },
  formTextInput: {
    width: "100%", // Updated for better responsiveness
    marginBottom: "20px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    border: "1px solid #ccc",
    color: "black",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#50C878",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%", // Adjusted width for larger screens
    },
  },

  formCheckboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  formCheckboxLabel: {
    fontSize: "14px",
    marginLeft: "10px",
  },
  formButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease",

    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
}));

export default useStyles;
