import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

import { Tab, TabList, TabPanel, TabText, Tabs } from "./tabs.style";

const RootVerse = styled.div``;
const RootVerseTop = styled.div``;
const RootVerseTitle = styled.div``;
const RootVerseOption = styled.div``;
const RootVerseDetail = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
`;
const RootVerseArabic = styled.div``;
const RootVerseTranscription = styled.div``;
const RootVerseTranslation = styled.div``;

const RootTitleArabic = styled.span``;
const RootTitleTranscription = styled.span``;

const SC = styled.div`
  position: relative;
  min-height: calc(100dvh - 3.5em);
  .topbar__select-rootchar {
    width: 120px;
  }
  .topbar__select-root {
    width: 160px;
  }
`;

const RootMain = styled.section`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.primaryDark};
    padding: 24px 0;
    word-break: break-word;
    max-width: 70em;
    margin: 0 auto;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 1em 0;
    }
  `}
`;

const RootDetail = styled.section`
  ${({ theme }) => css`
    max-width: 70em;
    margin: 0 auto;
    ${TabList} {
      border-bottom: 1px solid ${theme.secondaryColor};
    }
    ${TabPanel} {
      border-top: 0;
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 0 16px;
      margin-top: 0;
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
        border-top: 1px solid ${theme.secondaryColor};
        border-bottom: 1px solid ${theme.secondaryColor};
      }
      ${TabPanel} {
        border: 0;
      }
    }

    ${TabList} {
      @media only screen and (max-width: ${theme.sizes.sm}) {
        border: 0;
        padding: 0 0 10px 0;
        border-bottom: 1px solid ${theme.secondaryColor};
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
        svg {
          cursor: pointer;
          padding: 8px;
          width: 2.25em;
          height: 2.25em;
          margin-top: 2px;
          :hover {
            background: ${theme.secondaryColor};
            border-radius: 50%;
          }
        }
      }
    }
  `}
`;

const RootDiffs = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1em;
    border-bottom: 1px solid ${theme.secondaryColor};
  `}
`;

const RootVerses = styled.div`
  ${({ theme }) => css`
    ${RootVerse} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: ${theme.primaryDark};
      justify-content: center;
      padding: 1em;
      border-bottom: 1px solid ${theme.secondaryColor};
      @media only screen and (max-width: ${theme.sizes.sm}) {
        padding: 1em 0;
      }
      ${RootVerseTop} {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        ${RootVerseTitle} {
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          .root__title-arabic,
          .root__title-turkish {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          @media only screen and (max-width: ${theme.sizes.sm}) {
            flex-direction: column;
            align-items: flex-start;
            svg {
              display: none;
              &.show-icon {
                display: inline;
              }
            }
          }
          a {
            font-weight: 600;
          }
          svg {
            margin: 0 10px;
            height: 1em;
            color: ${theme.borderHover};
          }
          em {
            font-style: italic;
            opacity: 0.8;
          }
          ${RootTitleArabic} {
            font-family: var(--font-mushaf) !important;
            font-size: 1.5em;
          }
          ${RootTitleTranscription} {
            color: ${theme.linkColor};
            font-weight: 600;
          }
        }
        ${RootVerseOption} {
          text-align: right;
          display: flex;
          cursor: pointer;

          a {
            margin-right: 10px;
          }
          button {
            cursor: pointer;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            svg {
              width: 18px;
              height: 18px;
              color: ${theme.neutralDark};
            }
            :hover {
              background: ${theme.secondaryColor};
            }
          }
        }
      }
      ${RootVerseDetail} {
        ${RootVerseTranslation} {
          margin-bottom: 10px;
        }
        ${RootVerseArabic} {
          margin-bottom: 10px;
          font-family: var(--font-mushaf) !important;
          font-size: 1.75em;
          line-height: 1.5em;
        }
        ${RootVerseTranscription} {
          font-weight: 600;
          color: ${theme.linkColor};
        }
      }
    }
  `}
`;

const RootVerseTags = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-bottom: 12px;
    opacity: 0.8;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin-top: 8px;
      flex-wrap: wrap;
      gap: 4px;
    }
  `}
`;

const RootVerseTag = styled.div`
  ${({ theme }) => css`
    margin-right: 5px;
    padding: 1px 6px;
    font-size: 12px;
    background: ${theme.secondaryColor};
    border-radius: 4px;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin-right: unset;
    }
  `}
`;

const EmptyVersesData = styled.div`
  padding: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  RootMain,
  RootDetail,
  RootVerses,
  RootVerse,
  RootVerseTop,
  RootVerseTitle,
  RootVerseOption,
  RootVerseDetail,
  RootVerseArabic,
  RootVerseTranscription,
  RootVerseTranslation,
  RootTitleArabic,
  RootTitleTranscription,
  RootDiffs,
  RootVerseTags,
  RootVerseTag,
  EmptyVersesData,
};
