import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  cityName: {
    color: "black",
    fontWeight: "bold",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    maxHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    background: "rgba(0, 0, 0, 0.30)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: "0",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    overflow: "none",
  },
  // BUTTONS
  flightButton: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#3498db",
    opacity: 1,
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 0.8,
      backgroundColor: "#2980b9",
    },
  },

  hotelButton: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#2ecc71",
    opacity: 1,
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 0.8,
      backgroundColor: "#27ae60",
    },
  },

  inactiveButton: {
    fontWeight: "bold",
    opacity: 0.7,
    backgroundColor: "#ffffff", // Change the background color
    transition: "opacity 0.3s ease", // Optional: Add transition for smooth effect
    "&:hover": {
      opacity: 0.8,
      backgroundColor: "#ffffff", // Change background color on hover
      transition: "opacity 0.3s ease",
    },
  },

  flightOfferItem: {
    marginBottom: "10px",
    width: "100%",
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
    width: "70%",
  },
  numberInput: {
    width: "50%",
    height: "50%",
    margin: "10px 0",
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
    width: "70%",
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
    margin: "20px 0",
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
});

export default useStyles;
