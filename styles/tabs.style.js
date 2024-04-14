import {
  Tab as ReactTab,
  TabList as ReactTabList,
  TabPanel as ReactTabPanel,
  Tabs as ReactTabs,
} from "react-tabs";
import styled, { css } from "styled-components";

const Tabs = styled(ReactTabs)``;

const TabList = styled(ReactTabList)`
  ${(props) => css`
    background: ${props.theme.bodyBackground};
    display: flex;
    border-radius: 4px 4px 0 0;
    padding: 10px;
    border: 1px solid ${props.theme.secondaryColor};
    border-bottom: 0;
    ${props.sticky &&
    css`
      position: sticky;
      top: 3.5em;
    `}
  `}
`;

const TabText = styled.h2`
  ${({ theme }) => css`
    margin-left: 0.5em;
    /* @media only screen and (max-width: ${theme.sizes.sm}) {
    display: none;
  } */
    user-select: none;
  `}
`;

const TabListFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TabListFlexAction = styled.button`
  ${({ theme }) => css`
    padding: 0.5em 1em;
    background-color: ${theme.pearlYellow};
    border: 1px dashed ${theme.secondaryColor};
    color: ${theme.primaryTextColor};
    border-radius: 4px;
    display: flex;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
    svg {
      margin-left: 4px;
    }
    span {
      @media only screen and (max-width: ${theme.sizes.sm}) {
        display: none;
      }
    }
    margin-left: 4px;
  `}
`;

const Tab = styled(ReactTab)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: ${theme.thirdColor};
    }
    svg {
      height: 1em;
    }
    &.react-tabs__tab--selected {
      background: ${theme.thirdColor};
      border-color: ${theme.secondaryColor};
      border-bottom-color: transparent;
      align-items: center;
      font-weight: 600;
      display: flex;
      justify-content: center;
      margin-bottom: -1px;
      padding: 0.5em 1em;
      vertical-align: top;
      @media only screen and (max-width: ${theme.sizes.sm}) {
        ${TabText} {
          display: flex;
        }
      }
    }
    &.react-tabs__tab--disabled {
      color: ${theme.borderHover};
    }
  `}
`;

const TabPanel = styled(ReactTabPanel)`
  ${({ theme }) => css`
    border: 1px solid ${theme.secondaryColor};
    @media only screen and (max-width: ${theme.sizes.sm}) {
      border: 0;
    }
  `}
`;

export {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabText,
  TabListFlex,
  TabListFlexAction,
};
