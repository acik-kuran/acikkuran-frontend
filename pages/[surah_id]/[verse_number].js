import sessionCookieControl from "lib/sessionCookieControl";
import localesConfig from "locales.config";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { useAmp } from "next/amp";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  RiArrowLeftLine,
  RiBook3Line,
  RiBookmarkFill,
  RiBookmarkLine,
  RiDragDropLine,
  RiExternalLinkLine,
  RiHome6Line,
  RiListOrdered,
  RiQuillPenLine,
  RiSettings5Line,
  RiVolumeUpFill,
  RiVolumeUpLine,
} from "react-icons/ri";
import { useSwipeable } from "react-swipeable";
import { useRecoilState, useRecoilValue } from "recoil";
import { useTextSelection } from "use-text-selection";

import { authOptions } from "@auth/[...nextauth]";
import AmpAnalytics from "@components/amp/AmpAnalytics";
import Button from "@components/common/Button";
import Organization from "@components/common/Organization";
import VerseNavigationButton from "@components/common/VerseNavigation";
import Error from "@components/layout/Error";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import Share from "@components/ui/Share";
import VerseExpand from "@components/ui/VerseExpand";
import defaultAuthorSelections from "@data/defaultAuthorSelections";
import useStreakTimer from "@hooks/useStreakTimer";
import { envInfoState, modalState, targetVerseState } from "@recoil/atoms";
import { Content } from "@styles/global.style";
import { NavSearch } from "@styles/navbar.style";
import { TabListFlex, TabListFlexAction } from "@styles/tabs.style";
import theme from "@styles/theme";
import {
  AmpArabicText,
  Col,
  Container,
  Row,
  SC,
  Tab,
  TabList,
  TabPanel,
  TabText,
  Tabs,
  VerseArabic,
  VerseAuthor,
  VerseDetail,
  VerseHeroAuthor,
  VerseHeroTranslation,
  VerseMain,
  VerseText,
  VerseTranscription,
  VerseTranslation,
  VerseTranslations,
} from "@styles/verse.style";
import { initGA, logEvent, logPageView } from "@utils/analytics";
import {
  escapeHtml,
  fetchJson,
  goToNextVerse,
  goToPage,
  goToPrevVerse,
  goToSurah,
  goToVerse,
  handleBookmark,
  verseOptions,
} from "@utils/funcs";
import languageAlternates from "@utils/languageAlternates";
import localeVerseSlugs, {
  verseNumberRegexPattern,
} from "@utils/localeVerseSlugs";
import { PlayerContext } from "@utils/playerProvider";
import surahs from "@utils/surahs";

const KeyboardEventHandler = dynamic(
  () => import("react-keyboard-event-handler"),
  {
    ssr: false,
  }
);
const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

export const config = {
  amp: "hybrid",
};

const Verse = (props) => {
  const {
    errorCode,
    verse,
    surah,
    translation,
    words,
    translations,
    settings,
    authorSelections,
    locale,
  } = props;

  if (errorCode) {
    return <Error />;
  }

  const isAmp = useAmp();
  const router = useRouter();
  const { t } = useTranslation("common");

  const { textContent: selectedTextContent } = useTextSelection();

  useStreakTimer();

  const { data: session } = useSession();

  const envInfo = useRecoilValue(envInfoState);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const { audioSurah, storeAudioSurah } = useContext(PlayerContext);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      !selectedTextContent && goToNextVerse(surah.id, verse.number),
    onSwipedRight: () =>
      !selectedTextContent && goToPrevVerse(surah.id, verse.number),
    delta: 100,
  });

  const [url, setUrl] = useState();
  const [userSettings, setUserSettings] = useState(settings);
  const [getVerseOptions, setVerseOptions] = useState([]);
  const [currentAuthorsList, setCurrentAuthorsList] = useState(
    authorSelections || defaultAuthorSelections[locale]
  );

  const [navWidth, setNavWidth] = useState(
    theme.awesomegrid.breakpoints.lg * 16
  );

  useEffect(() => {
    setNavWidth(window.innerWidth);
    setVerseOptions(verseOptions(surah.verse_count));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setUrl(Router.asPath);
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    logEvent("env-info", envInfo || "web");
  }, [verse]);

  useEffect(() => {
    setIsBookmarked(false);
    () => {
      setIsBookmarked(false);
    };
  }, [verse]);

  const [_, setModalInfo] = useRecoilState(modalState);
  const [targetVerse, setTargetVerseValue] = useRecoilState(targetVerseState);
  const [selectedVerseTab, setSelectedVerseTab] = useState(0);

  const currentSlug = useMemo(() => {
    const surahSlug = surahs(locale).find((s) => s.value === surah.id)?.slug;
    return surahSlug
      ? `${surahSlug}/${localeVerseSlugs(verse.number)[locale]}`
      : `${surah.id}/${verse.number}`;
  });

  const alternateSlug = useMemo(() => {
    const otherLocale = localesConfig.find((l) => l.locale != locale).locale;
    const surahSlug = surahs(otherLocale).find(
      (s) => s.value === surah.id
    )?.slug;
    return surahSlug
      ? `${surahSlug}/${localeVerseSlugs(verse.number)[otherLocale]}`
      : `${surah.id}/${verse.number}`;
  });

  const surahName = useMemo(() => {
    const surahNames = {
      tr: surah.name,
      en: surah.name_en,
    };
    return surahNames[locale];
  });

  const bookmarkNotifications = useMemo(() => {
    return {
      remove_loading: t("bookmark__remove_loading"),
      remove_success: t("bookmark__remove_success"),
      add_error: t("bookmark__remove_error"),
      add_loading: t("bookmark__add_loading"),
      add_success: t("bookmark__add_success"),
    };
  });

  const verseTranscription = useMemo(() => {
    const transcriptions = {
      tr: verse.transcription,
      en: verse.transcription_en,
    };
    return transcriptions[locale];
  });

  const computedTranslations = useMemo(() => {
    let filteredcurrentAuthorsList = [];
    currentAuthorsList.forEach((id) => {
      filteredcurrentAuthorsList.push(
        translations.find((obje) => obje.author.id == id)
      );
    });
    return filteredcurrentAuthorsList;
  }, [currentAuthorsList, router]);

  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <SC>
      <Head>
        {!isAmp && (
          <>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
            />
            <link
              rel="amphtml"
              href={`${t("seo__base_url")}/${currentSlug}?amp=1`}
            />
          </>
        )}
      </Head>
      <NextSeo
        languageAlternates={languageAlternates(router, `/${alternateSlug}`)}
        noindex={process.env.NEXT_PUBLIC_ENVIRONMENT !== "production"}
        canonical={`${t("seo__base_url")}/${currentSlug}`}
        title={`${t("seo__verse__title", {
          surah_name: surahName,
          verse_number: verse.number,
        })} - ${t("seo__base_title")}`}
        description={translation?.text?.replace(/\[.*?\]/g, "")}
        openGraph={{
          type: "article",
          locale: locale,
          url: `${t("seo__base_url")}/${currentSlug}`,
          title: `${t("seo__verse__title", {
            surah_name: surahName,
            verse_number: verse.number,
          })} - ${t("seo__base_title")}`,
          description: translation?.text?.replace(/\[.*?\]/g, ""),
        }}
      />
      <Organization />

      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: t("seo__base_title"),
            item: t("seo__base_url"),
          },
          {
            position: 2,
            name: t("seo__verse__breadcrumb_surah", { surah_name: surahName }),
            item: `${t("seo__base_url")}/${
              surahs(locale).find((s) => s.value === surah.id).slug
            }`,
          },
          {
            position: 3,
            name: t("seo__verse__breadcrumb_verse", {
              verse_number: verse.number,
            }),
            item: `${t("seo__base_url")}/${
              surahs(locale).find((s) => s.value === surah.id).slug
            }/${localeVerseSlugs(verse.number)[locale]}`,
          },
        ]}
      />

      {isAmp && process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
        <AmpAnalytics
          type="gtag"
          script={{
            vars: {
              gtag_id: analyticsId,
              config: {
                [analyticsId]: { groups: "default" },
              },
            },
            triggers: {
              trackPageview: {
                on: "visible",
                request: "pageview",
              },
              trackPageviewEvent: {
                on: "visible",
                request: "event",
                vars: {
                  event_name: "amp-view",
                  eventCategory: "AMP",
                  eventAction: `AMP | verse: ${surah.id}/${verse.number}`,
                },
              },

              goToHome: {
                selector: ".amp-home",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-home",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to home`,
                },
              },
              goToVerse: {
                selector: ".amp-link",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-verse",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to verse`,
                },
              },
              goToSurah: {
                selector: ".title",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-surah",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to surah: ${surah.id}`,
                },
              },
              goToRoot: {
                selector: ".root-link",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-root",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to root`,
                },
              },
            },
          }}
        />
      )}

      <KeyboardEventHandler
        handleKeys={["right"]}
        onKeyEvent={() => goToNextVerse(surah.id, verse.number)}
      />
      <KeyboardEventHandler
        handleKeys={["left"]}
        onKeyEvent={() => goToPrevVerse(surah.id, verse.number)}
      />

      <Navbar isAmp={isAmp}>
        <div className="navbar-main-title">
          {!isAmp ? (
            <Button
              type="text"
              onClick={() => Router.back()}
              aria-label={t("navigation__go_to_back")}
            >
              <RiArrowLeftLine />
            </Button>
          ) : (
            <a
              href="/"
              className="amp-home button-as-a"
              aria-label={t("navigation__go_to_homepage")}
            >
              <RiHome6Line />
            </a>
          )}
          <h1 className="title">
            <Link
              href={`/[surah_id]`}
              as={`/${surah.id}`}
              dangerouslySetInnerHTML={{
                __html: t("surah__title", {
                  surah_id: surah.id,
                  surah_name: surahName,
                }),
              }}
            />
            {t("verse__title", { verse_number: verse.number })}
          </h1>
          {isAmp && (
            <NavSearch>
              <a
                className="amp-link"
                href={`${t("seo__base_url")}/${currentSlug}`}
              >
                {t("verse__amp_goto_verse")} <RiExternalLinkLine size="14" />
              </a>
            </NavSearch>
          )}
        </div>
        <React.Fragment>
          {!isAmp && (
            <Selectbox
              instanceId="topbar__select-surah"
              className="topbar__select-surah"
              placeholder={t("selectbox__surah_placeholder")}
              isSearchable
              value={surahs(locale)[surah.id - 1]}
              options={surahs(locale)}
              onChange={(e) => goToSurah(e.value)}
              onChangeNative={(e) => goToSurah(e.target.value)}
              aria-label={t("selectbox__select_surah")}
            />
          )}
          <VerseNavigationButton
            surah={surah}
            verseNumber={verse.number}
            prev={true}
            ariaLabel={t("navigation__prev_verse_arialabel")}
          />
          {!isAmp && (
            <Selectbox
              className="topbar__select-verse"
              instanceId="topbar__select-verse"
              placeholder={t("selectbox__verse_placeholder")}
              isSearchable
              value={getVerseOptions[verse.number - 1]}
              options={getVerseOptions}
              onChange={(e) => goToVerse(surah.id, e.value)}
              onChangeNative={(e) => goToVerse(surah.id, e.target.value)}
              aria-label={t("selectbox__select_verse")}
            />
          )}
          <VerseNavigationButton
            lastItem
            surah={surah}
            verseNumber={verse.number}
            prev={false}
            ariaLabel={t("navigation__next_verse_arialabel")}
          />
        </React.Fragment>
      </Navbar>

      <Content {...handlers}>
        <VerseMain>
          <Container>
            <Row>
              <Col>
                <VerseHeroAuthor>
                  <h5>
                    {translation.author.name}{" "}
                    <span>
                      {translation.author.description &&
                        `- ${translation.author.description}`}
                    </span>{" "}
                  </h5>
                  {!isAmp && (
                    <div className="verse-author__actions">
                      <div className="verse-author__actions-icon">
                        {isBookmarked ? (
                          <Button
                            type="text"
                            aria-label={t("context_menu__remove_bookmark")}
                            onClick={() =>
                              handleBookmark({
                                action: "remove",
                                surahId: surah.id,
                                verseNumber: verse.number,
                                verseId: verse.id,
                                setIsBookmarked,
                                notifications: bookmarkNotifications,
                              })
                            }
                          >
                            <RiBookmarkFill color="#FBA725" />
                          </Button>
                        ) : (
                          <Button
                            type="text"
                            aria-label={t("context_menu__add_bookmark")}
                            onClick={() =>
                              session?.user?.id
                                ? handleBookmark({
                                    action: "add",
                                    surahId: surah.id,
                                    verseNumber: verse.number,
                                    verseId: verse.id,
                                    setIsBookmarked,
                                    notifications: bookmarkNotifications,
                                  })
                                : setModalInfo({
                                    openedModal: "login",
                                    modalProps: {
                                      message: t(
                                        "login__required_message__bookmark"
                                      ),
                                    },
                                  })
                            }
                          >
                            <RiBookmarkLine />
                          </Button>
                        )}
                      </div>
                      <div className="verse-author__actions-icon">
                        <Button
                          type="text"
                          aria-label={t("context_menu__go_to_page")}
                          onClick={() =>
                            goToPage(verse.page, `${surah.id}:${verse.number}`)
                          }
                        >
                          <RiBook3Line />
                        </Button>
                      </div>
                      <div className="verse-author__actions-icon">
                        {surah && surah.audio ? (
                          audioSurah &&
                          audioSurah.audio &&
                          audioSurah.audio.mp3 === surah.audio.mp3 ? (
                            <Button
                              type="text"
                              aria-label={t("context_menu__stop_audio")}
                              onClick={() => storeAudioSurah({})}
                            >
                              <RiVolumeUpFill />
                            </Button>
                          ) : (
                            <Button
                              type="text"
                              aria-label={t("context_menu__play_audio")}
                              onClick={() => storeAudioSurah(surah)}
                            >
                              <RiVolumeUpLine />
                            </Button>
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="verse-author__actions-icon">
                        <Button
                          type="text"
                          aria-label={t("settings__tab__settings")}
                          onClick={() =>
                            setModalInfo({
                              openedModal: "settings",
                              modalProps: {
                                userSettings,
                                setUserSettings,
                              },
                            })
                          }
                        >
                          <RiSettings5Line />
                        </Button>
                      </div>
                      <div className="verse-author__actions-icon">
                        <Share
                          url={url}
                          verse={translation?.text?.replace(/\[.*?\]/g, "")}
                        />
                      </div>
                    </div>
                  )}
                </VerseHeroAuthor>
                <VerseHeroTranslation>
                  <VerseExpand
                    isAmp={isAmp}
                    translation={translation}
                    surahId={surah.id}
                    verseNumber={verse.number}
                    showFootnotes={userSettings.sF}
                  />
                </VerseHeroTranslation>
                {!isAmp && <VerseArabic>{verse.original}</VerseArabic>}
                {isAmp && (
                  <AmpArabicText>
                    <div className="arabic-text">{verse.original}</div>
                  </AmpArabicText>
                )}
                <VerseTranscription>{verseTranscription}</VerseTranscription>
              </Col>
            </Row>
          </Container>
        </VerseMain>
        <VerseDetail isAmp={isAmp}>
          <Container>
            <Row>
              <Col className="col-words">
                <Tabs
                  defaultIndex={0}
                  onSelect={(index) => setSelectedVerseTab(index)}
                >
                  <TabList>
                    <Tab>
                      <RiListOrdered />
                      <TabText> {t("verses__words_tab_title")}</TabText>
                    </Tab>
                    {navWidth <= 58 * 16 && (
                      <React.Fragment>
                        <Tab>
                          <RiQuillPenLine />
                          <TabText>
                            {t("verse__translations_tab_title")}
                          </TabText>
                        </Tab>
                        {!isAmp && selectedVerseTab === 1 && (
                          <TabListFlexAction
                            aria-label={escapeHtml(
                              t("author_selection__choose_sort_label")
                            )}
                            onClick={() => {
                              setModalInfo({
                                openedModal: "authorSelection",
                                modalProps: {
                                  currentAuthorsList,
                                  setCurrentAuthorsList,
                                  authorSelections,
                                },
                              });
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: t(
                                  "author_selection__choose_sort_label"
                                ),
                              }}
                            />
                            <RiDragDropLine />
                          </TabListFlexAction>
                        )}
                      </React.Fragment>
                    )}
                  </TabList>
                  <TabPanel>
                    <table>
                      <thead>
                        <tr>
                          <th className="sort-number">#</th>
                          <th className="transcription">
                            {t("verse__words_word_title")}
                          </th>
                          <th className="turkish">
                            {t("verse__words_meaning_title")}
                          </th>
                          <th className="arabic">
                            {t("verse__words_root_title")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {words.map((x) => {
                          const transcription = {
                            tr: x.transcription_tr,
                            en: x.transcription_en,
                          };

                          const translation = {
                            tr: x.translation_tr,
                            en: x.translation_en,
                          };

                          return (
                            <tr key={x.id}>
                              <td className="sort-number">{x.sort_number}</td>
                              <td className="transcription">
                                {transcription[locale]}
                              </td>
                              <td className="turkish">{translation[locale]}</td>
                              <td className="arabic">
                                {x.root && (
                                  <Link
                                    onClick={() => {
                                      setTargetVerseValue({
                                        surah_id: surah.id,
                                        verse_number: verse.number,
                                        sort_number: x.sort_number,
                                      });
                                    }}
                                    href={`/root/[latin]`}
                                    as={`/root/${x.root.latin}`}
                                    className="root-link"
                                  >
                                    {x.root && x.root.arabic}
                                  </Link>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </TabPanel>
                  {navWidth <= 58 * 16 && (
                    <React.Fragment>
                      <TabPanel>
                        <VerseTranslations>
                          {computedTranslations.map((item) => {
                            return (
                              item && (
                                <VerseTranslation key={item.id}>
                                  <VerseAuthor>
                                    {item.author.name}{" "}
                                    <span>{item.author.description}</span>
                                    {!isAmp && item.author.url && (
                                      <sup>
                                        <a
                                          href={item.author.url}
                                          target="_blank"
                                          rel="nofollow noopener noreferrer"
                                          className="verse-author__external-link"
                                          aria-label={item.author.description}
                                        >
                                          <RiExternalLinkLine size="14" />
                                        </a>
                                      </sup>
                                    )}
                                  </VerseAuthor>
                                  <VerseText>
                                    <VerseExpand
                                      isAmp={isAmp}
                                      translation={item}
                                      surahId={surah.id}
                                      verseNumber={verse.number}
                                      showFootnotes={true}
                                    />
                                  </VerseText>
                                </VerseTranslation>
                              )
                            );
                          })}
                        </VerseTranslations>
                      </TabPanel>
                    </React.Fragment>
                  )}
                </Tabs>
              </Col>
              {navWidth > 58 * 16 && (
                <Col className="col-translations">
                  <Tabs>
                    <TabList>
                      <TabListFlex>
                        <div>
                          <Tab>
                            <RiQuillPenLine />
                            <TabText>
                              {t("verse__translations_tab_title")}
                            </TabText>
                          </Tab>
                          {/* <Tab disabled>
                        <FaPenNib />
                        <TabText>Çeviri Ekle</TabText>
                      </Tab>
                      <Tab disabled>
                        <FaSeedling />
                        <TabText>Forum</TabText>
                      </Tab> */}
                        </div>
                        {!isAmp && (
                          <TabListFlexAction
                            aria-label={escapeHtml(
                              t("author_selection__choose_sort_label")
                            )}
                            onClick={() => {
                              setModalInfo({
                                openedModal: "authorSelection",
                                modalProps: {
                                  currentAuthorsList,
                                  setCurrentAuthorsList,
                                  authorSelections,
                                },
                              });
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: t(
                                  "author_selection__choose_sort_label"
                                ),
                              }}
                            />
                            <RiDragDropLine />
                          </TabListFlexAction>
                        )}
                      </TabListFlex>
                    </TabList>

                    <TabPanel>
                      <VerseTranslations>
                        {computedTranslations.map((item) => {
                          return (
                            item && (
                              <VerseTranslation key={item.id}>
                                <VerseAuthor>
                                  {item.author.name}{" "}
                                  <span>{item.author.description}</span>
                                  {!isAmp && item.author.url && (
                                    <sup>
                                      <a
                                        href={item.author.url}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        className="verse-author__external-link"
                                        aria-label={item.author.description}
                                      >
                                        <RiExternalLinkLine size="14" />
                                      </a>
                                    </sup>
                                  )}
                                </VerseAuthor>
                                <VerseText>
                                  <VerseExpand
                                    isAmp={isAmp}
                                    translation={item}
                                    surahId={surah.id}
                                    verseNumber={verse.number}
                                    showFootnotes={true}
                                  />
                                </VerseText>
                              </VerseTranslation>
                            )
                          );
                        })}
                      </VerseTranslations>
                    </TabPanel>
                    {/* <TabPanel>yakında...</TabPanel>
                    <TabPanel>yakında...</TabPanel> */}
                  </Tabs>
                </Col>
              )}
            </Row>
          </Container>
        </VerseDetail>
      </Content>
      {!isAmp && navWidth >= theme.awesomegrid.breakpoints.sm * 16 && (
        <Footer />
      )}
    </SC>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { locale, settings, authorId, authorSelections } = sessionCookieControl(
    { ctx, session }
  );

  let {
    query: { surah_id, verse_number },
  } = ctx;

  const slugSurah = surahs(locale).find((surah) => surah.slug === surah_id);
  if (slugSurah) {
    surah_id = slugSurah.value;
  }

  const matchResult = verse_number.match(verseNumberRegexPattern(locale));

  if (matchResult) {
    verse_number = matchResult[1];
  }

  const { data: verseData } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/surah/${surah_id}/verse/${verse_number}?author=${authorId}`
  );
  const { data: verseTranslationsData } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/surah/${surah_id}/verse/${verse_number}/translations`
  );
  const { data: verseWordsData } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/surah/${surah_id}/verse/${verse_number}/verseparts`
  );
  if (
    verseData?.surah &&
    verseTranslationsData?.length > 0 &&
    verseWordsData?.length > 0
  ) {
    return {
      props: {
        locale,
        settings,
        authorSelections,
        surah: {
          id: verseData.surah.id,
          name: verseData.surah.name,
          name_en: verseData.surah.name_en,
          verse_count: verseData.surah.verse_count,
          audio: verseData.surah.audio || {},
        },
        verse: {
          id: verseData.id,
          number: verseData.verse_number,
          page: verseData.page,
          juz_number: verseData.juz_number,
          original: verseData.verse,
          transcription: verseData.transcription,
          transcription_en: verseData.transcription_en,
        },
        translation: verseData.translation,
        translations: verseTranslationsData,
        words: verseWordsData,
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

export default Verse;
