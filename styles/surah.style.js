import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

import { Tab, TabList, TabPanel, TabText, Tabs } from "./tabs.style";

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

const SurahVerseTranslation = styled.div``;
const SurahVerseArabic = styled.p``;
const SurahVerseTranscription = styled.p``;
const SurahVerseNumber = styled.div``;

const SurahOriginal = styled.h2``;
const SurahTranslation = styled.div``;
const SurahTransliteration = styled.div``;

const SurahHero = styled.section`
  ${({ theme }) => css`
    text-align: center;
    background-color: ${theme.beyazHover};
    margin-bottom: 20px;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid ${theme.beyazHover};

    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin-top: 16px;
      margin-bottom: 4px;
      padding: 16px;
    }

    ${SurahOriginal} {
      font-size: 1.5em;
      margin-bottom: 0;
      font-weight: 500;
      font-family: var(--font-mushaf);
    }
    ${SurahTransliteration} {
      font-size: 1.5em;
      margin-bottom: 0;
      font-weight: bold;
      padding: 4px;
    }
    ${SurahTranslation} {
      font-size: 1em;
      margin-bottom: 0;
      font-weight: 400;
      font-style: italic;
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

const SurahDetail = styled.section`
  ${({ theme }) => css`
    padding-top: 20px;
    max-width: 70em;
    margin: 0 auto;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 0 16px;
      ${Container} {
        padding: 0;
        ${Row} {
          margin: 0;
          ${Col} {
            padding: 0;
          }
        }
      }
    }

    ${TabList} {
      @media only screen and (max-width: ${theme.sizes.sm}) {
        border: 0;
        border-bottom: 1px solid ${theme.secondaryBeyaz};
        padding: 10px 0;
        span {
          display: none;
        }
      }
      .tablist__actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        &-icon {
          display: flex;
          @media only screen and (max-width: ${theme.sizes.sm}) {
            margin-left: 4px;
          }
        }
        button {
          cursor: pointer;
          width: 34px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;

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
          button {
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  `}
`;

const SurahAuthor = styled.div`
  ${({ theme }) => css`
    padding: 10px 20px;
    background: ${theme.secondaryBeyaz};
  `}
`;

const SurahVerse = styled.div`
  ${({ theme }) => css`
    padding: 20px;
    border-bottom: 1px solid ${theme.secondaryBeyaz};
    :last-child {
      border-bottom: 0;
    }
    &:hover {
      background: ${theme.beyazHover};
      ${SurahVerseNumber} {
        span {
          display: flex;
          align-items: center;
        }
      }
    }
    ${SurahVerseTranslation} {
      margin-top: 10px;
      em {
        background-color: ${theme.bunedir};
      }
    }
    ${SurahVerseArabic} {
      margin-top: 10px;
      font-family: var(--font-mushaf);
      font-size: 2em;
      line-height: 1.5em;
      em {
        background-color: ${theme.bunedir};
      }
    }
    ${SurahVerseTranscription} {
      margin-top: 10px;
      font-weight: 600;
      color: ${theme.linkColor};
      em {
        background-color: ${theme.bunedir};
      }
    }

    ${SurahVerseNumber} {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
        padding: 8px;
        width: 2.25em;
        height: 2.25em;
        :hover {
          background: ${theme.secondaryBeyaz};
          border-radius: 50%;
        }
      }

      a {
        font-weight: 600;
        ${(props) =>
          props.hideMarginBottom &&
          css`
            margin-bottom: 0 !important;
          `}
        display: flex;
        flex-direction: row;
        align-items: center;
        :hover {
          cursor: pointer;
        }
        span {
          margin-left: 5px;
          display: none;
          &:hover {
            text-decoration: underline;
          }
        }
        svg {
          // potential bug
          margin: 0 8px;
          height: 1em;
          padding: 0;
          width: 1em;
          color: ${theme.borderHover};
        }
        em {
          font-weight: normal;
          font-style: italic;
          opacity: 0.8;
        }
      }
    }

    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 20px 0;
      &:hover {
        background-color: unset;
      }
    }
  `}
`;

const SurahVerseZero = styled(SurahVerse)`
  padding-top: 10px;
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
  SurahHero,
  SurahDetail,
  SurahAuthor,
  SurahVerse,
  SurahVerseZero,
  SurahVerseNumber,
  SurahVerseTranslation,
  SurahVerseArabic,
  SurahVerseTranscription,
  SurahTranslation,
  SurahOriginal,
  SurahTransliteration,
  AmpArabicText,
};
