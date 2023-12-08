import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  // MODAL
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: "10px",
  },
  cityName: {
    color: "black",
    fontWeight: "bold",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  buttonContainer: {
    marginTop: "150px",
    display: "flex",
    justifyContent: "flex-start",
    gap: "2",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    overflow: "none",
    marginBottom: "150px",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#50C878",
    color: "white",
    fontWeight: "bold",
    width: "50%",
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#40875E", // Change the color on hover if needed
    },
  },
  clearButton: {
    backgroundColor: "#D0342C",
    marginTop: "20px",
    color: "white",
    fontWeight: "bold",
    width: "20%",
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#D0342C", // Change the color on hover if needed
    },
  },
  scrollContainer: {
    color: "white",
    maxHeight: "60vh",
    width: "100%",
    overflowY: "auto",
  },
  flightOfferItem: {
    marginBottom: "10px",
    width: "100%", // Take up the full width of the container
    boxSizing: "border-box",
    cursor: "pointer",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      color: "black",
    },
  }, // Inside the useStyles
  flightOfferCard: {
    marginBottom: "20px",
    cursor: "pointer",
    boxSizing: "border-box",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      color: "black",
      boxShadow: "0px 0px 10px 0px #000000",
    },
  },

  adultsInput: {
    backgroundColor: "rgb(0, 0, 0, 0.5)",
    textAlign: "center",
    "& input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    width: "100%",
  },
  numberInput: {
    width: "50%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
  },
  textInput: {
    width: "100%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
  },
  datePickerContainer: {
    marginTop: "20px",
  },
  datePicker: {
    width: "50%",
    height: "50%",
    "& .MuiAutocomplete-inputRoot": {
      color: "white",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50C878 !important",
    },
  },
}));

export default useStyles;
