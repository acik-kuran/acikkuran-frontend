import { ButtonSC } from "./Button.style";
import React from "react";

const Button = (props) => {
  const { children, onClick, disabled } = props;
  return (
    <ButtonSC onClick={onClick} disabled={disabled} {...props}>
      {children}
    </ButtonSC>
  );
};

export default Button;
