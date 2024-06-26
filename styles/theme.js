const awesomegrid = {
  mediaQuery: "only screen",
  columns: {
    xs: 12,
    xsm: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  },
  gutterWidth: {
    xs: 1,
    xsm: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  paddingWidth: {
    xs: 1,
    xsm: 1,
    sm: 1,
    md: 1.5,
    lg: 1.5,
    xl: 1.5,
  },
  container: {
    xs: "full",
    xsm: "full",
    sm: "full",
    md: "full",
    lg: 90, // max-width: 1440px
    xl: 90, // max-width: 1440px
  },
  breakpoints: {
    xs: 20, // 320px
    xsm: 26, // 416px
    sm: 48, // 768px
    md: 64, // 1024px
    lg: 90, // 1440px
    xl: 120, // 1920px
  },
};

const theme = {
  awesomegrid,
};

const sizes = {
  xs: "20em",
  xsm: "26em",
  sm: "48em",
  md: "64em",
  lg: "90em",
  xl: "120em",
};

export const lightTheme = {
  theme: "light",
  bodyBackground: "#FFF",
  inputBackground: "#FFF",
  primaryTextColor: "#3a3a3a",
  borderColor: "#ededed",
  helperBackground: "#faebcc",
  pearlYellow: "#fcf8e3",
  linkColor: "green",
  smokeBackground: "#f4f4f4",
  primaryDark: "#363636",
  neutralDark: "#565656",
  secondaryColor: "#e4e4e4",
  thirdColor: "#f5f5f5",
  borderHover: "#b5b5b5",
  zebra: "#000",
  faint: "#999",
  formInputBorder: "0 0 0",
  formInputBorderSecondary: "60 66 87",
  streakAreaColor: "#fff",
  streakAreaBackground: "rgba(0, 0, 0, 0.36)",
  streakAreaBackgroundMobile: "rgba(0, 0, 0, 0.52)",
  selectBoxFocusedBorderColor: "#3273dc",
  selectBoxUnfocusedBorderColor: "#eeeeef",
  selectBoxShadow: "0 0 0 0.125em rgba(50, 115, 220, 0.25)",
  selectBoxBgColor: "#FFF",
  selectBoxColor: "#3a3a3a",
  selectBoxHoveredBgColor: "#eeeeef",
  nprogressBackgroundColor: "rgba(255, 255, 255, 0.9)",
  lineBorderBottomColor: "#e4e4e4",
  tooltipBackgroundColor: "#fff",
  desktopSearchBackgroundColor: "rgba(0, 0, 0, 0.4)",
  buttonBgColor: "#000",
  buttonDisabledBgColor: "lightgray",
  searchAreaBoxShadow: "0 -27px 46px 39px rgb(0 0 0 / 8%) !important;",
  searchAreaInputShadow: "0 -27px 46px 39px rgb(0 0 0 / 8%) !important;",
  searchInputMobileBgColor: "#FFF",
  aboutVerseTextColor: "#969696",
  verseMainAuthorTetColor: "#767676",
  chartBackgroundColor: "#f9f9f9",
  chartBarColor: "#4ECDC4",
  chartLoadingBackgroundColor: "#f3f3f3",
  chartLoadingForegroundColor: "#e3e3e3",
  searchBorderColor: "#ededed",
  localeButtonTextColor: "#fff",
  localeButtonBackground: "#3a3a3a",
  localeButtonTextColorHover: "#fff",
  localeButtonBackgroundHover: "green",
  localeButtonHomeTextColor: "#3a3a3a",
  localeButtonHomeBackground: "#fff",
  localeButtonHomeTextColorHover: "#fff",
  localeButtonHomeBackgroundHover: "#3a3a3a",
  localeTooltipTextColor: "#f5f5f5",
  localeTooltipBackground: "#3a3a3a",
  awesomegrid,
  sizes,
};
export const darkTheme = {
  theme: "dark",
  bodyBackground: "#202124",
  inputBackground: "#30373d",
  primaryTextColor: "#b2b2b2",
  borderColor: "#202322",
  helperBackground: "#1a5962",
  pearlYellow: "#353a41",
  linkColor: "#719aa1",
  smokeBackground: "#2e313b",
  primaryDark: "#b2b2b2",
  neutralDark: "#d2d2d2",
  secondaryColor: "#30363d",
  thirdColor: "#2e313b",
  borderHover: "#b5b5b5",
  zebra: "#fff",
  faint: "#444f5b",
  formInputBorder: "255 255 255",
  formInputBorderSecondary: "60 66 87",
  streakAreaColor: "#a3a9af",
  streakAreaBackground: "rgba(0, 0, 0, 0.4)",
  streakAreaBackgroundMobile: "rgba(0, 0, 0, 0.60)",
  selectBoxFocusedBorderColor: "#3273dc",
  selectBoxUnfocusedBorderColor: "#30363d",
  selectBoxShadow: "0 0 0 0.125em rgba(50, 115, 220, 0.25)",
  selectBoxBgColor: "#202124",
  selectBoxColor: "#FFF",
  selectBoxHoveredBgColor: "#30363d",
  nprogressBackgroundColor: "rgba(0, 0, 0, 0.5)",
  lineBorderBottomColor: "#30363d",
  tooltipBackgroundColor: "#a3a9af",
  desktopSearchBackgroundColor: "rgba(0, 0, 0, 0.8)",
  buttonBgColor: "#719aa1",
  buttonDisabledBgColor: "gray",
  searchAreaBoxShadow: "0 20px 24px 20px rgb(30 30 30 / 40%) !important;",
  searchAreaInputShadow: "0 0px 10px 10px rgb(30 30 30 / 40%) !important;",
  searchInputMobileBgColor: "#171717",
  aboutVerseTextColor: "#7a7a7a",
  verseMainAuthorTetColor: "#7a7a7a",
  chartBackgroundColor: "#292a2e",
  chartBarColor: "#4ECDC4",
  chartLoadingBackgroundColor: "#292a2e",
  chartLoadingForegroundColor: "#34353b",
  searchBorderColor: "#444",
  localeButtonTextColor: "#3a3a3a",
  localeButtonBackground: "#b2b2b2",
  localeButtonTextColorHover: "#fff",
  localeButtonBackgroundHover: "#719aa1",
  localeButtonHomeTextColor: "#3a3a3a",
  localeButtonHomeBackground: "#fff",
  localeButtonHomeTextColorHover: "#fff",
  localeButtonHomeBackgroundHover: "#719aa1",
  localeTooltipTextColor: "#3a3a3a",
  localeTooltipBackground: "#f5f5f5",
  awesomegrid,
  sizes,
};

export default theme;
