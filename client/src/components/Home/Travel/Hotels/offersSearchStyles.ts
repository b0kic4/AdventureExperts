import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "85%",
    marginBottom: theme.spacing(2),
  },
  buttonTextStyle: {
    fontWeight: "bold",
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
  formInput: {
    marginBottom: theme.spacing(2),
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  checkboxLabel: {
    marginLeft: theme.spacing(1),
  },
  dateContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFF",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  pricingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFF",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  selectElementsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFF",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  inputLabel: {
    fontSize: "14px",
  },
}));

export default useStyles;
