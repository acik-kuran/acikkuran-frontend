import { Container } from "react-awesome-styled-grid";
import styled, { css } from "styled-components";

const NavSearch = styled.div``;
const NavHome = styled.div``;
const Nav = styled.nav`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.secondaryColor};
    position: fixed;
    @media print {
      position: relative;
      margin-bottom: -3.5em;
    }
    top: 0;
    left: 0;
    right: 0;
    background: ${theme.bodyBackground};
    z-index: 1000;
    box-shadow: 10px -5px 10px -5px rgba(0, 0, 0, 0.59);
    .full-search {
      bottom: 0;
    }
  `}
`;

const NavContainer = styled(Container)`
  ${(props) => css`
    height: 3.5em;
    background: ${props.theme.bodyBackground};
    display: grid;

    @media only screen and (min-width: ${props.theme.sizes.sm}) {
      grid-template-columns: ${props.isAmp ? "1fr" : "1fr 110px 1fr"};
      grid-template-areas: ${props.isAmp ? "'left'" : "'left center right'"};
    }

    @media only screen and (max-width: ${props.theme.sizes.md}) {
      grid-template-columns: ${props.isAmp ? "1fr" : "250px 1fr"};
      grid-template-areas: ${props.isAmp ? "'left'" : "'left right'"};
    }

    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      grid-template-columns: 1fr;
      grid-template-areas: "left";
      padding-left: 0.5em;
      padding-right: 0.5em;
    }
  `}
`;

const NavLeft = styled.div`
  ${({ theme }) => css`
    grid-area: left;
    display: flex;
    align-items: center;
    position: relative;

    ${NavSearch} {
      position: absolute;
      right: 0em;
      display: flex;
      justify-content: center;
      align-items: center;
      .amp-link {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height: 0;
        margin-right: 8px;
        svg {
          width: unset;
          height: unset;
          padding: 0;
          margin: 0;
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
        @media (hover: hover) {
          :hover {
            background: ${theme.secondaryColor};
          }
        }
        svg {
          width: 18px;
          height: 18px;
          color: ${theme.neutralDark};
        }
      }
    }
    .navbar-main-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      a {
        line-height: 0;
      }
      button,
      .button-as-a {
        @media print {
          display: none;
        }
        cursor: pointer;
        margin-right: 10px;
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        svg {
          width: 18px;
          height: 18px;
          color: ${theme.neutralDark};
        }
        @media only screen and (max-width: ${theme.sizes.md}) {
          margin-right: 1px;
        }
        @media (hover: hover) {
          :hover {
            background: ${theme.secondaryColor};
          }
        }
      }
    }
    h1 {
      font-size: 1.15em;
      color: ${theme.primaryDark};
      font-weight: 600;
      line-height: 0;
      text-wrap: nowrap;
      @media only screen and (max-width: ${theme.sizes.md}) {
        font-size: 1.15em;
      }
      em {
        padding-left: 5px;
        font-size: 0.8em;
        opacity: 0.6;
        font-weight: normal;
        font-style: italic;
      }

      span {
        @media only screen and (max-width: ${theme.sizes.md}) {
          display: none;
        }

        @media only screen and (min-width: ${theme.sizes
            .xsm}) and (max-width: ${theme.sizes.sm}) {
          display: inline;
        }
      }
    }
  `}
`;

const NavCenter = styled.div`
  ${(props) => css`
    @media print {
      display: none;
    }
    grid-area: center;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      line-height: 0;
      margin-top: 2px; // optical margin alignment
      z-index: 22;
      cursor: pointer;
      &:hover {
        svg {
          opacity: 1 !important;
        }
      }
    }
    svg {
      margin-top: 4px;
      height: ${props.height};
      path {
        fill: ${props.theme.zebra};
      }
      opacity: 0.7;
      &:hover {
        opacity: 1 !important;
      }
    }
    @media only screen and (max-width: ${props.theme.sizes.md}) {
      display: none;
    }
  `}
`;

const NavRight = styled.div`
  ${({ theme }) => css`
    @media print {
      display: none;
    }
    grid-area: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .verse-actions {
      display: flex;
      flex-direction: row;
    }
    width: 100%;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      display: none;
    }

    ${NavSearch} {
      a,
      button {
        margin: 0 2px;
        padding-bottom: calc(0.375em);
        padding-left: 1em;
        padding-right: 1em;
        padding-top: calc(0.375em);
        text-align: center;
        white-space: nowrap;
        background-color: ${theme.bodyBackground};
        border: 1px solid ${theme.secondaryColor};
        color: ${theme.primaryDark};
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
          color: ${theme.primaryDark};
        }
        .icon {
          margin-left: calc(-0.375em - 1px);
          margin-right: calc(-0.375em - 1px);
          height: 1.5em;
          width: 1.25em;
          align-items: center;
          display: inline-flex;
          justify-content: center;
        }
      }
    }
  `}
`;

const Bottom = styled.nav`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.secondaryColor};
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${theme.bodyBackground};
    z-index: 1033;
    /* box-shadow: 0px -5px 5px -5px rgba(0, 0, 0, 0.19); */
  `}
`;

const BottomContainer = styled(Container)`
  ${({ theme }) => css`
    height: 3.5em;
    background: ${theme.bodyBackground};
    display: none;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      display: flex;
    }
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .verse-actions {
      display: flex;
      flex-direction: row;
    }
    width: 100%;
    ${NavHome} {
      a {
        margin: 0 2px;
        padding-bottom: calc(0.375em);
        padding-left: 1em;
        padding-right: 1em;
        padding-top: calc(0.375em);
        text-align: center;
        white-space: nowrap;
        background-color: ${theme.bodyBackground};
        border: 1px solid ${theme.secondaryColor};
        color: ${theme.primaryDark};
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
          color: ${theme.primaryDark};
        }
        @media only screen and (max-width: ${theme.sizes.sm}) {
          &:hover {
            border-color: ${theme.secondaryColor};
          }
        }
        .icon {
          margin-left: calc(-0.375em - 1px);
          margin-right: calc(-0.375em - 1px);
          height: 1.5em;
          width: 1.25em;
          align-items: center;
          display: inline-flex;
          justify-content: center;
        }
      }
    }
  `}
`;

export {
  NavSearch,
  NavHome,
  Nav,
  NavContainer,
  NavLeft,
  NavCenter,
  NavRight,
  Bottom,
  BottomContainer,
};
