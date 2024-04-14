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
  RiBookmarkLine,
  RiExternalLinkLine,
  RiFingerprintFill,
  RiHome6Line,
  RiMoreFill,
  RiQuillPenLine,
  RiSettings5Line,
  RiVolumeUpFill,
  RiVolumeUpLine,
} from "react-icons/ri";
import { Tooltip } from "react-tippy";
import { useRecoilState, useRecoilValue } from "recoil";

import { authOptions } from "@auth/[...nextauth]";
import AmpAnalytics from "@components/amp/AmpAnalytics";
import Button from "@components/common/Button";
import Organization from "@components/common/Organization";
import SurahNavigationButton from "@components/common/SurahNavigation";
import Error from "@components/layout/Error";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import VerseExpand from "@components/ui/VerseExpand";
import useStreakTimer from "@hooks/useStreakTimer";
import { envInfoState, modalState } from "@recoil/atoms";
import { BookmarkAction } from "@styles/bookmark.style";
import { Content } from "@styles/global.style";
import { NavSearch } from "@styles/navbar.style";
import {
  AmpArabicText,
  Col,
  Container,
  Row,
  SC,
  SurahDetail,
  SurahHero,
  SurahOriginal,
  SurahTranslation,
  SurahTransliteration,
  SurahVerse,
  SurahVerseArabic,
  SurahVerseNumber,
  SurahVerseTranscription,
  SurahVerseTranslation,
  SurahVerseZero,
  Tab,
  TabList,
  TabPanel,
  TabText,
  Tabs,
} from "@styles/surah.style";
import theme from "@styles/theme";
import { initGA, logEvent, logPageView } from "@utils/analytics";
import {
  fetchJson,
  goToPage,
  goToSurah,
  goToVerse,
  handleBookmark,
  verseOptions,
} from "@utils/funcs";
import languageAlternates from "@utils/languageAlternates";
import { PlayerContext } from "@utils/playerProvider";
import surahs from "@utils/surahs";

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

const Share = dynamic(() => import("@components/ui/Share"), {
  ssr: false,
  loading: () => <></>,
});

export const config = {
  amp: "hybrid",
};

const Surah = (props) => {
  const { errorCode, author, surah, zero, verses, settings, locale } = props;

  if (errorCode) {
    return <Error />;
  }

  const isAmp = useAmp();

  const router = useRouter();
  const { t } = useTranslation("common");
  const { data: session } = useSession();

  const [_, setModalInfo] = useRecoilState(modalState);
  const [isTippyVisible, setIsTippyVisible] = useState(undefined);

  useStreakTimer();

  const envInfo = useRecoilValue(envInfoState);

  const { audioSurah, storeAudioSurah } = useContext(PlayerContext);
  const [url, setUrl] = useState();
  const [userSettings, setUserSettings] = useState(settings);
  const [navWidth, setNavWidth] = useState(
    theme.awesomegrid.breakpoints.lg * 16
  );
  const getVerseOptions = verseOptions(surah.verse_count);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    logEvent("env-info", envInfo || "web");
    setUrl(Router.asPath);
  }, [surah]);

  useEffect(() => {
    setNavWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const surahSlug = useMemo(() => {
    const slug = surahs(locale).find((s) => s.value === surah.id)?.slug;
    return slug ? `${slug}` : `${surah.id}`;
  });

  const surahNames = {
    tr: surah.name,
    en: surah.name_en,
  };

  const surahTranslations = useMemo(() => {
    return { tr: surah.name_translation_tr, en: surah.name_translation_en };
  });

  const surahName = useMemo(() => {
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

  const zeroTranscription = useMemo(() => {
    if (!zero) {
      return;
    }
    const transcriptions = {
      tr: zero.transcription,
      en: zero.transcription_en,
    };
    return transcriptions[locale];
  });

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
              href={`${t("seo__base_url")}/${surahSlug}?amp=1`}
            />
          </>
        )}
      </Head>
      <NextSeo
        languageAlternates={languageAlternates(
          router,
          `/${
            surahs(localesConfig.find((l) => l.locale != locale).locale).find(
              (s) => s.value === surah.id
            )?.slug
          }`
        )}
        title={`${t("seo__surah__title", { surah_name: surahName })} - ${t(
          "seo__base_title"
        )}`}
        noindex={process.env.NEXT_PUBLIC_ENVIRONMENT !== "production"}
        canonical={`${t("seo__base_url")}/${surahSlug}`}
        description={t("seo__surah__desc", {
          surah_name: surahName,
          surah_id: surah.id,
        })}
        openGraph={{
          type: "article",
          url: `${t("seo__base_url")}/${surahSlug}`,
          title: `${t("seo__surah__title", { surah_name: surahName })} - ${t(
            "seo__base_title"
          )}`,
          locale: locale,
          description: t("seo__surah__desc", {
            surah_name: surahName,
            surah_id: surah.id,
          }),
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
            name: `${t("seo__surah__title", { surah_name: surahName })}`,
            item: `${t("seo__base_url")}/${
              surahs(locale).find((s) => s.value === surah.id).slug
            }`,
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
                  eventAction: `AMP | surah: ${surah.id}`,
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
              goToSurah: {
                selector: ".amp-link",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-verse",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to surah: ${surah.id}`,
                },
              },
              goToVerse: {
                selector: ".verse-link",
                on: "click",
                request: "event",
                vars: {
                  event_name: "amp-go-to-verse",
                  eventCategory: "AMP",
                  eventAction: `AMP | go to verse`,
                },
              },
            },
          }}
        />
      )}

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
          <h1
            className="title"
            dangerouslySetInnerHTML={{
              __html: t("surah__title", {
                surah_id: surah.id,
                surah_name: surahName,
              }),
            }}
          />
          {isAmp && (
            <NavSearch>
              <a
                className="amp-link"
                href={`${t("seo__base_url")}/${surahSlug}`}
              >
                {t("verse__amp_goto_surah")} <RiExternalLinkLine size="14" />
              </a>
            </NavSearch>
          )}
        </div>

        {!isAmp && (
          <React.Fragment>
            <SurahNavigationButton
              surah={surah}
              prev={true}
              ariaLabel={t("navigation__prev_surah_arialabel")}
            />
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
            <SurahNavigationButton
              surah={surah}
              prev={false}
              ariaLabel={t("navigation__next_surah_arialabel")}
            />
            <Selectbox
              instanceId="topbar__select-verse"
              className="topbar__select-verse"
              placeholder={t("selectbox__verse_placeholder")}
              isSearchable
              options={getVerseOptions}
              value={0}
              onChange={(e) => goToVerse(surah.id, e.value)}
              onChangeNative={(e) => goToVerse(surah.id, e.target.value)}
              aria-label={t("selectbox__select_verse")}
            />
          </React.Fragment>
        )}
      </Navbar>
      <Content>
        <SurahDetail>
          <Container>
            <Row>
              <Col sm={12}>
                <SurahHero>
                  <SurahOriginal>{surah.name_original}</SurahOriginal>
                  <SurahTransliteration
                    dangerouslySetInnerHTML={{
                      __html: t("page__surah_title", {
                        surah_id: surah.id,
                        surah_name: surahName,
                      }),
                    }}
                  />

                  <SurahTranslation>
                    {surahTranslations[locale]}
                  </SurahTranslation>
                </SurahHero>
                <Tabs>
                  <TabList>
                    <Tab>
                      <RiFingerprintFill />
                      <TabText>
                        {author.name}{" "}
                        <span>
                          {author.description && ` / ${author.description}`}
                        </span>
                      </TabText>
                    </Tab>
                    {!isAmp && (
                      <div className="tablist__actions">
                        <div className="tablist__actions-icon">
                          <Button
                            type="text"
                            onClick={() => goToPage(surah.page_number)}
                            aria-label={t("context_menu__go_to_page")}
                          >
                            <RiBook3Line />
                          </Button>
                        </div>
                        <div className="tablist__actions-icon">
                          {surah ? (
                            audioSurah &&
                            audioSurah.audio &&
                            audioSurah.audio.mp3 === surah.audio.mp3 ? (
                              <Button
                                type="text"
                                onClick={() => storeAudioSurah({})}
                                aria-label={t("context_menu__stop_audio")}
                              >
                                <RiVolumeUpFill />
                              </Button>
                            ) : (
                              <Button
                                type="text"
                                onClick={() => storeAudioSurah(surah)}
                                aria-label={t("context_menu__play_audio")}
                              >
                                <RiVolumeUpLine />
                              </Button>
                            )
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="tablist__actions-icon">
                          <Button
                            type="text"
                            onClick={() =>
                              setModalInfo({
                                openedModal: "settings",
                                modalProps: {
                                  userSettings,
                                  setUserSettings,
                                },
                              })
                            }
                            aria-label={t("settings__tab__settings_title")}
                          >
                            <RiSettings5Line />
                          </Button>
                        </div>
                        <div className="tablist__actions-icon">
                          <Share url={url} />
                        </div>
                      </div>
                    )}
                  </TabList>
                  <TabPanel forceRender>
                    {zero && (
                      <SurahVerseZero key={zero.id}>
                        {!userSettings.hT && (
                          <SurahVerseTranslation>
                            <VerseExpand
                              translation={zero.translation}
                              showFootnotes={userSettings.sF}
                            />
                          </SurahVerseTranslation>
                        )}
                        {!userSettings.hO &&
                          (!isAmp ? (
                            <SurahVerseArabic>{zero.original}</SurahVerseArabic>
                          ) : (
                            <AmpArabicText>
                              <div className="arabic-text">{zero.original}</div>
                            </AmpArabicText>
                          ))}
                        {!userSettings.hC && (
                          <SurahVerseTranscription>
                            {zeroTranscription}
                          </SurahVerseTranscription>
                        )}
                      </SurahVerseZero>
                    )}
                    {verses.map((verse) => {
                      const transcriptions = {
                        tr: verse.transcription,
                        en: verse.transcription_en,
                      };

                      return (
                        <SurahVerse key={verse.id}>
                          <SurahVerseNumber>
                            <Link
                              className="verse-link"
                              href={`/[surah_id]/[verse_number]`}
                              as={`/${surah.id}/${verse.number}`}
                              dangerouslySetInnerHTML={{
                                __html: t(
                                  isAmp
                                    ? "surah__amp_verse-title"
                                    : "surah__verse-title",
                                  {
                                    verse_number: verse.number,
                                  }
                                ),
                              }}
                            ></Link>

                            {!isAmp && (
                              <BookmarkAction>
                                <Tooltip
                                  interactive
                                  tag="span"
                                  open={isTippyVisible}
                                  onRequestClose={() => {
                                    setIsTippyVisible(undefined);
                                  }}
                                  html={
                                    isTippyVisible !== false && (
                                      <div
                                        className="bookmark-context-menu"
                                        style={{
                                          padding: "10px 0",
                                          textAlign: "left",
                                          width: 220,
                                        }}
                                      >
                                        <ul className="tippy-list">
                                          <li
                                            onClick={() => {
                                              if (session?.user?.id) {
                                                handleBookmark({
                                                  action: "add",
                                                  surahId: surah.id,
                                                  verseNumber: verse.number,
                                                  verseId: verse.id,
                                                  notifications:
                                                    bookmarkNotifications,
                                                });
                                              } else {
                                                setModalInfo({
                                                  openedModal: "login",
                                                  modalProps: {
                                                    message: t(
                                                      "login__required_message__bookmark"
                                                    ),
                                                  },
                                                });
                                                setIsTippyVisible(false);
                                              }
                                            }}
                                          >
                                            <RiBookmarkLine />{" "}
                                            {t("context_menu__add_bookmark")}
                                          </li>
                                          <li
                                            onClick={() => {
                                              router.push(
                                                `/${surah.id}/${verse.number}`
                                              );
                                              setIsTippyVisible(false);
                                            }}
                                          >
                                            <RiQuillPenLine />{" "}
                                            {t(
                                              "context_menu__go_to_verse_detail"
                                            )}
                                          </li>
                                          <li
                                            onClick={() => {
                                              router.push(
                                                `/page/${verse.page}#${surah.id}:${verse.number}`
                                              );
                                              setIsTippyVisible(false);
                                            }}
                                          >
                                            <RiBook3Line />{" "}
                                            {t("context_menu__go_to_page")}
                                          </li>
                                        </ul>
                                      </div>
                                    )
                                  }
                                  theme="light"
                                  position="bottom"
                                  trigger="click"
                                  animation="shift"
                                  arrow={isTippyVisible !== false}
                                  duration="150"
                                >
                                  <RiMoreFill />
                                </Tooltip>
                              </BookmarkAction>
                            )}
                          </SurahVerseNumber>
                          {!userSettings.hT && (
                            <SurahVerseTranslation>
                              <VerseExpand
                                translation={verse.translation}
                                showFootnotes={userSettings.sF}
                              />
                            </SurahVerseTranslation>
                          )}
                          {!userSettings.hO &&
                            (!isAmp ? (
                              <SurahVerseArabic>
                                {verse.original}
                              </SurahVerseArabic>
                            ) : (
                              <AmpArabicText>
                                <div className="arabic-text">
                                  {verse.original}
                                </div>
                              </AmpArabicText>
                            ))}
                          {!userSettings.hC && (
                            <SurahVerseTranscription>
                              {transcriptions[locale]}
                            </SurahVerseTranscription>
                          )}
                        </SurahVerse>
                      );
                    })}
                  </TabPanel>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </SurahDetail>
      </Content>
      {!isAmp && navWidth >= theme.awesomegrid.breakpoints.sm * 16 && (
        <Footer />
      )}
    </SC>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { locale, settings, authorId } = sessionCookieControl({ ctx, session });

  let {
    query: { surah_id },
  } = ctx;

  const slugSurah = surahs(locale).find((surah) => surah.slug === surah_id);
  if (slugSurah) {
    surah_id = slugSurah.value;
  }

  if (surah_id > 114 || !Number.isInteger(+surah_id) || surah_id < 1) {
    return {
      props: {
        errorCode: 404,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  const { data } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/surah/${surah_id}?author=${authorId}`
  );

  if (data) {
    return {
      props: {
        locale,
        settings,
        surah: {
          id: data.id,
          name: data.name,
          name_en: data.name_en,
          verse_count: data.verse_count,
          audio: data.audio,
          page_number: data.page_number,
          name_translation_en: data.name_translation_en,
          name_translation_tr: data.name_translation_tr,
          name_original: data.name_original,
        },
        author: {
          id: data.verses[0].translation.author.id,
          language: data.verses[0].translation.author.language,
          name: data.verses[0].translation.author.name,
          description: data.verses[0].translation.author.description,
        },
        zero: data.zero && {
          id: data.zero.id,
          original: data.zero.verse,
          transcription: data.zero.transcription,
          transcription_en: data.zero.transcription_en,
          translation: {
            id: data.zero.translation.id,
            text: data.zero.translation.text,
            footnotes: data.zero.translation.footnotes,
          },
        },
        verses: data.verses.map((entry) => ({
          id: entry.id,
          number: entry.verse_number,
          original: entry.verse,
          transcription: entry.transcription,
          transcription_en: entry.transcription_en,
          page: entry.page,
          translation: {
            id: entry.translation.id,
            text: entry.translation.text,
            footnotes: entry.translation.footnotes,
          },
        })),
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

export default Surah;
