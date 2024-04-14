import styled, { css } from "styled-components";

const BookmarkVerseTranslation = styled.div``;
const BookmarkVerseArabic = styled.div``;
const BookmarkVerseTranscription = styled.h3``;
const BookmarkVerseNumber = styled.h2``;

const BookmarkAction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex !important;
  }
`;

const BookmarkContextMenu = styled.div`
  padding: 10px 0;
  text-align: left;
  width: 230px;
  user-select: none;
`;

const BookmarkDate = styled.time`
  ${({ theme }) => css`
    color: ${theme.aboutVerseTextColor};
    margin-right: 4px;
    user-select: none;
  `}
`;

const BookmarkEmpty = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: min(calc(100dvh - 80px), 500px);
    padding: 24px;
    max-width: 450px;
    text-align: center;
    margin: 0 auto;
    svg {
      color: ${theme.primaryDark};
    }
    h2 {
      font-size: 1.5em;

      font-weight: bold;
    }
    p,
    .additional_text {
      color: ${theme.primaryDark};
      font-size: 1em;
      margin-top: 24px;
    }
    span {
      color: ${theme.aboutVerseTextColor};
    }
  `}
`;

const BookmarkVerse = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.secondaryColor};
    padding: 20px;
    ${BookmarkVerseTranslation} {
      margin-top: 10px;
      em {
        background-color: ${theme.helperBackground};
      }
    }
    ${BookmarkVerseArabic} {
      margin-top: 10px;
      font-family: var(--font-mushaf) !important;
      font-size: 1.75em;
      line-height: 1.5em;

      em {
        background-color: ${theme.helperBackground};
      }
    }
    ${BookmarkVerseTranscription} {
      margin-top: 10px;
      font-weight: 600;
      color: ${theme.linkColor};
      em {
        background-color: ${theme.helperBackground};
      }
    }

    ${BookmarkVerseNumber} {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      svg {
        cursor: pointer;
        padding: 8px;
        width: 2.25em;
        height: 2.25em;
        :hover {
          background: ${theme.secondaryColor};
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

        :hover {
          cursor: pointer;
        }

        svg {
          margin: 0 8px;
          height: 1em;
          color: ${theme.borderHover};
        }
        em {
          font-weight: normal;
          font-style: italic;
          opacity: 0.8;
        }
      }
    }
  `}
`;

const BookmarkList = styled.div`
  ${BookmarkVerse} {
    &:last-child {
      border-bottom: 0;
    }
  }
`;

const BookmarkContainer = styled.div`
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

const BookmarkLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 460px;
`;

export {
  BookmarkVerse,
  BookmarkVerseNumber,
  BookmarkVerseTranslation,
  BookmarkVerseArabic,
  BookmarkVerseTranscription,
  BookmarkList,
  BookmarkContainer,
  BookmarkLoading,
  BookmarkAction,
  BookmarkEmpty,
  BookmarkDate,
  BookmarkContextMenu,
};
