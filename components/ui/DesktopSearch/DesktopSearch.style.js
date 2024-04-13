import styled, { css } from "styled-components";

const SC = styled.div`
  ${({ theme }) => css`
    background: ${theme.bodyBackground};
    z-index: 998;
    display: flex;
    flex-direction: column;
    width: 100% !important;
    background: ${theme.desktopSearchBackgroundColor};
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    ${(props) =>
      props.indexPage &&
      css`
        background: transparent;
        position: unset;
        padding-top: unset;
      `};
  `}
`;

const SearchArea = styled.div`
  ${({ theme }) => css`
    border-radius: ${(props) => (props.showResults ? "6px 6px 0 0" : "6px")};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: min(800px, 94%);
    background: ${theme.bodyBackground};
    box-shadow: ${theme.searchAreaInputShadow};
    border: 1px solid ${theme.searchBorderColor};

    z-index: 333;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      max-width: unset;
      background: ${theme.searchInputMobileBgColor};
    }
  `}
`;

const Navigation = styled.div`
  ${({ theme }) => css`
    padding: 10px 24px 10px 0;
    width: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 10px 10px 10px 0;
    }
    .desktop-search {
      &__root {
        display: flex;
        select {
          width: 75px;
        }
      }
      &__juz {
        width: 140px;
      }
      &__page {
        width: 154px;
      }
      &__surah {
        display: flex;
        select {
          width: 160px;
        }
      }
      &__select-surah {
        width: 180px;
      }
      &__select-rootchar {
        width: 100px;
      }
      &__select-root {
        width: 120px;
      }
    }
    button {
      cursor: pointer;
      color: ${theme.primaryTextColor};
      width: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 34px;
      border-radius: 50%;
      @media (hover: hover) {
        :hover {
          background: ${theme.secondaryBeyaz};
        }
      }
      svg.navigation__icon {
        width: 18px;
        height: 18px;
      }
    }
  `}
`;

const SearchInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 20px 32px;
    border: 0;
    color: ${theme.enSiyah};
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => (props.showResults ? "6px 6px 0 0" : "6px")};

    font-size: 1.5em;
    box-sizing: border-box;
    font-weight: 600;
    background: ${theme.bodyBackground};
    &::placeholder {
      color: ${theme.primaryTextColor};
      opacity: 0.7;
      font-family: var(--font-inter);
    }
    &:hover {
      color: ${theme.enSiyah};
    }
    &:focus {
      outline: 0;
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 10px 20px;
      background: ${theme.searchInputMobileBgColor};
    }
  `}
`;

const Results = styled.div`
  ${({ theme }) => css`
    background: ${theme.bodyBackground};
    border-top: 0;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: min(800px, 94%);
    box-shadow: ${theme.searchAreaBoxShadow};
    border: 1px solid ${theme.searchBorderColor};
    border-top: 0;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      max-width: unset;
    }
  `}
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  ul {
    max-height: 326px;
    overflow-y: auto;
    padding: 12px;
    li {
      cursor: pointer;
      border-radius: 8px;
      :last-child {
        border: 0;
        border-radius: 0 0 0 6px;
      }
      :hover {
        background: ${(props) => props.theme.beyazHover};
      }
    }
  }
`;

const CloseModal = styled.div`
  position: absolute;
  top: 4em;
  right: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.sizes.md}) {
    top: 2em;
    right: 2em;
  }
  button {
    cursor: pointer;
    padding: 8px;
    width: 2.25em;
    height: 2.25em;
  }
  svg {
    border-radius: 50%;
    display: block;
    cursor: pointer;
    padding: 8px;
    width: 2.25em;
    height: 2.25em;
    background: #fff;
    color: #333;
    :hover {
      background: #333;
      border-radius: 50%;
      color: #fff;
    }
  }
  span {
    font-size: 0.8em;
    margin-top: 4px;
    font-weight: 600;
    color: #fff;
  }
`;

const Apps = styled.div`
  display: flex;
  text-align: center;
  svg {
    height: 40px;
    margin: 0 6px;
  }
`;

const SocialDiv = styled.div`
  margin-top: ${(props) => (props.isMobile ? "2em" : "0.5em")};
`;

const SocialButton = styled.a`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    color: ${theme.bodyBackground};
    text-decoration: none !important;
    svg {
      font-size: 1em;
      margin-right: 6px;
      fill: ${theme.bodyBackground};
    }
    :hover {
      opacity: 0.8;
    }
  `}
`;

const PatreonButton = styled(SocialButton)`
  background: #e85a46;
  max-width: 180px;
  width: 100%;
  color: #fff;
  svg {
    fill: #fff;
  }
`;

const TwitterButton = styled(SocialButton)`
  background: #1da1f2;
`;

const InstagramButton = styled(SocialButton)`
  background: #e1306c;
`;

export {
  SC,
  SearchArea,
  Navigation,
  SearchInput,
  Results,
  SearchResults,
  CloseModal,
  PatreonButton,
  InstagramButton,
  TwitterButton,
  Apps,
  SocialDiv,
};
