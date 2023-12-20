import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../Styles";
interface NumberInputComponentProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  max: number;
}

const NumberInputComponent: React.FC<NumberInputComponentProps> = ({
  value,
  onChange,
  label,
  max,
}) => {
  const classes = useStyles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      onChange(Number(input));
      localStorage.setItem("adults", input);
    }
  };

  return (
    <TextField
      type="text"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      inputProps={{ min: 1, max }}
      className={`${classes.numberInput} ${classes.adultsInput}`}
    />
  );
};

export default NumberInputComponent;
