import React from "react";
import Select from "react-select";
import { useTheme } from "styled-components";
import useMobileDetect from "use-mobile-detect-hook";

import { selectStyles } from "@utils/funcs";

const Selectbox = (props) => {
  const { placeholder, isDisabled } = props;
  const detectMobile = useMobileDetect();
  const theme = useTheme();

  return detectMobile.isMobile() ? (
    <div className="select">
      <select
        disabled={isDisabled}
        value={props.value ? props.value.value : 0}
        onChange={props.onChangeNative}
      >
        <option value="0">{placeholder}</option>
        {props.options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <Select {...props} styles={selectStyles(theme)} />
  );
};

export default Selectbox;
