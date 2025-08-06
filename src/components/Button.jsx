import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({
  text,
  onClick,
  color = "primary",
  variant = "contained",
  sx,
}) => {
  return (
    <MuiButton onClick={onClick} color={color} variant={variant} sx={{ ...sx }}>
      {text}
    </MuiButton>
  );
};

export default Button;
