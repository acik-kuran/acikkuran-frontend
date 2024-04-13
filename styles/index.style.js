import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { createGlobalStyle, css } from "styled-components";

import { Tab, TabList, TabPanel, TabText, Tabs } from "./tabs.style";

const GlobalStyle = createGlobalStyle`
  #nprogress {
    .bar, .peg {
      display: none;
    }
  }
`;

const SC = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      flex-direction: column;
      padding: 0;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: fixed;
    }
    width: 100%;
    padding: 24px 24px 0;
  `}
`;

const SearchColumn = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 760px;
    margin: -126px auto 0 auto;
    display: flex;
    height: calc(100dvh - 274px);
    min-height: 485px;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    z-index: 999;

    @media only screen and (max-width: ${theme.sizes.sm}) {
      /* position: absolute; */
      padding: 20px;
      align-items: center;
      justify-content: center;
      z-index: unset;
      background: transparent;
      min-height: unset;
      margin: 0 auto;
      height: unset;
      footer {
        div {
          color: ${theme.bodyBackground};
        }
        .social-icons__item {
          svg {
            color: ${theme.bodyBackground};
            opacity: 1;
          }
        }
      }
    }
  `}
`;

const ImageColumn = styled.div`
  ${(props) => css`
    position: relative;
    width: 100%;
    max-width: 70em;
    margin: 0 auto;
    height: 300px;
    border-radius: 8px;
    transition: all 0.5s linear;
    box-shadow: 0 26px 24px -5px rgb(0 0 0 / 20%) !important;

    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.23),
        rgba(255, 255, 255, 0) 40%,
        rgba(255, 255, 255, 0)
      ),
      url(${props.bg});
    background-size: cover;
    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      position: absolute;
      height: 100%;
      bottom: 0;
      top: 0;
      border-radius: 0;
      background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.73),
          rgba(255, 255, 255, 0) 20%,
          rgba(255, 255, 255, 0) 70%,
          rgba(0, 0, 0, 1)
        ),
        url(${props.mobileBg});
      z-index: 1;
      max-width: unset;
    }
  `}
`;

const AuthArea = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 40px;
    right: 40px;
    display: flex;
    align-items: center;
    @media only screen and (max-width: ${theme.sizes.md}) {
      top: 32px;
      right: 24px;
    }
    .auth__link {
      cursor: pointer;
      color: white;
      font-weight: 600;
      line-height: 0;
      :hover {
        text-decoration: underline;
      }
      svg {
        width: 18px;
        height: 18px;
      }
    }
    .auth__divider {
      width: 1px;
      border-right: 1px dashed #e4e4e4;
      height: 14px;
      margin: 0 8px;
    }
  `}
`;

const Logo = styled.div`
  ${(props) => css`
    display: flex;
    align-items: center;
    a {
      line-height: 0;
      &:hover {
        svg {
          opacity: 1 !important;
        }
      }
    }
    svg {
      margin-top: 4px;
      height: ${props.height};
      path {
        fill: white;
      }
    }
    position: absolute;
    top: 38px; // optical
    left: 40px;
    @media only screen and (max-width: ${props.theme.sizes.md}) {
      top: 32px;
      left: 24px;
    }
  `}
`;

const AuthedUser = styled.div`
  display: flex;
  align-items: center;
  button {
    color: white;
    cursor: pointer;
    font-weight: bold;
    line-height: 0;
    &:hover {
      text-decoration: underline;
    }
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export {
  GlobalStyle,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabText,
  Container,
  Row,
  Col,
  SC,
  ImageColumn,
  SearchColumn,
  Logo,
  AuthArea,
  AuthedUser,
};
