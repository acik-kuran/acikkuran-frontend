import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tippy";

import {
  Hidden,
  PageHeader,
  PageNumber,
  PageOriginal,
  PageOriginalContainer,
  PageOriginalSurah,
  PageOriginalVerse,
  PageSurahNames,
  Visible,
} from "@styles/page.style";
import { convertToArabicDigit } from "@utils/funcs";

const PageOriginalComponent = (props) => {
  const {
    pageVerses,
    page_id,
    selectedVerse,
    setSelectedVerse,
    setSelectedPageType,
    uniqueSurahs,
  } = props;

  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const { t } = useTranslation("common");

  return (
    <PageOriginal>
      <PageHeader>
        <PageSurahNames>
          <span>
            {uniqueSurahs.map((i, index) => (
              <React.Fragment key={i.id}>
                <Link href={`/[surah_id]`} as={`/${i.surah.id}`}>
                  {i.surah.name_original}
                </Link>
                {uniqueSurahs.length - 1 !== index && " / "}
              </React.Fragment>
            ))}
          </span>
        </PageSurahNames>
        <Hidden xs sm>
          <PageNumber>{convertToArabicDigit(page_id)}</PageNumber>
        </Hidden>
        <Visible xs sm md>
          <span onClick={() => setSelectedPageType("translation")}>
            {t("page__show_translations")}
          </span>
        </Visible>
      </PageHeader>
      <PageOriginalContainer>
        {pageVerses.map((verse, index) => {
          const verseTranscription = {
            tr: verse.transcription,
            en: verse.transcription_en,
          };
          return (
            <React.Fragment key={verse.id}>
              {verse.number === 1 && (
                <PageOriginalSurah first={index === 0} zeroExist={!!verse.zero}>
                  <h3>{verse.surah && verse.surah.name_original}</h3>
                  {verse.zero && <div>{verse.zero.verse}</div>}
                </PageOriginalSurah>
              )}
              <PageOriginalVerse
                key={verse.id}
                active={selectedVerse === verse.id}
                onMouseOver={() => setSelectedVerse(verse.id)}
                onMouseLeave={() => setSelectedVerse(null)}
              >
                <Tooltip
                  key={index}
                  tag="span"
                  interactive
                  html={
                    <div
                      style={{
                        padding: 10,
                        textAlign: "left",
                        overflowY: "auto",
                        maxHeight: 300,
                      }}
                    >
                      <React.Fragment>
                        {verseTranscription[locale]}
                      </React.Fragment>
                    </div>
                  }
                  theme="light"
                  position="bottom"
                  trigger="click"
                  animation="shift"
                  arrow={true}
                  duration="150"
                >
                  {verse.original}
                  <em>{convertToArabicDigit(verse.number)}</em>
                </Tooltip>
              </PageOriginalVerse>
            </React.Fragment>
          );
        })}
      </PageOriginalContainer>
    </PageOriginal>
  );
};

export default PageOriginalComponent;
