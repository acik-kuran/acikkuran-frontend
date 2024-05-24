import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  RiFingerprintFill,
  RiQuillPenLine,
  RiSearchLine,
  RiShuffleLine,
  RiWindyLine,
} from "react-icons/ri";

import VerseExpand from "@components/ui/VerseExpand";
import { SearchBoxSC } from "@styles/search.style";

const locale = process.env.NEXT_PUBLIC_LOCALE;

export const ShowRandomVersesLine = () => {
  const { t } = useTranslation("common");
  return (
    <SearchBoxSC className="show-random-verses">
      <div className="line-icon line-icon__random">
        <RiShuffleLine />
      </div>
      <div className="line-content">
        <h3>{t("search__random_verse_info")}</h3>
      </div>
    </SearchBoxSC>
  );
};

export const SearchAllLine = (props) => {
  const { searchParam, setShowSearch } = props;
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <SearchBoxSC
      className="search-all"
      onClick={() => {
        setShowSearch && setShowSearch(false);
      }}
    >
      <a
        onClick={() =>
          router.push(`/search?q=${searchParam}`, `/search?q=${searchParam}`)
        }
      >
        <div className="line-icon line-icon__surah">
          <RiSearchLine />
        </div>
        <div className="line-content">
          <h4>
            {t("search__all_results_with_query", {
              searchParam: decodeURI(searchParam).split("+").join(" "),
            })}
          </h4>
        </div>
      </a>
    </SearchBoxSC>
  );
};

export const SurahLine = (props) => {
  const { id, names, setShowSearch } = props;
  const { t } = useTranslation("common");

  const surahNameIndex = locale === "tr" ? 0 : 1;
  return (
    <SearchBoxSC
      onClick={() => {
        setShowSearch && setShowSearch(false);
      }}
    >
      <Link href={`/[surah_id]`} as={`/${id}`}>
        <div className="line-icon line-icon__surah">
          <RiFingerprintFill />
        </div>
        <div className="line-content">
          <h3
            dangerouslySetInnerHTML={{
              __html: t("search__surah_line", {
                surah_id: id,
                surah_name: names[surahNameIndex],
                surah_arabic: names[2],
              }),
            }}
          ></h3>
        </div>
      </Link>
    </SearchBoxSC>
  );
};

export const VerseLine = (props) => {
  const { surah_id, surah_name, verse_number, setShowSearch } = props;
  const { t } = useTranslation("common");
  return (
    <SearchBoxSC
      onClick={() => {
        setShowSearch && setShowSearch(false);
      }}
    >
      <Link
        href={`/[surah_id]/[verse_number]`}
        as={`/${surah_id}/${verse_number}`}
      >
        <div className="line-icon line-icon__surah">
          <RiWindyLine />
        </div>
        <div className="line-content">
          <h3>
            {t("search__translation_verse_line", {
              surah_id,
              surah_name,
              verse_number,
            })}
          </h3>
        </div>
      </Link>
    </SearchBoxSC>
  );
};

export const TranslationLine = (props) => {
  const { surah, verse, setShowSearch, searchParam } = props;
  const { t } = useTranslation("common");

  const surahNames = {
    tr: surah.name,
    en: surah.name_en,
  };

  return (
    <SearchBoxSC
      onClick={() => {
        setShowSearch && setShowSearch(false);
      }}
    >
      <Link
        href={`/[surah_id]/[verse_number]`}
        as={`/${surah.id}/${verse.verse_number}`}
      >
        <div className="line-icon">
          <RiQuillPenLine />
        </div>
        <div className="line-content">
          <h3>
            {t("search__translation_verse_line", {
              surah_id: surah.id,
              surah_name: surahNames[locale],
              verse_number: verse.verse_number,
            })}
          </h3>
          <VerseExpand
            translation={props}
            highlight={searchParam}
            showFootnotes={false}
          />
          {props?._formatted?.verse?.transcription.includes("<em>") && (
            <div
              className="line-transcription"
              dangerouslySetInnerHTML={{
                __html: props?._formatted?.verse?.transcription,
              }}
            />
          )}
          {props?._formatted?.verse?.verse.includes("<em>") && (
            <div
              className="line-verse"
              dangerouslySetInnerHTML={{
                __html: props?._formatted?.verse?.verse,
              }}
            />
          )}
        </div>
      </Link>
    </SearchBoxSC>
  );
};
