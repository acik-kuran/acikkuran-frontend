import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

import { Content } from "./global.style";

const SC = styled.div`
  height: calc(100dvh);
  .topbar__select-surah {
    width: 170px;
  }
`;
const ErrorDetail = styled.section`
  ${(props) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props.indexPage
      ? "transparent"
      : `${props.theme.bodyBackground}`};
    z-index: 998;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${Row} {
      justify-content: center;
      ${Col} {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        text-align: center;
      }
    }

    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      padding: 0;
      ${Container} {
        padding: 0;
        ${Row} {
          margin: 0;
          ${Col} {
            padding: 0 20px;
            font-size: 0.8em;
          }
        }
      }
    }
  `}
`;

const ErrorNumber = styled.div`
  ${({ theme }) => css`
    font-size: 7em;
    color: ${theme.primaryTextColor};

    opacity: 0.3;
    font-weight: 600;
  `}
`;

const ErrorText = styled.div`
  ${({ theme }) => css`
    color: ${theme.primaryTextColor};
    opacity: 0.3;
    font-size: 1.25em;
  `}
`;

export {
  Container,
  Row,
  Col,
  Content,
  SC,
  ErrorDetail,
  ErrorNumber,
  ErrorText,
};
