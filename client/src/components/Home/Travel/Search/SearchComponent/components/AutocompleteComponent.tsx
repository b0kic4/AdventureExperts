import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import useStyles from "../Styles";
interface AutocompleteComponentProps {
  options: any[]; // Change the type based on your data
  loading: boolean;
  value: string | null;
  onChange: (value: string) => void;
  onInputChange: (value: string) => void;
  getOptionLabel: (option: any) => string;
  renderOption: (option: any) => React.ReactNode;
  label: string;
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({
  options,
  loading,
  value,
  onChange,
  onInputChange,
  getOptionLabel,
  renderOption,
  label,
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      autoComplete
      autoHighlight
      freeSolo
      disableClearable
      blurOnSelect
      clearOnBlur
      options={options}
      loading={loading}
      onChange={(_, newValue) => onChange(newValue)}
      onInputChange={(_, newInputValue) => onInputChange(newInputValue)}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={(props) => (
        <TextField
          {...props}
          placeholder="Search"
          label={label}
          variant="outlined"
          className={classes.textInput}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
