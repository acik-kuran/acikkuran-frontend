import {
  Col,
  Container,
  Hidden,
  Row,
  ScreenClass,
  Visible,
} from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

const SC = styled.div`
  position: relative;
  min-height: calc(100dvh - 3.5em);
  .topbar__select-page {
    width: 140px;
  }
  .topbar__select-juz {
    width: 140px;
  }
`;

const PageDetail = styled.section`
  ${({ theme }) => css`
    padding: 20px 12px;
    margin: 0 auto;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 0;
      ${Container} {
        ${Row} {
          margin: 0;
          ${Col} {
            padding: 0;
          }
        }
      }
    }
  `}
`;

const PageOriginal = styled.div`
  ${({ theme }) => css`
    direction: rtl;
    font-size: 1.75em;
    line-height: 1.95em;

    font-family: var(--font-mushaf) !important;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      font-size: 28px;
      line-height: 1.75em;
    }
  `}
`;

const PageOriginalContainer = styled.div`
  padding: 0 8px;
`;

const PageOriginalVerse = styled.span`
  ${(props) => css`
    white-space: pre-wrap;
    padding-left: 12px;
    cursor: pointer;

    em {
      font-family: var(--font-inter) !important;
      display: inline-flex;
      margin-right: 8px;
      font-size: 16px;
      font-weight: bold;
      border: 1px solid #888;
      opacity: 0.8;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      align-items: center;
      justify-content: center;
      line-height: 0;
      @media only screen and (max-width: ${props.theme.sizes.sm}) {
        font-size: 14px;
        width: 28px;
        height: 28px;
      }
    }
    ${props.active &&
    css`
      background-color: ${props.theme.helperBackground};
    `}
  `}
`;

const PageOriginalSurah = styled.div`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid ${props.theme.secondaryColor};
    border-top: 1px solid ${props.theme.secondaryColor};
    margin: 16px 0;
    height: 140px;
    h3 {
      font-weight: bold;
    }
    ${props.first &&
    css`
      margin-top: -8px !important;
      border-top: 0 !important;
    `}
    ${!props.zeroExist &&
    css`
      height: 80px !important;
    `}
  `}
`;

const PageTranslationSurah = styled.div`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid ${props.theme.secondaryColor};
    border-top: 1px solid ${props.theme.secondaryColor};
    margin: 16px 0;
    height: 140px;
    h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    ${props.first &&
    css`
      margin-top: -8px !important;
      border-top: 0 !important;
    `}
    ${!props.zeroExist &&
    css`
      height: 80px !important;
    `}
  `}
`;

const PageTranslation = styled.div`
  font-size: 16px;
  width: 100%;
`;

const PageTranslationVerse = styled.div`
  ${(props) => css`
    position: relative;
    padding: 8px;
    display: flex;

    gap: 6px;
    :last-child {
      margin-bottom: 0;
    }
    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      padding: 8px 0;
      ${props.active &&
      css`
        background-color: unset;
      `}
      svg {
        bottom: 8px !important;
        background: ${props.theme.secondaryColor};
        border-radius: 50%;
      }
    }
    svg {
      display: none;
      position: absolute;
      bottom: 3px;
      right: 3px;
      cursor: pointer;
      width: 1.75em;
      height: 1.75em;
      padding: 4px;
      @media (hover: hover) {
        :hover {
          opacity: 0.8;
          background: ${props.theme.secondaryColor};
          border-radius: 50%;
        }
      }
    }
    :hover {
      svg {
        display: inline-block;
      }
    }
    ${props.active &&
    css`
      background-color: ${props.theme.thirdColor};
    `}
  `}
`;

const PageHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    border-bottom: 1px solid ${theme.secondaryColor};
    margin-bottom: 8px;
    font-size: 16px;
    padding: 8px;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 3.5em;
    background: ${theme.bodyBackground};
    z-index: 2;
    line-height: 1.75em;
    span {
      cursor: pointer;
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      top: 3em;
      padding: 8px 0;
      span {
        font-size: 14px;
        display: block;
        font-family: var(--font-inter) !important;
        letter-spacing: 0 !important;
        cursor: pointer;
      }
    }
  `}
`;

const PageSurahNames = styled.div`
  ${({ theme }) => css`
    @media only screen and (max-width: ${theme.sizes.sm}) {
      overflow: hidden;
      white-space: nowrap;
      width: max(calc(50dvw), 210px);
      text-align: right;
    }
  `}
`;
const PageNumber = styled.div`
  font-family: var(--font-inter) !important;
`;

const PageEdgeJuz = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 4em;
    height: 4em;
    opacity: 1;
    color: ${theme.bodyBackground};
    background-color: ${theme.primaryDark};
    border: 1px solid ${theme.primaryDark};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    font-weight: bold;
  `}
`;

const PageEdge = styled.div`
  ${(props) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    border-right: ${props.left
      ? `1px solid ${props.theme.secondaryColor}`
      : "0"};
    border-left: ${props.right
      ? `1px solid ${props.theme.secondaryColor}`
      : "0"};
    button {
      cursor: pointer;
    }
    svg {
      color: ${props.theme.primaryDark};
      opacity: 0.5;
      font-size: 36px;
    }
    :hover {
      svg {
        opacity: 1;
      }
    }
  `}
`;

export {
  Container,
  Row,
  Col,
  Visible,
  Hidden,
  ScreenClass,
  SC,
  PageDetail,
  PageOriginal,
  PageOriginalContainer,
  PageOriginalVerse,
  PageTranslation,
  PageTranslationVerse,
  PageOriginalSurah,
  PageTranslationSurah,
  PageHeader,
  PageNumber,
  PageSurahNames,
  PageEdge,
  PageEdgeJuz,
};
