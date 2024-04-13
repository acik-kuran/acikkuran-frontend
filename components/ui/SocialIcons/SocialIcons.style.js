import styled, { css } from "styled-components";

const SC = styled.div`
  ${(props) => css`
    display: flex;
    align-items: center;
    .social-icons__item {
      cursor: pointer;
      margin-left: 0.75em;
      display: flex;
      :first-child {
        margin-left: 0;
      }
      svg {
        color: ${props.theme.primaryTextColor};
        opacity: 0.5;
        font-size: 1.75em;
        ${(props) =>
          props.isFooter &&
          css`
            font-size: 1.15em;
          `}
        @media only screen and (max-width: ${props.theme.sizes.sm}) {
          ${props.isFooter &&
          css`
            color: ${props.theme.streakAreaColor};
            font-size: 1.15em;
          `}

          opacity: 0.75;
          font-size: 1.15em;
        }
      }

      :hover {
        svg {
          opacity: 1;
        }
      }
    }
  `}
`;

export { SC };
