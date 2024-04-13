import styled, { css } from "styled-components";

const ButtonSC = styled.button`
  ${(props) =>
    props.type === "text"
      ? css`
          padding: 0;
          border: 0;
          background: none;
          margin: 0;
        `
      : css`
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px 24px;
          border-radius: 4px;
          background: ${props.theme.buttonBgColor};
          font-weight: bold;
          font-family: var(--font-inter);
          border: 0;
          font-size: 1em;
          cursor: pointer;
          color: ${props.theme.bodyBackground};
          text-decoration: none !important;
          svg {
            font-size: 1em;
            margin-right: 6px;
            fill: ${props.theme.bodyBackground};
          }

          ${(props) =>
            props.fullwidth &&
            css`
              width: 100%;
            `}

          ${(props) =>
            props.disabled
              ? css`
                  background: ${props.theme.buttonDisabledBgColor};
                  cursor: unset;
                `
              : css`
                  :hover {
                    opacity: 0.8;
                  }
                `}
        `}
`;

export { ButtonSC };
