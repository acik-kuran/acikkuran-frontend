import { Col, Container, Row } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

import { Tab, TabList, TabPanel, TabText, Tabs } from "./tabs.style";

const LoadingSC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchBoxSC = styled.div`
  ${({ theme }) => css`
    &.show-random-verses {
      list-style: none;
      padding: 15px 20px;
      background-color: ${theme.thirdBeyaz};
      width: 100%;
      display: flex;
      align-items: center;
      font-weight: bold;
      .line-icon {
        display: flex;
        padding: 0 12px 0 0px;
        svg {
          font-size: 1em;
          color: ${theme.enEnSiyah};
        }
      }
    }
    &.search-all {
      list-style: none;
      a {
        width: 100%;
        cursor: pointer;
        background-color: ${theme.sarimsi};
        border-bottom: 1px solid ${theme.bunedir};
        display: flex;
        align-items: center;
        .line-icon {
          display: flex;
          padding: 0 12px 0 0px;
          svg {
            font-size: 1em;
            color: ${theme.enEnSiyah};
          }
        }
        :hover {
          background-color: ${theme.bunedir};
        }
      }
    }
    a {
      padding: 12px 20px;
      text-decoration: none;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      &:hover {
        text-decoration: none;
      }
      .verseline {
        color: ${theme.linkColor};
        font-weight: 600;
      }

      h3 {
        font-weight: 600;
      }
      h4 {
        font-weight: 600;
      }
      p {
        font-size: 1em;
      }
      .line-icon {
        padding: 4px 12px 8px 0px;
        &__surah {
          padding: 0 12px 0 0px;
        }
        svg {
          font-size: 1em;
          color: ${theme.acikGri};
        }
      }
      .line-content {
        flex-grow: 1;
        em {
          background-color: ${theme.bunedir};
        }
      }

      .line-transcription {
        margin-top: 10px;
        font-weight: 600;
        color: ${theme.linkColor};
        em {
          background-color: ${theme.bunedir};
        }
      }

      .line-verse {
        margin-top: 10px;
        font-family: var(--font-mushaf) !important;
        font-size: 1.5em;
        line-height: 1.55em;

        em {
          background-color: ${theme.bunedir};
        }
      }
    }
  `}
`;

const SC = styled.div`
  .topbar__select-surah {
    width: 170px;
  }
`;

const SearchDetail = styled.section`
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
      z-index: 2;
      border-bottom: 1px solid ${theme.secondaryBeyaz};
      display: flex;
      justify-content: space-between;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        border: 0;
        border-bottom: 1px solid ${theme.secondaryBeyaz};
        padding: 10px 0;
      }
    }
    ${TabPanel} {
      border-top: 0;
    }
  `}
`;

const SearchResult = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 0;
    font-weight: bold;
    span {
      font-weight: normal;
      margin-left: 5px;
    }

    margin-right: 8px;
    font-size: 1em;
    color: ${theme.gray};
    @media only screen and (max-width: ${theme.sizes.sm}) {
      min-width: 74px;
      margin-right: 0;
      justify-content: right;
      font-size: 0.8em;
      font-weight: normal;
      span {
        display: none;
      }
    }
  `}
`;

const EmptySearchResult = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: calc((100dvh - 380px) / 2) 48px;
    color: ${theme.primaryTextColor};
    opacity: 0.3;
    font-size: 1.25em;
    text-align: center;
    width: 100%;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 24px;
      filter: grayscale(1);
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      font-size: 1em;
      padding: calc((100dvh - 340px) / 2) 48px;
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
  SearchBoxSC,
  SearchDetail,
  SearchResult,
  EmptySearchResult,
  LoadingSC,
};
