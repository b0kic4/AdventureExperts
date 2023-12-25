// mainSearchStyles.js
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(2),
  },
  responsiveContainer: {
    display: "flex",
    flexDirection: "column", // Default: stacked on smaller screens

    [theme.breakpoints.up("md")]: {
      flexDirection: "row", // Side by side on larger screens
      justifyContent: "space-between",
    },
  },
  hotelSearchContainer: {
    padding: theme.spacing(2),
    backgroundColor: "transparent",
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
  offersSearchContainer: {
    border: "1px solid orange",
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
