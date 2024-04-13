import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  RiBook3Line,
  RiCloseFill,
  RiFingerprintFill,
  RiGitMergeLine,
  RiSearchLine,
} from "react-icons/ri";
import { useRecoilValue } from "recoil";

import Button from "@components/common/Button";
import {
  SearchAllLine,
  SurahLine,
  TranslationLine,
  VerseLine,
} from "@components/ui/SearchLines";
import juzNumbers from "@data/juzNumbers";
import rootchars from "@data/rootchars";
import { envInfoState } from "@recoil/atoms";
import theme from "@styles/theme";
import { logEvent } from "@utils/analytics";
import {
  getQuickRandom,
  getQuickSearch,
  goToPage,
  goToRoot,
  goToSurah,
} from "@utils/funcs";
import { containerMotion, itemMotion } from "@utils/motions";
import surahs from "@utils/surahs";
import useDebounce from "@utils/useDebounce";

import {
  CloseModal,
  Navigation,
  Results,
  SC,
  SearchArea,
  SearchInput,
  SearchResults,
} from "./DesktopSearch.style";

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
});

const desktopSearch = (props) => {
  const { setShowSearch, setShowMobile, hideCloseButton, indexPage } = props;
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const envInfo = useRecoilValue(envInfoState);
  const router = useRouter();
  const { t } = useTranslation("common");

  const inputEl = useRef(null);
  const [searchParam, setSearchParam] = useState("");
  const [selection, setSelection] = useState(null);
  const [quickSearchResult, setQuickSearchResult] = useState([]);

  const [showResults, setShowResults] = useState(false);
  const [navWidth, setNavWidth] = useState(null);

  useEffect(() => {
    if (envInfo) {
      logEvent("env-info", envInfo);
      if (envInfo === "ios" || envInfo === "android") {
        // setHideAppBadges(true);
      }
    }
  }, [envInfo]);

  const normalizeSearchParam = (searchParam) => {
    let value = searchParam.split(" ").join("+");
    value = value.replace("/", ":");
    return value;
  };

  const searchSubmit = () => {
    if (searchParam.length > 2 || (+searchParam > 0 && +searchParam <= 114)) {
      router.push(
        `/search?q=${normalizeSearchParam(searchParam)}`,
        `/search?q=${normalizeSearchParam(searchParam)}`,
        {
          locale,
        }
      );
      setShowSearch && setShowSearch(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      searchSubmit();
    }
  };

  /* ----------------------------------- */
  /* ---------- QUICK SERCH -------------*/

  const debouncedSearchParam = useDebounce(searchParam, 100);

  const getSearch = async (query) => {
    const result = await getQuickSearch(query, locale);
    setQuickSearchResult(result);
  };

  const getRandom = async () => {
    const result = await getQuickRandom(locale);
    setQuickSearchResult(result);
  };

  useEffect(() => {
    if (quickSearchResult && quickSearchResult.length) {
      setShowResults(true);
    }
  }, [quickSearchResult]);

  useEffect(() => {
    if (debouncedSearchParam) {
      getSearch(debouncedSearchParam);
    }
    if (debouncedSearchParam.length === 0) {
      setShowResults(false);
    }
  }, [debouncedSearchParam]);

  useEffect(() => {
    if (navWidth) {
      navWidth >= theme.awesomegrid.breakpoints.sm * 16 &&
        hideCloseButton &&
        quickSearchResult.length === 0 &&
        getRandom();
    }
  }, [navWidth]);

  useEffect(() => {
    navWidth >= theme.awesomegrid.breakpoints.sm * 16 &&
      hideCloseButton &&
      quickSearchResult.length > 0 &&
      getRandom();
  }, []);

  /* ----------------------------------- */
  /* ----------- ROOT SEARCH -------------*/

  const [rootChar, setRootChar] = useState(null);
  const [roots, setRoots] = useState([]);

  const fetchRootcharRoots = async (value) => {
    setRootChar(value);
    setRoots(null);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rootchar/${value}`
    );
    const { data } = await res.json();
    const $roots = [];
    data.map((x) => {
      return $roots.push({
        value: x.latin,
        label: `${x.arabic} (${x.latin})`,
      });
    });
    setRoots($roots);
  };

  /* ----------------------------------- */

  useEffect(() => {
    setNavWidth(window.innerWidth);
    setSelection(
      window.innerWidth >= theme.awesomegrid.breakpoints.sm * 16 &&
        hideCloseButton
        ? null // 'surah'
        : null
    );
    if (!hideCloseButton) {
      inputEl.current.focus();
    }
  }, [hideCloseButton]);

  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
      setSelection(
        window.innerWidth >= theme.awesomegrid.breakpoints.sm * 16 &&
          hideCloseButton
          ? null // 'surah'
          : null
      );
    };
    window.addEventListener("resize", handleResize);
  });

  const getPageOptions = useMemo(() => {
    const pageOptions = [];
    pageOptions.push({ value: 0, label: t("page__opening") });
    for (let i = 1; i < 605; i++) {
      pageOptions.push({
        value: i,
        label: t("page__page_info", { page_id: i }),
      });
    }
    return pageOptions;
  });

  const getJuzOptions = useMemo(() => {
    const juzOptions = [];
    juzNumbers.forEach((i, index) => {
      juzOptions.push({
        value: i.value,
        label: t("page__juz_info", { juz_id: index + 1 }),
      });
    });
    return juzOptions;
  });

  return (
    <React.Fragment>
      <SC indexPage={indexPage}>
        {!hideCloseButton && (
          <CloseModal>
            <RiCloseFill
              onClick={() => setShowSearch(false)}
              aria-label={t("search__close_button")}
            />
            <span>ESC</span>
          </CloseModal>
        )}

        <SearchArea showResults={showResults}>
          <SearchInput
            id="search"
            showResults={showResults}
            placeholder={t("search_placeholder")}
            ref={inputEl}
            onClick={() => {
              navWidth < theme.awesomegrid.breakpoints.sm * 16 &&
                setShowMobile(true);
            }}
            onChange={(e) => setSearchParam(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
          />

          <Navigation>
            {searchParam && (
              <Button
                type="text"
                onClick={() => searchSubmit()}
                tabIndex="0"
                aria-label={t("search_placeholder")}
              >
                <RiSearchLine className="navigation__icon" />
              </Button>
            )}
            {!selection && (
              <React.Fragment>
                <Button
                  tabIndex="0"
                  type="text"
                  onClick={() => setSelection("page")}
                  aria-label={t("search__page_button")}
                >
                  <RiBook3Line className="navigation__icon"></RiBook3Line>
                </Button>
                <Button
                  tabIndex="0"
                  type="text"
                  onClick={() => setSelection("surah")}
                  aria-label={t("search__surah_button")}
                >
                  <RiFingerprintFill className="navigation__icon" />
                </Button>
                <Button
                  tabIndex="0"
                  type="text"
                  onClick={() => setSelection("root")}
                  aria-label={t("search__root_button")}
                >
                  <RiGitMergeLine className="navigation__icon" />
                </Button>
              </React.Fragment>
            )}
            {selection === "page" && (
              <React.Fragment>
                <Selectbox
                  className="desktop-search__juz"
                  instanceId="desktop-search__juz"
                  placeholder={t("selectbox__select_juz")}
                  isSearchable
                  options={getJuzOptions}
                  onChange={(e) => {
                    goToPage(e.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  onChangeNative={(e) => {
                    goToPage(e.target.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  aria-label={t("selectbox__select_juz")}
                />
                <Selectbox
                  className="desktop-search__page"
                  instanceId="desktop-search__page"
                  placeholder={t("selectbox__select_page")}
                  isSearchable
                  options={getPageOptions}
                  onChange={(e) => {
                    goToPage(e.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  onChangeNative={(e) => {
                    goToPage(e.target.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  aria-label={t("selectbox__select_page")}
                />
                <Button
                  type="text"
                  onClick={() => setSelection(null)}
                  aria-label={t("search__close_button_arialabel")}
                >
                  <RiCloseFill className="navigation__icon"></RiCloseFill>
                </Button>
              </React.Fragment>
            )}
            {selection === "root" && (
              <React.Fragment>
                <div className="desktop-search__root">
                  {rootchars && (
                    <Selectbox
                      instanceId="desktop-search__select-rootchar"
                      className="desktop-search__select-rootchar"
                      placeholder={t("selectbox__rootchar_placeholder")}
                      isSearchable
                      value={rootchars[rootChar - 1]}
                      options={rootchars}
                      onChange={(e) => fetchRootcharRoots(e.value)}
                      onChangeNative={(e) => fetchRootcharRoots(e.target.value)}
                      aria-label={t("selectbox__select_rootchar")}
                    />
                  )}
                  {roots && (
                    <Selectbox
                      className="desktop-search__select-root"
                      placeholder={t("selectbox__root_placeholder")}
                      isDisabled={!(roots.length > 0)}
                      isSearchable
                      options={roots}
                      onChange={(e) => {
                        goToRoot(e.value);
                        setShowSearch && setShowSearch(false);
                      }}
                      onChangeNative={(e) => {
                        goToRoot(e.target.value);
                        setShowSearch && setShowSearch(false);
                      }}
                      aria-label={t("selectbox__select_root")}
                    />
                  )}
                </div>
                <Button
                  type="text"
                  onClick={() => setSelection(null)}
                  aria-label={t("search__close_button_arialabel")}
                >
                  <RiCloseFill className="navigation__icon"></RiCloseFill>
                </Button>
              </React.Fragment>
            )}
            {selection === "surah" && (
              <div className="desktop-search__surah">
                <Selectbox
                  instanceId="desktop-search__select-surah"
                  className="desktop-search__select-surah"
                  placeholder={t("selectbox__surah_placeholder")}
                  isSearchable
                  options={surahs(locale)}
                  onChange={(e) => {
                    goToSurah(e.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  onChangeNative={(e) => {
                    goToSurah(e.target.value);
                    setShowSearch && setShowSearch(false);
                  }}
                  aria-label={t("selectbox__select_surah")}
                />
                <Button
                  type="text"
                  onClick={() => setSelection(null)}
                  aria-label={t("search__close_button_arialabel")}
                >
                  <RiCloseFill className="navigation__icon"></RiCloseFill>
                </Button>
              </div>
            )}
          </Navigation>
        </SearchArea>
        {showResults && (
          <Results>
            <SearchResults>
              {searchParam &&
                searchParam.length > 2 &&
                quickSearchResult &&
                quickSearchResult.length > 0 && (
                  <SearchAllLine
                    searchParam={normalizeSearchParam(searchParam)}
                    setShowSearch={setShowSearch}
                  ></SearchAllLine>
                )}
              <motion.ul
                variants={containerMotion}
                initial="hidden"
                animate="show"
              >
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
          </Results>
        )}
      </SC>
    </React.Fragment>
  );
};

export default desktopSearch;
