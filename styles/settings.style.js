import {
  Tab as ReactTab,
  TabList as ReactTabList,
  TabPanel as ReactTabPanel,
  Tabs as ReactTabs,
} from "react-tabs";
import styled, { css } from "styled-components";

const SettingsModalContainer = styled.div`
  max-height: calc(100dvh - 200px);
  height: 100%;
  min-height: min(calc(100dvh - 80px), 370px);
  padding: 24px;
  overflow-y: auto;
`;

const Tabs = styled(ReactTabs)`
  display: flex;
  flex-direction: column;
`;

const TabList = styled(ReactTabList)`
  ${({ theme }) => css`
    flex-direction: row;
    display: flex;
    width: unset;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 16px;
    margin-top: -12px;
    border: 0;
    border-bottom: 1px solid ${theme.lineBorderBottomColor};
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      width: 0;
      border: 0;
    }
  `}
`;

const TabText = styled.span`
  margin-left: 0.5em;
`;

const Tab = styled(ReactTab)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    &:hover {
      opacity: 0.8;
    }
    svg {
      height: 1em;
    }

    &.react-tabs__tab--selected {
      background: ${theme.thirdBeyaz};
      border-color: ${theme.secondaryBeyaz};
      border-bottom-color: transparent;
      align-items: center;
      display: flex;
      margin-bottom: -1px;
      padding: 0.5em 1em;
      vertical-align: top;
      outline: unset;
      color: ${theme.enSiyah};
      font-weight: 900;
    }
  `}
`;

const TabPanel = styled(ReactTabPanel)`
  &.react-tabs__tab-panel--selected {
    flex-grow: 1;
  }
`;

const Logout = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 76px;
    right: 24px;
    left: unset;
    bottom: unset;
    margin-bottom: unset;
    font-size: 14px;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      span {
        display: none;
      }
      svg {
        font-size: 1.5em;
        margin-right: 0 !important;
        padding: 0;
      }
      position: absolute;
      top: 21px;
      right: 24px;
      left: unset;
      bottom: unset;
      margin-bottom: unset;
    }
    z-index: 9999;
    user-select: none;
    svg {
      margin-right: 6px;
    }
    a {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;

export const ProfileLoginArea = styled.div`
  min-height: min(calc(100dvh - 180px), 280px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabText,
  Logout,
  SettingsModalContainer,
};
