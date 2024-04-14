import styled, { css } from "styled-components";

const SC = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${theme.bodyBackground};
    z-index: 11111111;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`;

const SearchArea = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;

    svg {
      display: none;
      margin-left: 1px; // why?
      margin-top: 1px;
    }
    height: 3.5em;

    padding: 0 0.5em;
    border-bottom: 1px solid ${theme.secondaryBeyaz};
    box-shadow: 10px -5px 10px -5px rgba(0, 0, 0, 0.59);
    align-items: center;
    input {
      padding: 10px;
    }
    svg {
      display: block;
      cursor: pointer;
      padding: 8px;
      font-size: unset;
      width: 2.25em;
      height: 2.25em;
      :hover {
        background: ${theme.secondaryBeyaz};
        border-radius: 50%;
      }
    }
  `}
`;

const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 20px;
    background-color: ${theme.bodyBackground};
    color: ${theme.enSiyah};
    justify-content: center;
    align-items: center;
    border-radius: 6px 6px 0 0;
    box-shadow: none;
    font-size: 1em;
    box-sizing: border-box;
    border: 0;
    border-radius: 6px;
    &:hover {
      color: ${theme.enSiyah};
    }
    &:focus {
      outline: 0;
    }
    &::placeholder {
      font-family: var(--font-inter);
      color: ${theme.primaryTextColor};
      opacity: 0.7;
      font-size: 1em;
    }
  `}
`;

const Results = styled.div`
  ${({ theme }) => css`
    height: calc(100% - 3.5em);
    background: ${theme.bodyBackground};
    border-top: 0;
    border-radius: 0 0 6px 6px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: min(800px, 94%);
    overflow-y: auto;
    flex-grow: 1;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      max-width: unset;
    }
  `}
`;

const SearchResults = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    ul {
      li {
        cursor: pointer;
        border-bottom: 1px solid ${theme.lineBorderBottomColor};
        :last-child {
          border: 0;
          border-radius: 0 0 0 6px;
        }
        :hover {
          background: ${theme.secondaryBeyaz};
          color: ${theme.enEnSiyah};
        }
      }
    }
  `}
`;

export { SC, SearchArea, SearchInput, Results, SearchResults };
