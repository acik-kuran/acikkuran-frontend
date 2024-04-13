import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiKeyboardLine,
} from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";

import Button from "@components/common/Button";
import LoadingBar from "@components/common/LoadingBar";
import Organization from "@components/common/Organization";
import Error from "@components/layout/Error";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import VerseExpand from "@components/ui/VerseExpand";
import { envInfoState } from "@recoil/atoms";
import { Content } from "@styles/global.style";
import {
  Col,
  Container,
  EmptySearchResult,
  LoadingSC,
  Row,
  SC,
  SearchDetail,
  SearchResult,
  Tab,
  TabList,
  TabPanel,
  TabText,
  Tabs,
} from "@styles/search.style";
import {
  SurahVerse,
  SurahVerseArabic,
  SurahVerseNumber,
  SurahVerseTranscription,
  SurahVerseTranslation,
} from "@styles/surah.style";
import theme from "@styles/theme";
import { initGA, logEvent, logPageView } from "@utils/analytics";
import { fetchJson, goToSurah, groupBy } from "@utils/funcs";
import languageAlternates from "@utils/languageAlternates";
import surahsData from "@utils/surahs";

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

const Search = (props) => {
  const {
    redirectRoute,
    status,
    errorCode,
    q,
    surahs,
    translations,
    totalPages,
    page,
    totalHits,
    locale,
  } = props;

  if (errorCode) {
    return <Error />;
  }

  const { t } = useTranslation("common");
  const router = useRouter();

  useEffect(() => {
    if (status === "redirect" && redirectRoute) {
      router.push(redirectRoute);
    }
  }, [status, redirectRoute]);

  const envInfo = useRecoilValue(envInfoState);

  const [translationsList, setTranslationsList] = React.useState(translations);
  const [nextPage, setNextPage] = React.useState(null);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    logEvent("env-info", envInfo || "web");
  }, [q]);

  const fetchData = async () => {
    const { data } = await fetchJson(
      `${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}&page=${nextPage}&lang=${locale}`
    );
    if (data.page < data.totalPages) {
      setNextPage(data.page + 1);
    } else {
      setNextPage(null);
    }
    setTranslationsList([...translationsList, ...groupBy(data.hits)]);
  };

  useEffect(() => {
    if (page < totalPages) {
      setNextPage(page + 1);
    } else {
      setNextPage(null);
    }
  }, [page, totalPages]);

  useEffect(() => {
    setTranslationsList(translations);
  }, [translations]);

  const [navWidth, setNavWidth] = useState(
    theme.awesomegrid.breakpoints.lg * 16
  );

  useEffect(() => {
    setNavWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const searchParam = useMemo(() => {
    return decodeURI(q).split("+").join(" ");
  });

  const getSurahsData = useMemo(() => {
    return surahsData(locale);
  }, []);

  return (
    <SC>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <NextSeo
        languageAlternates={languageAlternates(router)}
        noindex
        title={`${t("seo__search__title_prefix")}${q && searchParam} - ${t(
          "seo__base_title"
        )}`}
        openGraph={{
          type: "article",
          locale: locale,
          url: `${t("seo__base_url")}/seach?q=${q}`,
          title: `${t("seo__search__title_prefix")}${q && searchParam} - ${t(
            "seo__base_title"
          )}`,
        }}
      />
      <Organization />
      <Navbar>
        <div className="navbar-main-title">
          <Button
            type="text"
            onClick={() => {
              Router.back();
            }}
            aria-label={t("navigation__go_to_back")}
          >
            <RiArrowLeftLine />
          </Button>
          <h1 className="title">{t("search__results_title")}</h1>
        </div>
        <React.Fragment>
          <Selectbox
            instanceId="topbar__select-surah"
            className="topbar__select-surah"
            placeholder={t("selectbox__surah_placeholder")}
            isSearchable
            value={getSurahsData[0]}
            options={getSurahsData}
            onChange={(e) => goToSurah(e.value)}
            onChangeNative={(e) => goToSurah(e.target.value)}
            aria-label={t("selectbox__select_surah")}
          />
        </React.Fragment>
      </Navbar>
      <Content>
        <SearchDetail>
          <Container>
            {!redirectRoute && (
              <Row>
                <Col>
                  <Tabs defaultIndex={0}>
                    <TabList sticky={translationsList?.length}>
                      <Tab disabled={!translationsList?.length}>
                        <RiKeyboardLine />
                        <TabText>{q && searchParam}</TabText>
                      </Tab>
                      {totalHits > 0 && (
                        <SearchResult>
                          {t("search__results_with_count", { totalHits })}
                        </SearchResult>
                      )}
                    </TabList>

                    <TabPanel>
                      {surahs &&
                        surahs.map((surah, index) => {
                          const surahNames = {
                            tr: surah.names[0],
                            en: surah.names[1],
                            ar: surah.names[2],
                          };
                          return (
                            <React.Fragment key={index}>
                              <SurahVerse hideMarginBottom>
                                <SurahVerseNumber>
                                  <Link
                                    href={`/[surah_id]`}
                                    as={`/${surah.id}`}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: t("search__surah_line", {
                                          surah_id: surah.id,
                                          surah_name: surahNames[locale],
                                          surah_arabic: surahNames["ar"],
                                        }),
                                      }}
                                    />
                                  </Link>
                                </SurahVerseNumber>
                              </SurahVerse>
                            </React.Fragment>
                          );
                        })}

                      <InfiniteScroll
                        dataLength={translationsList?.length || 0}
                        next={fetchData}
                        hasMore={!!nextPage}
                        loader={<LoadingBar />}
                      >
                        {!translationsList?.length && (
                          <EmptySearchResult>
                            <img
                              src={`/locales/${locale}/images/manifest/apple-touch-icon.png`}
                              alt={t("seo__base_title")}
                              width={36}
                              height={36}
                            />
                            {t("search__no_results")}
                          </EmptySearchResult>
                        )}
                        {translationsList &&
                          translationsList.map((groupTranslation, index) => {
                            let translation = groupTranslation?.[0];

                            const surahNames = {
                              tr: translation.surah.name,
                              en: translation.surah.name_en,
                            };
                            return (
                              <React.Fragment key={index}>
                                {translation && (
                                  <SurahVerse>
                                    <SurahVerseNumber>
                                      <Link
                                        href={`/[surah_id]/[verse_number]`}
                                        as={`/${translation.surah.id}/${translation.verse.verse_number}`}
                                      >
                                        <div>
                                          {surahNames[locale]} /{" "}
                                          {translation.surah.id}:
                                          {translation.verse.verse_number}
                                        </div>
                                        <RiArrowRightSLine />
                                        <em>{translation.author.name}</em>
                                      </Link>
                                    </SurahVerseNumber>
                                    <SurahVerseTranslation>
                                      <VerseExpand
                                        showFootnotes={false}
                                        translation={translation}
                                      />
                                    </SurahVerseTranslation>
                                    <SurahVerseArabic
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          translation?._formatted?.verse
                                            ?.verse || verse.verse,
                                      }}
                                    ></SurahVerseArabic>
                                    <SurahVerseTranscription
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          translation?._formatted?.verse
                                            ?.transcription ||
                                          verse.transcription,
                                      }}
                                    ></SurahVerseTranscription>
                                  </SurahVerse>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </InfiniteScroll>
                    </TabPanel>
                  </Tabs>
                  {navWidth >= theme.awesomegrid.breakpoints.sm * 16 && (
                    <Footer home />
                  )}
                </Col>
              </Row>
            )}
            {redirectRoute && (
              <Row>
                <LoadingSC></LoadingSC>
              </Row>
            )}
          </Container>
        </SearchDetail>
      </Content>
    </SC>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const q = query?.q;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}&lang=${locale}`
  );
  const { data } = await res.json();

  if (data && data.redirect && data.route) {
    return {
      props: {
        status: "redirect",
        redirectRoute: `${data.redirect}`,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  if (data && !data.error) {
    return {
      props: {
        locale,
        q: q,
        redirect: data.redirect || null,
        error: data.error || null,
        surahs: data.surahs || [],
        translations: groupBy(data.hits) || [],
        totalPages: data.totalPages || 0,
        page: data.page || 1,
        totalHits: data.totalHits || 0,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } else {
    return {
      props: {
        errorCode: 404,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
}

export default Search;
