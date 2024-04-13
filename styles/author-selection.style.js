import styled, { css } from "styled-components";

const AuthorSelectionBaseContainer = styled.div`
  ${({ theme }) => css`
    overflow-y: auto;
    max-height: calc(100dvh - 200px);
    height: 100%;
    min-height: min(calc(100dvh - 80px), 500px);

    @media only screen and (max-width: ${theme.sizes.sm}) {
      height: calc(100dvh - 50px);
      max-height: unset;
    }
  `}
`;

const AuthorSelectionContainer = styled.div`
  ${(props) => css`
    height: 100%;
    position: relative;

    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      height: calc(100dvh - 50px);
      max-height: unset;
    }

    ${props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
      user-select: none;
      max-height: 300px !important;
      overflow: hidden;
      min-height: min(calc(25dvh), 100px);

      @media only screen and (max-width: ${props.theme.sizes.sm}) {
        min-height: calc(100dvh - 400px);
        max-height: unset;
      }
    `}
  `}
`;

const AuthorSelectionLoginRequired = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 280px;
    padding: 24px;
    max-width: 450px;
    text-align: center;
    margin: 0 auto;
    svg {
      color: ${theme.enSiyah};
    }
    h2 {
      font-size: 1.5em;

      font-weight: bold;
    }
    p {
      color: ${theme.enSiyah};
      font-size: 1em;
      margin-top: 24px;
    }
    span {
      color: ${theme.aboutVerseTextColor};
    }
  `}
`;

const AuthorSelectionItemDraggable = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  touch-action: none;
`;

const AuthorSelectionItemDrag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px 6px;
  cursor: move;
`;

const AuthorSelectionItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: default;
`;

const AuthorSelectionActionButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
    @media only screen and (max-width: ${theme.sizes.md}) {
      display: flex;
    }
  `}
`;

const AuthorSelectionItem = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em;
    border-bottom: 1px solid ${theme.secondaryBeyaz};
    border-radius: 8px;

    .nav__locale-button {
      border-color: unset;
    }

    width: 100%;
    &:hover {
      background: ${theme.beyazHover};
      ${AuthorSelectionActionButton} {
        display: flex;
      }
    }
    ${(props) =>
      props.disabled &&
      css`
        opacity: 0.5;
        &:hover {
          opacity: 0.9;
        }
      `}
  `}
`;

const AuthorSelectionList = styled.div`
  width: 100%;
  padding: 1em;
`;

export {
  AuthorSelectionItem,
  AuthorSelectionContainer,
  AuthorSelectionActionButton,
  AuthorSelectionItemDraggable,
  AuthorSelectionList,
  AuthorSelectionItemContent,
  AuthorSelectionItemDrag,
  AuthorSelectionLoginRequired,
  AuthorSelectionBaseContainer,
};
