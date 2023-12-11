import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    border: "1px solid orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    maxWidth: "50%",
    width: "100%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },

  formControl: {
    minWidth: 120,
    width: "100%",
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
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    "&:focus": {
      outline: "none",
      borderColor: "#50C878",
    },
  },
  formSelect: {
    width: "100%",
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
  },
  formTextInput: {
    width: "100%",
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
  clearButton: {
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "25%",
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
