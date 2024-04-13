import { Inter } from "next/font/google";
import localFont from "next/font/local";
import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

import { Tab } from "./tabs.style";

const MushafFont = localFont({
  src: "../assets/fonts/ShaikhHamdullahMushaf.ttf",
});

const inter = Inter({
  display: "swap",
  weight: ["400", "600"],
  subsets: ["latin-ext"],
});

export default createGlobalStyle`
  ${reset}
  :root {
    ${({ theme }) => css`
      --font-mushaf: ${MushafFont.style.fontFamily};
      --font-inter: ${inter.style.fontFamily}, sans-serif, Georgia;
      --geist-foreground: ${theme.primaryTextColor};
    `}
  }

  html {
    font-family: var(--font-inter);
    font-display: swap;
  }

  ${({ theme }) => css`
    body {
      font-family: var(--font-inter);
      font-display: swap;
      overscroll-behavior-y: none;
      background: ${theme.bodyBackground};
      color: ${theme.primaryTextColor};
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      overflow-x: hidden;
      width: 100%;
      -webkit-tap-highlight-color: transparent;

      @media only screen and (max-width: 700px) {
        font-size: 15px;
      }
      @media only screen and (max-width: 359px) {
        font-size: 14px;
        line-height: 1.4;
      }
    }

    * {
      box-sizing: border-box;
    }

    i {
      font-style: italic;
    }

    body,
    button,
    input,
    select,
    textarea {
      font-feature-settings: "case" 1, "rlig" 1, "calt" 0;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      font-family: var(--font-inter);
      font-display: swap;
    }

    a {
      color: ${theme.primaryTextColor};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    strong {
      font-weight: 600;
    }

    .grecaptcha-badge {
      visibility: hidden;
    }

    .nav__lang-tooltip {
      z-index: 9999;
      background-color: ${theme.localeTooltipBackground};
      color: ${theme.localeTooltipTextColor};
      @media only screen and (max-width: ${theme.sizes.md}) {
        display: none;
      }
    }
    .nav__locale-button {
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.localeButtonTextColor};
      background-color: ${theme.localeButtonBackground};
      border: 1px solid ${theme.localeButtonBackground};
      border-radius: 4px;
      width: 24px;
      height: 22px;
      font-size: 10px;
      font-weight: 900;

      &:hover {
        color: ${theme.localeButtonTextColorHover};
        background-color: ${theme.localeButtonBackgroundHover};
        border: 1px solid ${theme.localeButtonBackgroundHover};
        text-decoration: none;
      }

      &--home {
        color: ${theme.localeButtonHomeTextColor};
        background-color: ${theme.localeButtonHomeBackground};
        border: 1px solid ${theme.localeButtonHomeBackground};
        &:hover {
          color: ${theme.localeButtonHomeTextColorHover};
          background-color: ${(props) =>
            props.theme.localeButtonHomeBackgroundHover};
          border: 1px solid ${theme.localeButtonHomeBackgroundHover};
        }
      }

      &--colored {
        background-color: ${theme.linkColor};
        color: ${theme.sarimsi};
      }
    }

    .select {
      select {
        margin: 0 2px;
        padding-bottom: calc(0.5em);
        padding-left: 1em;
        padding-right: 1em;
        padding-top: calc(0.5em);
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
        &:hover {
          border-color: ${theme.borderHover};
          color: ${theme.enSiyah};
        }
        @media only screen and (max-width: ${theme.sizes.md}) {
          padding-left: 0.5em;
          padding-right: 0.5em;
        }
        @media only screen and (max-width: ${theme.sizes.sm}) {
          &:hover {
            border-color: ${theme.secondaryBeyaz};
          }
        }
        &:focus {
          outline: 0;
        }
      }
    }

    #nprogress {
      z-index: 999;
      pointer-events: none;
      position: fixed;
      background: ${theme.nprogressBackgroundColor};
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      .bar {
        background: ${theme.enSiyah};
        position: fixed;
        z-index: 1031;
        top: 3.5em;
        left: 0;

        width: 100%;
        height: 3px;
      }

      .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${theme.enSiyah}, 0 0 5px ${theme.enSiyah};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }

      .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        left: calc(50% - 16px);
        top: 50%;
      }

      .spinner-icon {
        width: 32px;
        height: 32px;
        box-sizing: border-box;

        border: solid 3px transparent;
        border-top-color: ${theme.enSiyah};
        border-left-color: ${theme.enSiyah};
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
      }
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .root-props {
      &__select {
        width: 100%;
      }
      select {
        width: 100%;
      }
    }

    .change-author {
      &__select {
        width: 65%;
      }
      select {
        width: 100%;
      }
    }

    .change-font {
      &__select {
        width: 65%;
      }
      select {
        width: 100%;
      }
    }

    .tippy-list {
      li {
        user-select: none;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 8px;
        border-bottom: 1px solid #e4e4e4;
        :hover {
          background: #f4f4f4;
        }
        &:last-child {
          border: 0;
        }
        svg {
          margin-right: 8px;
          font-size: 1.3em;
          line-height: 0;
        }
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 3.5em;
    min-height: calc(100vh - 170px);
    @media only screen and (min-width: ${theme.sizes.sm}) {
      padding-bottom: 4em;
    }
    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin-bottom: 4em;
    }

    @media print {
      margin-bottom: 0;
    }
    ${Tab} {
      :focus {
        outline: transparent;
      }
    }
  `}
`;
