import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cityName: {
    color: "black",
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    overflow: "none",
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
    color: "white",
    fontWeight: "bold",
    width: "100%",
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#D0342C", // Change the color on hover if needed
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
