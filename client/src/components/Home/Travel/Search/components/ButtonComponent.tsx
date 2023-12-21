import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "../Styles";
interface ButtonComponentProps {
  onClick: (ev: any) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Show Flights
    </Button>
  );
};

export default ButtonComponent;
