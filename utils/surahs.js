import surahsEn from "@data/surahsEn";
import surahsTr from "@data/surahsTr";

export default (lang) => {
  const surahList = {
    tr: surahsTr,
    en: surahsEn,
  };
  return surahList[lang || "tr"];
};
