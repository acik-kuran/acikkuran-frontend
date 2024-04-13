import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

import {
  SearchAllLine,
  ShowRandomVersesLine,
  SurahLine,
  TranslationLine,
  VerseLine,
} from "@components/ui/SearchLines";
import { getQuickRandom, getQuickSearch } from "@utils/funcs";
import { containerMotion, itemMotion } from "@utils/motions";
import useDebounce from "@utils/useDebounce";

import {
  Results,
  SC,
  SearchArea,
  SearchInput,
  SearchResults,
} from "./MobileSearch.style";

const mobileSearch = (props) => {
  const { setShowSearch, setShowMobile } = props;
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const [searchParam, setSearchParam] = useState("");
  const [quickSearchResult, setQuickSearchResult] = useState();
  const inputRef = useRef();

  const router = useRouter();
  const { t } = useTranslation("common");

  const onBackButtonEvent = () => {
    setShowSearch && setShowSearch(false);
    setShowMobile && setShowMobile(false);
    window.removeEventListener("popstate", onBackButtonEvent);
  };

  useEffect(() => {
    inputRef.current.focus();
    window.history.pushState("", "", window.href);
    window.addEventListener("popstate", onBackButtonEvent);
    () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const normalizeSearchParam = (searchParam) => {
    let value = searchParam.split(" ").join("+");
    value = value.replace("/", ":");
    return value;
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(
        `/search?q=${normalizeSearchParam(searchParam)}`,
        `/search?q=${normalizeSearchParam(searchParam)}`,
        {
          locale,
        }
      );
      setShowSearch && setShowSearch(false);
      setShowMobile && setShowMobile(false);
    }
  };

  /* ----------------------------------- */
  /* ---------- QUICK SERCH -------------*/

  const debouncedSearchParam = useDebounce(searchParam, 500);

  const getSearch = async (query) => {
    const result = await getQuickSearch(query, locale);
    setQuickSearchResult(result);
  };

  const getRandom = async () => {
    const result = await getQuickRandom(locale);
    setQuickSearchResult(result);
  };

  useEffect(() => {
    if (debouncedSearchParam) {
      getSearch(debouncedSearchParam);
    }
    if (debouncedSearchParam.length === 0) {
      setQuickSearchResult();
    }

    (!searchParam || searchParam === "") && getRandom();
  }, [debouncedSearchParam]);

  /* ----------------------------------- */

  return (
    <React.Fragment>
      <SC>
        <SearchArea>
          <RiArrowLeftLine
            onClick={() => {
              setShowSearch && setShowSearch(false);
              setShowMobile && setShowMobile(false);
            }}
          />
          <SearchInput
            ref={inputRef}
            placeholder={t("search_placeholder")}
            onChange={(e) => setSearchParam(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            type="search"
          />
        </SearchArea>

        <Results>
          {quickSearchResult && (
            <SearchResults>
              <motion.ul
                variants={containerMotion}
                initial="hidden"
                animate="show"
              >
                {searchParam &&
                  searchParam.length > 2 &&
                  quickSearchResult &&
                  quickSearchResult.length > 0 && (
                    <motion.li variants={itemMotion}>
                      <SearchAllLine
                        searchParam={normalizeSearchParam(searchParam)}
                        setShowSearch={setShowSearch}
                      ></SearchAllLine>
                    </motion.li>
                  )}
                {!searchParam && (
                  <motion.li variants={itemMotion}>
                    <ShowRandomVersesLine />
                  </motion.li>
                )}
                {quickSearchResult.map((i, index) => (
                  <motion.li variants={itemMotion} key={index}>
                    {i.type === "surah" && (
                      <SurahLine setShowSearch={setShowSearch} {...i} />
                    )}
                    {i.type === "verse" && (
                      <VerseLine
                        setShowSearch={setShowSearch}
                        searchParam={searchParam}
                        {...i}
                      />
                    )}
                    {i.type === "hits" && (
                      <TranslationLine
                        setShowSearch={setShowSearch}
                        searchParam={searchParam}
                        {...i}
                      />
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </SearchResults>
          )}
        </Results>
      </SC>
    </React.Fragment>
  );
};

export default mobileSearch;
