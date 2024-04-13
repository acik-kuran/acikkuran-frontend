import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

import { Tab, TabList, TabPanel, TabText, Tabs } from "./tabs.style";

const VerseTranslation = styled.li``;
const VerseHeroTranslation = styled.div``;
const VerseHeroAuthor = styled.div``;
const VerseArabic = styled.div``;
const VerseTranscription = styled.div``;
const VerseTranslations = styled.ul``;
const VerseText = styled.p``;

const VerseAuthor = styled.h6`
  ${({ theme }) => css`
    .verse-author__external-link {
      margin-left: 4px;
      svg {
        width: unset; //!important;
        height: unset; //!important;
        padding: unset; //!important;
        opacity: 0.5;
        &:hover {
          background: unset; //!important;
          border-radius: unset; //!important;
          opacity: 1;
        }

        @media only screen and (max-width: ${theme.sizes.sm}) {
          margin-left: 0;
        }
      }
    }
  `}
`;

const AmpArabicText = styled.div`
  @font-face {
    font-family: "MushafFont";
    src: url("/static/ShaikhHamdullahMushaf.ttf") format("truetype");
  }
  .arabic-text {
    font-family: "MushafFont";
    font-size: 2em;
    line-height: 1.42em;
    margin-top: 10px;
  }
`;

const SC = styled.div`
  position: relative;
  min-height: calc(100dvh - 3.5em);
  .topbar__select-surah {
    width: 170px;
  }
  .topbar__select-verse {
    width: 100px;
  }
`;

const VerseMain = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-width: 70em;
    margin: 0 auto;
    color: ${theme.enSiyah};
    padding: 1.5em 0;

    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 1em 0;
    }

    ${VerseHeroAuthor} {
      display: flex;
      align-items: center;
      font-style: italic;
      justify-content: space-between;
      color: ${theme.verseMainAuthorTetColor};
      .verse-author__actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        &-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          @media only screen and (max-width: ${theme.sizes.sm}) {
            margin-left: 0px;
          }
        }
      }

      button {
        cursor: pointer;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        :hover {
          background: ${theme.secondaryBeyaz};
        }

        svg {
          width: 18px;
          height: 18px;
          color: ${theme.ortancaSiyah};
        }
      }

      @media only screen and (max-width: ${theme.sizes.sm}) {
        span {
          display: none;
        }
        button {
          width: 32px;
          height: 32px;
        }
      }
    }
    ${VerseHeroTranslation} {
      color: ${theme.ortancaSiyah};
      font-size: 1.15em;
      line-height: 1.6em;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        line-height: 1.5em;
      }
      font-weight: 400;
      margin-top: 10px;
    }
    ${VerseArabic} {
      font-family: var(--font-mushaf);
      margin-top: 10px;
      font-size: 2em;
      line-height: 1.5em;

      @media only screen and (max-width: ${theme.sizes.sm}) {
        font-size: 1.75em;
        line-height: 1.42em;
      }
    }
    ${VerseTranscription} {
      margin-top: 10px;
      font-weight: 600;
      color: ${theme.linkColor};
    }
  `}
`;

const VerseDetail = styled.section`
  ${({ theme }) => css`
    max-width: 70em;
    margin: 8px auto 24px auto;

    .col-words {
      width: 45%;
    }
    .col-translations {
      width: 55%;
    }

    @media only screen and (max-width: 58em) {
      .col-words,
      .col-translations {
        width: 100%;
      }
    }

    ${VerseTranslation} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: ${theme.enSiyah};
      justify-content: center;
      padding: 1em;
      border-bottom: 1px solid ${theme.secondaryBeyaz};
      ${VerseAuthor} {
        font-weight: 600;
        span {
          font-style: italic;
          color: ${theme.verseMainAuthorTetColor};
          font-weight: normal;
        }
      }
      ${VerseText} {
        margin-top: 4px;
      }
      :last-child {
        border: 0;
      }
      @media only screen and (max-width: ${theme.sizes.sm}) {
        padding: 1em 0;
      }
    }
    table {
      width: 100%;
      background-color: ${theme.bodyBackground};
      color: ${theme.enSiyah};
      border-collapse: collapse;
      border-spacing: 0;
      tr {
        :last-child {
          td {
            border: 0;
          }
        }
      }
      th,
      td {
        border-bottom: 1px solid ${theme.secondaryBeyaz};
        padding: 0.5em 0.75em;
        vertical-align: top;
        color: ${theme.enSiyah};
        @media only screen and (max-width: ${theme.sizes.xs}) {
          font-size: 0.9em;
        }
      }
      th {
        font-weight: 600;
      }
      .sort-number {
        color: ${theme.ortancaSiyah};
        width: 20px;
        text-align: center;
        @media only screen and (max-width: ${theme.sizes.sm}) {
          text-align: center;
          padding-left: 4px;
        }
      }
      .transcription {
        font-weight: 600;
        text-align: right;
        width: 45%;
        word-break: break-word;
      }
      .turkish {
        width: 55%;
        text-align: left;
        word-break: break-word;
      }
      .arabic {
        width: 5%;
        text-align: right;
        @media only screen and (max-width: ${theme.sizes.sm}) {
          padding-right: 4px;
        }
      }
      .root-link {
        color: ${theme.linkColor};
        font-weight: 600;
        cursor: pointer;
      }
    }
    ${TabList} {
      position: sticky;
      top: 3.5em;
      border-bottom: 1px solid ${theme.secondaryBeyaz};
    }
    ${TabPanel} {
      border-top: 0;
    }
    @media only screen and (max-width: 58em) {
      margin-top: 0;
      padding: 0 16px;

      table {
        margin-bottom: ${(props) => (props.isAmp ? "12px" : "56px")};
      }

      ${Container} {
        padding: 0;
        ${Row} {
          margin: 0;
          ${Col} {
            padding: 0;
          }
        }
      }
      ${TabList} {
        border-radius: 0;
        border: 0;
        padding: 10px 0;
        border-bottom: 1px solid ${theme.secondaryBeyaz};
      }
      ${TabPanel} {
        border: 0;
      }
    }
  `}
`;

const CommonNavigation = styled.div`
  ${({ theme }) => css`
    a,
    div {
      &.button {
        margin: 0 2px;
        padding-bottom: calc(0.375em);
        padding-left: 0.75em;
        padding-right: 0.75em;
        padding-top: calc(0.375em);
        text-align: center;
        white-space: nowrap;
        background-color: ${theme.bodyBackground};
        border: 1px solid ${theme.secondaryBeyaz};
        color: ${theme.enSiyah};
        cursor: pointer;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        box-shadow: none;
        display: inline-flex;
        font-size: 1em;
        &.half-opacity {
          opacity: 0.5;
        }
        &:hover {
          border-color: ${theme.borderHover};
          color: ${theme.enSiyah};
        }

        @media only screen and (max-width: ${theme.sizes.sm}) {
          &:hover {
            border-color: ${theme.secondaryBeyaz};
          }
        }

        .icon {
          margin-left: calc(-0.375em - 1px);
          margin-right: calc(-0.375em - 1px);
          height: 1.5em;
          width: 1.5em;
          align-items: center;
          display: inline-flex;
          justify-content: center;
        }
      }
    }
  `}
`;

export {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabText,
  Container,
  Row,
  Col,
  SC,
  VerseMain,
  VerseDetail,
  VerseAuthor,
  VerseHeroAuthor,
  VerseTranslation,
  VerseHeroTranslation,
  VerseTranslations,
  VerseArabic,
  VerseTranscription,
  VerseText,
  CommonNavigation,
  AmpArabicText,
};
