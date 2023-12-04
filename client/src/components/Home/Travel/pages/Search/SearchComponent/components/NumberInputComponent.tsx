import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "./Styles";
interface NumberInputComponentProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

const NumberInputComponent: React.FC<NumberInputComponentProps> = ({
  value,
  onChange,
  label,
}) => {
  const classes = useStyles();
  return (
    <TextField
      type="text"
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input)) {
          onChange(Number(input));
        }
      }}
      inputProps={{ min: 1 }}
      className={`${classes.numberInput} ${classes.adultsInput}`}
    />
  );
};

export default NumberInputComponent;
