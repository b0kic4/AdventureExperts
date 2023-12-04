// DateInputComponent.tsx

import React from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "./Styles";
import { format } from "date-fns"; // Import the format function from date-fns

interface DateInputComponentProps {
  value: Date | null;
  onChange: (date: Date | null) => void; // Keep the original expected type
  label: string;
}

const DateInputComponent: React.FC<DateInputComponentProps> = ({
  value,
  onChange,
  label,
}) => {
  const classes = useStyles();
  return (
    <TextField
      type="date"
      label={label}
      variant="outlined"
      value={value ? format(value, "yyyy-MM-dd") : ""}
      onChange={(e) => {
        const inputValue = e.target.value;
        const parsedDate = new Date(inputValue);
        onChange(parsedDate);
      }}
      inputProps={{ min: 1 }}
      InputLabelProps={{
        shrink: true,
      }}
      className={`${classes.datePicker} ${classes.adultsInput}`}
    />
  );
};

export default DateInputComponent;
