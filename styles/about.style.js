import styled, { css } from "styled-components";

const AboutLogo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em auto 2em;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin: 2em auto 1em;
    }
    img {
      border-radius: 50%;
    }
  `}
`;

const AboutMain = styled.section`
  ${({ theme }) => css`
    border: 1px solid ${theme.secondaryColor};
    border-radius: 2em;
    width: 100%;
    max-width: 42em;
    box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.04);
    margin: 120px auto;
    color: ${theme.primaryDark};
    padding: 2em;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 0;
      margin: 0;
      box-shadow: unset;
      border: unset;
    }
    small {
      font-size: 10px;
      color: #eee;
    }
  `}
`;

const AboutVerseText = styled.blockquote`
  ${({ theme }) => css`
    color: ${theme.aboutVerseTextColor};
    width: 100%;
    margin: 0 auto;
    font-size: 1em;
    background-color: ${theme.smokeBackground};
    padding: 32px;
    border-radius: 1em;

    p {
      font-style: italic;
      margin-bottom: 0.25em;
      font-size: 1.15em;
    }
    cite {
      &::before {
        content: "—";
        margin-right: 0.25em;
      }
      a {
        color: inherit;
        font-size: 1.12em;
        @media only screen and (max-width: ${theme.sizes.sm}) {
          font-size: 1em;
        }
      }
    }

    @media only screen and (max-width: ${theme.sizes.sm}) {
      p {
        font-size: 1em;
      }
    }
  `}
`;

const AboutParagraph = styled.div`
  ${({ theme }) => css`
    margin: 0 0 1em;
    border-bottom: 1px solid ${theme.secondaryColor};
    padding: 2em 0;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 1.25em 0;
    }
  `}
`;

const AboutSocialAndApps = styled.div`
  ${({ theme }) => css`
    margin: 1em 0;
    border-top: 1px solid ${theme.secondaryColor};
    border-bottom: 1px solid ${theme.secondaryColor};
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      padding: 1.25em 0;
    }
  `}
`;

const AboutApps = styled.div`
  margin-bottom: 1em;
  svg {
    height: 40px;
    margin: 0.5em 6px;
  }
`;

const AboutPatreon = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 1em 0;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      margin: 0.5em 0;
    }
  `}
`;

const PatreonStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const PatreonProgress = styled.div`
  ${({ theme }) => css`
    width: 300px;
    margin-bottom: 24px;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      width: 260px;
      margin-bottom: 16px;
    }
  `}
`;

const PatreonDescription = styled.div`
  ${({ theme }) => css`
    margin-top: 1.5em;
    font-size: 0.75em;
    font-weight: 400;
    text-align: center;
    color: ${theme.aboutVerseTextColor};
    max-width: 350px;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      font-size: 0.85em;
    }
  `}
`;

const PatronStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1em;
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  span {
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 400;
  }
`;

const AboutTechs = styled.div`
  ${({ theme }) => css`
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      color: ${theme.aboutVerseTextColor};
      font-weight: 400;
      font-size: 0.75em;
      text-transform: uppercase;
      margin-bottom: 0.75em;
    }
  `}
`;

const AboutTechsList = styled.ul`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1em;

  svg {
    height: 30px;
    object-fit: contain;
  }

  li {
    margin-bottom: 12px;
    padding: 0 3px;
    scale: 0.8;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

const PrivacyText = styled.div`
  ${({ theme }) => css`
    font-size: 1.1em;
    line-height: 1.6;

    h2 {
      font-size: 1em;
      font-weight: 700;
      margin-bottom: 1em;
    }
    p {
      font-size: 0.85em;
      margin-bottom: 1em;
    }
  `}
`;

export {
  AboutMain,
  AboutVerseText,
  AboutParagraph,
  AboutPatreon,
  AboutSocialAndApps,
  PatreonStats,
  PatronStat,
  AboutApps,
  PatreonDescription,
  AboutLogo,
  AboutTechs,
  AboutTechsList,
  PatreonProgress,
  PrivacyText,
};
