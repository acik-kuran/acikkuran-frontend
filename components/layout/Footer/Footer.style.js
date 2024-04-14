import { Container } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

const SC = styled.footer`
  ${(props) => css`
    max-width: 70em;
    width: 100%;
    margin: 0 auto;
    ${props.mp3 &&
    css`
      display: none;
    `}
    ${!props.home &&
    css`
      padding: 0 24px;
    `}
  @media only screen and (max-width: ${props.theme.sizes.sm}) {
      position: absolute;
      bottom: 0px;
      padding: 0 20px;
      z-index: 99999;
    }
  `}
`;

const FooterWrapper = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.secondaryColor};
    padding: 24px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      border: none;
    }
  `}
`;

const CopyLeft = styled.div`
  ${({ theme }) => css`
    font-weight: normal;
    color: ${theme.primaryTextColor};
    opacity: 0.7;
    display: flex;
    align-items: center;
    img {
      margin: 0 6px;
    }
    a {
      display: flex;
      align-items: center;
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      span {
        display: none;
      }
      a {
        color: ${theme.streakAreaColor};
      }
      img {
        margin: 0 6px 0 0;
      }

      opacity: 1;
      color: ${theme.streakAreaColor};
    }
  `}
`;

export { SC, CopyLeft, Container, FooterWrapper };
