import parse from "html-react-parser";
import sessionCookieControl from "lib/sessionCookieControl";
import { getServerSession } from "next-auth";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiGitMergeLine,
} from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilValue } from "recoil";

import { authOptions } from "@auth/[...nextauth]";
import Button from "@components/common/Button";
import LoadingBar from "@components/common/LoadingBar";
import Organization from "@components/common/Organization";
import Error from "@components/layout/Error";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import VerseExpand from "@components/ui/VerseExpand";
import rootchars from "@data/rootchars";
import { envInfoState } from "@recoil/atoms";
import { Content } from "@styles/global.style";
import {
  Col,
  Container,
  EmptyVersesData,
  RootDetail,
  RootMain,
  RootTitleArabic,
  RootTitleTranscription,
  RootVerse,
  RootVerseArabic,
  RootVerseDetail,
  RootVerseOption,
  RootVerseTag,
  RootVerseTags,
  RootVerseTitle,
  RootVerseTop,
  RootVerseTranscription,
  RootVerseTranslation,
  RootVerses,
  Row,
  SC,
  Tab,
  TabList,
  TabPanel,
  TabText,
  Tabs,
} from "@styles/root.style";
import theme from "@styles/theme";
import { initGA, logEvent, logPageView } from "@utils/analytics";
import { fetchJson, goToRoot } from "@utils/funcs";
import languageAlternates from "@utils/languageAlternates";

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

const Root = (props) => {
  const { errorCode, root, authorId, locale } = props;
  if (errorCode) {
    return <Error />;
  }
  const router = useRouter();
  const { t } = useTranslation("common");

  const envInfo = useRecoilValue(envInfoState);

  const [showVerses, setShowVerses] = useState([]);
  const [versesData, setVersesData] = useState([]);
  const [versesLinkNext, setVersesLinkNext] = useState();
  const [roots, setRoots] = useState([]);
  const [rootChar, setRootChar] = useState(root.rootchar_id);
  const [loading, setLoading] = useState(true);

  const [navWidth, setNavWidth] = useState(theme.awesomegrid.bp.lg * 16);

  const toggleVerse = (id) => {
    if (!showVerses.find((i) => i === id)) {
      setShowVerses([...showVerses, id]);
    } else {
      setShowVerses(showVerses.filter((i) => i !== id));
    }
  };

  const fetchFilters = async (latin) => {
    setLoading(true);

    const { data: rootVersesData, links: rootVersesLinks } = await fetchJson(
      `${process.env.NEXT_PUBLIC_API_URL}/root/latin/${latin}/verseparts?author=${authorId}`
    );
    setVersesData(rootVersesData);
    setVersesLinkNext(
      rootVersesLinks.next
        ? `${process.env.NEXT_PUBLIC_API_URL}${rootVersesLinks.next}`
        : null
    );
    setLoading(false);
  };

  useEffect(() => {
    if (router?.query?.latin) {
      fetchFilters(router.query.latin);
    }
  }, [router]);

  const fetchRootcharRoots = async (value) => {
    setRootChar(value);
    setRoots(null);
    const { data } = await fetchJson(
      `${process.env.NEXT_PUBLIC_API_URL}/rootchar/${value}`
    );
    const $roots = [];
    data.map((x) => {
      return $roots.push({
        value: x.latin,
        label: `${x.arabic} (${x.latin})`,
      });
    });
    setRoots($roots);
  };

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    logEvent("env-info", envInfo || "web");
  }, [root]);

  useEffect(() => {
    fetchRootcharRoots(rootChar);
  }, []);

  const fetchData = async () => {
    const { data, links } = await fetchJson(versesLinkNext);
    const newVersesData = [...versesData, ...data];
    setVersesLinkNext(
      links.next ? `${process.env.NEXT_PUBLIC_API_URL}${links.next}` : null
    );
    setVersesData(newVersesData);
  };

  useEffect(() => {
    setNavWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const computedMean = useMemo(() => {
    const means = {
      tr: root.mean,
      en: root.mean_en,
    };
    return parse(means[locale]);
  }, [root]);

  const computedTranscription = useMemo(() => {
    const transcriptions = {
      tr: root.transcription,
      en: root.transcription_en,
    };
    return parse(transcriptions[locale]);
  }, [root]);

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
        title={`${computedTranscription} / ${root.arabic} - ${t(
          "seo__base_title"
        )}`}
        description={t("seo__root__desc", {
          transcription: computedTranscription,
          arabic: root.arabic,
        })}
        openGraph={{
          locale: locale,
          type: "article",
          url: `${t("seo__base_url")}/root/${root.latin}`,
          title: `${t("seo__root__desc", {
            transcription: computedTranscription,
            arabic: root.arabic,
          })} - ${t("seo__base_title")}`,
        }}
      />
      <Organization />
      <Navbar>
        <div className="navbar-main-title">
          <Button
            type="text"
            onClick={() => Router.back()}
            aria-label={t("navigation__go_to_back")}
          >
            <RiArrowLeftLine />
          </Button>
          <h1 className="title">
            {root.arabic} <em>{root.latin}</em>
          </h1>
        </div>

        <React.Fragment>
          {rootChar && (
            <Selectbox
              instanceId="topbar__select-rootchar"
              className="topbar__select-rootchar"
              placeholder={t("selectbox__rootchar_placeholder")}
              isSearchable
              options={rootchars}
              value={rootchars[rootChar - 1]}
              onChange={(e) => fetchRootcharRoots(e.value)}
              onChangeNative={(e) => fetchRootcharRoots(e.target.value)}
              aria-label={t("selectbox__select_rootchar")}
            />
          )}
          {roots && root && (
            <Selectbox
              className="topbar__select-root"
              placeholder={t("selectbox__root_placeholder")}
              isDisabled={!(roots.length > 0)}
              isSearchable
              options={roots}
              value={roots.find((a) => a.value === root.latin)}
              onChange={(e) => goToRoot(e.value)}
              onChangeNative={(e) => goToRoot(e.target.value)}
              aria-label={t("selectbox__select_root")}
            />
          )}
        </React.Fragment>
      </Navbar>
      <Content>
        <RootMain>
          <Container>
            <Row>
              <Col>
                <strong>{computedTranscription}</strong>: {computedMean}
              </Col>
            </Row>
          </Container>
        </RootMain>
        <RootDetail>
          <Container>
            <Row>
              <Col sm={12}>
                <Tabs>
                  <TabList>
                    <Tab>
                      <RiGitMergeLine />
                      <TabText>{t("root__verses_list")}</TabText>
                    </Tab>
                  </TabList>
                  <TabPanel>
                    <RootVerses>
                      {loading ? (
                        <LoadingBar />
                      ) : versesData?.length === 0 ? (
                        <EmptyVersesData>
                          {t("root__verses_list_empty")}
                        </EmptyVersesData>
                      ) : (
                        <InfiniteScroll
                          dataLength={versesData.length}
                          next={fetchData}
                          hasMore={!!versesLinkNext}
                          loader={<LoadingBar />}
                        >
                          {versesData &&
                            versesData.map((x) => {
                              const showVerse = !!showVerses.find(
                                (i) => i === x.id
                              );

                              const surahNames = {
                                tr: x.surah.name,
                                en: x.surah.name_en,
                              };

                              const verseTranscriptions = {
                                tr: x.verse.transcription_tr,
                                en: x.verse.transcription_en,
                              };

                              const versePartTranscriptions = {
                                tr: x.transcription_tr,
                                en: x.transcription_en,
                              };

                              const versePartTranslations = {
                                tr: x.translation_tr,
                                en: x.translation_en,
                              };

                              const surahName = surahNames[locale];
                              return (
                                <RootVerse
                                  key={x.id}
                                  onClick={() => {
                                    !showVerse && toggleVerse(x.id);
                                  }}
                                >
                                  <RootVerseTop>
                                    <RootVerseTitle>
                                      <div>
                                        <Link
                                          role="button"
                                          href={`/[ surah_id]/[verse_number]`}
                                          as={`/${x.surah.id}/${x.verse.verse_number}`}
                                          tabIndex="0"
                                        >
                                          <>
                                            {surahName} / {x.surah.id}:
                                            {x.verse.verse_number}
                                          </>
                                        </Link>
                                        :<em>{x.sort_number}</em>
                                      </div>
                                      <div className="root__title-arabic">
                                        <RiArrowRightSLine />
                                        <RootTitleArabic>
                                          {x.arabic}
                                        </RootTitleArabic>
                                        <RiArrowRightSLine className="show-icon" />
                                        <RootTitleTranscription>
                                          {versePartTranscriptions[locale]}
                                        </RootTitleTranscription>
                                      </div>
                                      <div className="root__title-turkish">
                                        <RiArrowRightSLine />
                                        {versePartTranslations[locale]}
                                      </div>
                                    </RootVerseTitle>

                                    <RootVerseOption>
                                      {showVerse ? (
                                        <Button
                                          tabIndex="0"
                                          aria-label={t("root__toggle_verse")}
                                          type="text"
                                          onClick={() => {
                                            showVerse && toggleVerse(x.id);
                                          }}
                                        >
                                          <RiArrowDownSLine />
                                        </Button>
                                      ) : (
                                        <Button
                                          tabIndex="0"
                                          aria-label={t("root__toggle_verse")}
                                          type="text"
                                          onClick={() => {
                                            showVerse && toggleVerse(x.id);
                                          }}
                                        >
                                          <RiArrowUpSLine />
                                        </Button>
                                      )}
                                    </RootVerseOption>
                                  </RootVerseTop>

                                  {showVerse && (
                                    <RootVerseDetail show={showVerse}>
                                      <RootVerseTags>
                                        {x.details?.map((i, index) => {
                                          return (
                                            i.length > 0 && (
                                              <RootVerseTag key={index}>
                                                {i.map((j, jndex) => {
                                                  return (
                                                    <>
                                                      <span key={jndex}>
                                                        {j[locale]}
                                                      </span>
                                                      {i.length > 1 &&
                                                        jndex < i.length - 1 &&
                                                        ", "}
                                                    </>
                                                  );
                                                })}
                                              </RootVerseTag>
                                            )
                                          );
                                        })}
                                      </RootVerseTags>
                                      <RootVerseTranslation>
                                        <VerseExpand
                                          translation={x.verse.translation}
                                          showFootnotes={false}
                                        />
                                      </RootVerseTranslation>
                                      <RootVerseArabic>
                                        {x.verse.verse}
                                      </RootVerseArabic>
                                      <RootVerseTranscription>
                                        {verseTranscriptions[locale]}
                                      </RootVerseTranscription>
                                    </RootVerseDetail>
                                  )}
                                </RootVerse>
                              );
                            })}
                        </InfiniteScroll>
                      )}
                    </RootVerses>
                  </TabPanel>
                </Tabs>
              </Col>
              {/* <Col sm={4}>
                <Tabs>
                  <TabList>
                    <Tab>
                      <FaLayerGroup />
                      <TabText>Türevler</TabText>
                    </Tab>
                  </TabList>
                  <TabPanel>
                    {prot.diffs.map((x, index) => {
                      return (
                        <RootDiffs key={index}>
                          ({x.count}) {x.diff}
                        </RootDiffs>
                      );
                    })}
                  </TabPanel>
                </Tabs>
              </Col> */}
            </Row>
          </Container>
        </RootDetail>
      </Content>
      {navWidth >= theme.awesomegrid.bp.sm * 16 && <Footer />}
    </SC>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { locale, authorId } = sessionCookieControl({ ctx, session });

  const {
    query: { latin },
  } = ctx;

  const { data: rootData } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/root/latin/${latin}`
  );

  if (locale && rootData?.rootchar_id) {
    return {
      props: {
        locale,
        authorId,
        root: rootData,
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

export default Root;
