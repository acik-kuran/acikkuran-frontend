import styled, { keyframes } from "styled-components";

import React from "react";
import { RiLoader5Line } from "react-icons/ri";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SC = styled.div`
  display: flex;
  padding: 1em;
  justify-content: center;
  align-items: center;
  svg {
    width: 2em;
    height: 2em;
    animation: ${rotate} 1s linear infinite;
  }
`;

const LoadingBar = () => {
  return (
    <SC>
      <RiLoader5Line />
    </SC>
  );
};

export default LoadingBar;
