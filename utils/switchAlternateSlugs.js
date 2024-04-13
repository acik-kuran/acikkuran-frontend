import localeVerseSlugs, {
  verseNumberRegexPattern,
} from "@utils/localeVerseSlugs";
import surahs from "@utils/surahs";

export default (asPath, query, locale) => {
  if (asPath.includes("-suresi") || asPath.includes("surah-")) {
    const otherLocale = locale === "tr" ? "en" : "tr";
    const surah_id = surahs(locale).find(
      (s) => s.slug === query.surah_id
    )?.value;

    const surahSlug = surahs(otherLocale).find(
      (s) => s.value === surah_id
    )?.slug;

    if (asPath.includes("verse-") || asPath.includes("-ayet-meali")) {
      const verse_id = query.verse_number.match(
        verseNumberRegexPattern(locale)
      )?.[1];

      if (surah_id && verse_id) {
        const verseSlug = localeVerseSlugs(verse_id)[otherLocale];
        return `/${surahSlug}/${verseSlug}`;
      }
    } else {
      return `/${surahSlug}`;
    }
  }
  return asPath;
};
