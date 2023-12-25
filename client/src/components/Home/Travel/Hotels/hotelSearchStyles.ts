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
  hotelSearchContainer: {
    border: "1px solid black",
    padding: theme.spacing(2),
    backgroundColor: "#F4F4F4",
    borderRadius: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#333",
    flexGrow: 1, // Takes remaining width in the flex container
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Full width on smaller screens
    },
    [theme.breakpoints.up("md")]: {
      width: "48%", // Adjusted width for larger screens
    },
  },
  radiusSearch: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFF", // Set a background color
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  radiusInputLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main, // Set a color
  },

  radiusInputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },

  radiusInput: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    width: "70%",
    marginRight: theme.spacing(1),
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main, // Highlight with your primary color
    },
  },

  radiusUnitSelect: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    width: "30%",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main, // Highlight with your primary color
    },
  },
  filtersContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  aditionalProperties: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFF", // Set a background color
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  formContainer: {
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#333",
    transition: "background-color 0.3s ease",
    scrollbarWidth: "thin",
    scrollbarColor: "auto",
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
    },
    flexWrap: "wrap",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxHeight: "70%", // Increase max height for smaller screens
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "100%",
      maxHeight: "70%", // Increase max height for medium screens
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "80%", // Adjusted width for larger screens
      maxHeight: "70%", // Increase max height for larger screens
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "50%", // Adjusted width for larger screens
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
    color: theme.palette.primary.main, // Set a color
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
    border: `1px solid ${theme.palette.primary.main}`, // Highlight with your primary color
    borderRadius: "4px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
    width: "100%",
    marginBottom: "20px",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main, // Highlight with your primary color
    },
  },
  formTextInput: {
    width: "100%", // Keep it 100% for other inputs
    marginBottom: "20px",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    textAlign: "center",
    border: `1px solid ${theme.palette.primary.main}`, // Highlight with your primary color
    color: theme.palette.primary.main, // Set a color
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main, // Highlight with your primary color
    },
  },
  smallWidthTextInput: {
    width: "50%", // Adjust the width as needed
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
  offersSearchContainer: {
    border: "1px solid black",
    padding: theme.spacing(2),
    backgroundColor: "#F4F4F4",
    borderRadius: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#333",
    flexGrow: 1, // Takes remaining width in the flex container
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Full width on smaller screens
    },
    [theme.breakpoints.up("md")]: {
      width: "48%", // Adjusted width for larger screens
    },
  },
}));

export default useStyles;
