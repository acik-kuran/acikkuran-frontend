export default (verseNumber) => {
  return { tr: `${verseNumber}-ayet-meali`, en: `verse-${verseNumber}` };
};

const localeVerseSlugRegexes = {
  tr: "^(\\d+)-ayet-meali$",
  en: "^verse-(\\d+)$",
};

const verseNumberRegexPattern = (locale) => localeVerseSlugRegexes[locale];
export { verseNumberRegexPattern };
