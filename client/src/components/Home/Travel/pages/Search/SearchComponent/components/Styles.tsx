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
    maxHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  parentContainer: {
    width: "100%",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    gap: "2",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    margin: "10px auto", // Add margin to center the input horizontally
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
});

export default useStyles;
