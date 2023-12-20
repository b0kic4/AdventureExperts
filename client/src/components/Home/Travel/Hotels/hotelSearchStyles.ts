import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    color: "#333",
    maxHeight: "80vh",
    width: "100%",
    overflowY: "scroll",
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    fontSize: "0.875rem",
  },
  formContainer: {
    border: "1px solid orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%", // Set width to 100%
    maxWidth: "85%",
    height: "50%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#F4F4F4",
    borderRadius: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#333",
    transition: "background-color 0.3s ease",

    scrollbarWidth: "thin", // for Firefox
    scrollbarColor: "auto", // for Firefox
    "&::-webkit-scrollbar": {
      width: "12px", // for Chrome/Safari/Edge
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888", // color of the thumb
    },
    flexWrap: "wrap",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      maxHeight: "70%", // Increase max height for smaller screens
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "55%",
      maxHeight: "70%", // Increase max height for larger screens
    },
  },

  savedFiltersContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: "18px",
    fontWeight: "bold",
  },
  formInput: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    width: "100%",
    marginBottom: "20px",
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
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    width: "100%",
    marginBottom: "20px",
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
