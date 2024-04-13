import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { RiShareForwardLine } from "react-icons/ri";

import VerseExpand from "@components/ui/VerseExpand";
import {
  Hidden,
  PageHeader,
  PageNumber,
  PageSurahNames,
  PageTranslation,
  PageTranslationSurah,
  PageTranslationVerse,
  Visible,
} from "@styles/page.style";

const PageTranslationComponent = (props) => {
  const {
    pageVerses,
    page_id,
    selectedVerse,
    setSelectedVerse,
    setSelectedPageType,
    uniqueSurahs,
  } = props;
  const { t } = useTranslation("common");
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  return (
    <PageTranslation>
      <PageHeader>
        <Hidden xs sm md>
          <PageNumber>
            {page_id === 0 ? t("page__opening") : page_id}
          </PageNumber>
        </Hidden>
        <Visible xs sm md>
          <span onClick={() => setSelectedPageType("original")}>
            {t("page__show_original")}
          </span>
        </Visible>
        <PageSurahNames>
          <span>
            {uniqueSurahs.map((i, index) => {
              const surahNames = {
                tr: i.surah.name,
                en: i.surah.name_en,
              };
              const surahName = surahNames[locale];
              return (
                <React.Fragment key={i.id}>
                  <Link href={`/[surah_id]`} as={`/${i.surah.id}`}>
                    {i.surah.id}. {surahName}
                  </Link>
                  {uniqueSurahs.length - 1 !== index && " / "}
                </React.Fragment>
              );
            })}
          </span>
        </PageSurahNames>
      </PageHeader>
      {pageVerses.map((verse, index) => {
        const surahNames = {
          tr: verse.surah.name,
          en: verse.surah.name_en,
        };
        const surahName = surahNames[locale];
        return (
          <React.Fragment key={index}>
            {verse.number === 1 && (
              <PageTranslationSurah
                first={index === 0}
                zeroExist={!!verse.zero}
              >
                <h3>
                  {t("page__surah_title", {
                    surah_id: verse.surah.id,
                    surah_name: surahName,
                  })}
                </h3>
                {verse.zero && <div>{verse.zero.translation.text}</div>}
              </PageTranslationSurah>
            )}

            <PageTranslationVerse
              key={verse.id}
              active={selectedVerse === verse.id}
              onMouseOver={() => setSelectedVerse(verse.id)}
              onMouseLeave={() => setSelectedVerse(null)}
            >
              <strong>{verse.number}.</strong>{" "}
              <VerseExpand
                translation={verse.translation}
                showFootnotes={false}
              />
              <Link
                href={`/[surah_id]/[verse_number]`}
                as={`/${verse.surah.id}/${verse.number}`}
              >
                <RiShareForwardLine />
              </Link>
            </PageTranslationVerse>
          </React.Fragment>
        );
      })}
    </PageTranslation>
  );
};

export default PageTranslationComponent;
