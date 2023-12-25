import { useEffect, useState } from "react";
import useStyles from "./offersSearchStyles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  setBestRatesOnly,
  setBoardTypes,
  setCheckInDates,
  setCheckOutDates,
  setCurrencies,
  setLanguage,
  setPaymentPolicies,
  setPeople,
  setPricingRange,
  setRoomQuantities,
} from "../../../../app/offersSlice";
import { format } from "date-fns";

const OffersSearch = () => {
  const classes = useStyles();
  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const [checkInDate, setCheckInDate] = useState<Date | string>("");
  const [checkOutDate, setCheckOutDate] = useState<Date | string>("");
  const [roomQuantity, setRoomQuantity] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [paymentPolicy, setPaymentPolicy] = useState<string>("NONE");
  const [boardType, setBoardType] = useState<string>("ROOM_ONLY");
  const [includeClosed, setIncludeClosed] = useState<boolean>(false);
  const [bestRateOnly, setBestRateOnly] = useState<boolean>(true);
  const [lang, setLang] = useState<string>("");
  const dispatch = useDispatch();
  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Add logic to handle form submission for offers search
    console.log("Offers search submitted!");
  };
  const handleAdultsChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as number;
    setSelectedAdults(selectedValue);
  };
  const handleRoomQuantityChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = e.target.value as number;
    setRoomQuantity(selectedValue);
    dispatch(setRoomQuantities(roomQuantity));
  };
  useEffect(() => {
    console.log(selectedAdults);
    dispatch(setPeople(selectedAdults));
  }, [selectedAdults]);
  useEffect(() => {
    console.log(roomQuantity);
    dispatch(setRoomQuantities(roomQuantity));
  }, [roomQuantity]);

  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedDate = value ? format(new Date(value), "yyyy-MM-dd") : ""; // Use an empty string instead of null
    setCheckInDate(formattedDate);
    dispatch(setCheckInDates(formattedDate));
  };

  const handleCheckOutDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedDate = value ? format(new Date(value), "yyyy-MM-dd") : ""; // Use an empty string instead of null
    setCheckOutDate(formattedDate);
    dispatch(setCheckOutDates(formattedDate));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceRange(value);
    dispatch(setPricingRange(priceRange));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrency(value);
    dispatch(setCurrencies(currency));
  };

  const handlePaymentPolicyChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as string;
    setPaymentPolicy(value);
    dispatch(setPaymentPolicies(paymentPolicy));
  };

  const handleBoardTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    setBoardType(value);
    dispatch(setBoardTypes(boardType));
  };

  const handleIncludeClosedChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as boolean;
    setIncludeClosed(value);
    dispatch(setIncludeClosed(includeClosed));
  };

  const handleBestRateOnlyChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = e.target.value as boolean;
    setBestRateOnly(value);
    dispatch(setBestRatesOnly(bestRateOnly));
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLang(value);
    dispatch(setLanguage(lang));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Offers Search</h2>
      <div className={classes.selectElementsContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="adults-label">Number of Adults</InputLabel>
          <Select
            labelId="adults-label"
            id="adults"
            value={selectedAdults}
            onChange={handleAdultsChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
        <FormControl className={classes.formControl}>
          <InputLabel id="rooms-label">Number of Rooms</InputLabel>
          <Select
            labelId="rooms-label"
            id="rooms"
            value={roomQuantity}
            onChange={handleRoomQuantityChange}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.dateContainer}>
        <TextField
          label="Check-in Date"
          type="date"
          value={
            checkInDate instanceof Date
              ? checkInDate.toISOString().split("T")[0]
              : checkInDate
          }
          onChange={handleCheckInDateChange}
          className={`${classes.formInput}`}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: {} }}
        />

        <TextField
          label="Check-out Date"
          type="date"
          value={
            checkOutDate instanceof Date
              ? checkOutDate.toISOString().split("T")[0]
              : checkOutDate
          }
          onChange={handleCheckOutDateChange}
          className={`${classes.formInput}`}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: {} }}
        />
      </div>
      <div className={classes.pricingContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="price-range-label"></InputLabel>
          <TextField
            type="text"
            label="Pricing Range"
            id="price-range"
            value={priceRange}
            onChange={handlePriceRangeChange}
            className={`${classes.formInput}`}
            InputProps={{ inputProps: {} }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="currency-label"></InputLabel>
          <TextField
            type="text"
            label="Currency - ISO code (EUR)"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className={`${classes.formInput}`}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="payment-policy-label">Payment Policy</InputLabel>
          <Select
            labelId="payment-policy-label"
            id="payment-policy"
            value={paymentPolicy}
            onChange={handlePaymentPolicyChange}
          >
            <MenuItem value="NONE">None</MenuItem>
            <MenuItem value="GUARANTEE">Guarantee</MenuItem>
            <MenuItem value="DEPOSIT">Deposit</MenuItem>
          </Select>
        </FormControl>
      </div>

      <FormControl className={classes.formControl}>
        <InputLabel id="board-type-label">Board Type</InputLabel>
        <Select
          labelId="board-type-label"
          id="board-type"
          value={boardType}
          onChange={handleBoardTypeChange}
        >
          <MenuItem value="ROOM_ONLY">Room Only</MenuItem>
          <MenuItem value="BREAKFAST">Breakfast</MenuItem>
          <MenuItem value="HALF_BOARD">Half Board</MenuItem>
          <MenuItem value="FULL_BOARD">Full Board</MenuItem>
          <MenuItem value="ALL_INCLUSIVE">All Inclusive</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="include-closed-label">Include Closed</InputLabel>
        <Select
          labelId="include-closed-label"
          id="include-closed"
          value={includeClosed}
          onChange={handleIncludeClosedChange}
        >
          <MenuItem value={"true"}>Yes</MenuItem>
          <MenuItem value={"false"}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="best-rate-only-label">Best Rate Only</InputLabel>
        <Select
          labelId="best-rate-only-label"
          id="best-rate-only"
          value={bestRateOnly}
          onChange={handleBestRateOnlyChange}
        >
          <MenuItem value={"true"}>Yes</MenuItem>
          <MenuItem value={"false"}>No</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="lang-label"></InputLabel>
        <TextField
          type="text"
          label="Language"
          id="lang"
          value={lang}
          onChange={handleLangChange}
          className={`${classes.formInput}`}
        />
      </FormControl>

      {/* Add more input fields for other form elements */}

      {/* <Button
        type="submit"
        className={`${classes.formButton} ${classes.buttonTextStyle}`}
      >
        Search Offers
      </Button> */}
    </form>
  );
};

export default OffersSearch;
