import sessionCookieControl from "lib/sessionCookieControl";
import { getServerSession } from "next-auth";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useRecoilValue } from "recoil";

import { authOptions } from "@auth/[...nextauth]";
import Button from "@components/common/Button";
import Organization from "@components/common/Organization";
import Error from "@components/layout/Error";
import Navbar from "@components/layout/Navbar";
import PageOriginalComponent from "@components/ui/PageOriginal";
import PageTranslationComponent from "@components/ui/PageTranslation";
import juzNumbers from "@data/juzNumbers";
import useStreakTimer from "@hooks/useStreakTimer";
import { envInfoState } from "@recoil/atoms";
import { Content } from "@styles/global.style";
import {
  Col,
  Container,
  Hidden,
  PageDetail,
  PageEdge,
  PageEdgeJuz,
  Row,
  SC,
  Visible,
} from "@styles/page.style";
import { initGA, logEvent, logPageView } from "@utils/analytics";
import {
  escapeHtml,
  fetchJson,
  goToNextPage,
  goToPage,
  goToPrevPage,
} from "@utils/funcs";
import languageAlternates from "@utils/languageAlternates";

const KeyboardEventHandler = dynamic(
  () => import("react-keyboard-event-handler"),
  {
    ssr: false,
  }
);

const PageNavigationButton = dynamic(
  () => import("@components/common/PageNavigation"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

const Page = (props) => {
  const { errorCode, pageVerses, uniqueSurahs, page_id, locale } = props;
  const { t } = useTranslation("common");
  const router = useRouter();

  if (errorCode) {
    return <Error />;
  }

  useStreakTimer();

  const envInfo = useRecoilValue(envInfoState);

  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showJuzNumber, setShowJuzNumber] = useState(null);
  const [selectedPageType, setSelectedPageType] = useState("translation");
  useEffect(() => {
    const hash = window.location.hash || null;
    if (hash) {
      const hashPart = hash.replace("#", "").split(":");
      setSelectedVerse(
        pageVerses.find(
          (i) => i.surah.id == hashPart[0] && i.number == hashPart[1]
        ).id
      );
    }
  }, []);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    logEvent("env-info", envInfo || "web");

    const startJuzNumber = juzNumbers.find((i) => i.value === page_id);
    setShowJuzNumber(
      startJuzNumber
        ? t("page__juz_info", { juz_id: startJuzNumber.label })
        : null
    );
  }, [page_id]);

  const currentJuzNumber = pageVerses[0].juz_number;

  const PageComponentProps = {
    currentJuzNumber,
    selectedVerse,
    setSelectedVerse,
    setSelectedPageType,
    pageVerses,
    page_id,
    uniqueSurahs,
  };

  const SelectedPageComponent =
    selectedPageType === "translation"
      ? PageTranslationComponent
      : PageOriginalComponent;

  let RightPageComponent;
  let LeftPageComponent;
  let leftPageEdge;
  let rightPageEdge;
  if (page_id % 2 === 0) {
    RightPageComponent = PageTranslationComponent;
    LeftPageComponent = PageOriginalComponent;
    rightPageEdge = showJuzNumber;
  } else {
    LeftPageComponent = PageTranslationComponent;
    RightPageComponent = PageOriginalComponent;
    leftPageEdge = showJuzNumber;
  }

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

  const pageDesc = useMemo(() => {
    const page_spec =
      page_id == 0 ? t("page__opening") : t("page__page_info", { page_id });
    return t("page__desc", { page_spec });
  });

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
        noindex={process.env.NEXT_PUBLIC_ENVIRONMENT !== "production"}
        title={escapeHtml(pageDesc)}
        description={escapeHtml(pageDesc)}
        openGraph={{
          type: "article",
          locale: locale,
          url: `${t("seo__base_url")}/page/${page_id}`,
          title: `${escapeHtml(pageDesc)} - ${t("seo__base_title")}`,
          description: `${escapeHtml(pageDesc)}`,
        }}
      />
      <Organization />
      <KeyboardEventHandler
        handleKeys={["right"]}
        onKeyEvent={() => {
          goToNextPage(page_id);
        }}
      />
      <KeyboardEventHandler
        handleKeys={["left"]}
        onKeyEvent={() => {
          goToPrevPage(page_id);
        }}
      />
      <Navbar>
        <div className="navbar-main-title">
          <Button
            type="text"
            onClick={() => Router.back()}
            aria-label={t("navigation__go_to_homepage")}
          >
            <RiArrowLeftLine />
          </Button>
          <h1
            className="title"
            dangerouslySetInnerHTML={{
              __html: pageDesc,
            }}
          ></h1>
        </div>
        <React.Fragment>
          <Selectbox
            instanceId="topbar__select-juz"
            className="topbar__select-juz"
            placeholder={t("selectbox__juz_placeholder")}
            isSearchable
            value={getJuzOptions[currentJuzNumber - 1]}
            options={getJuzOptions}
            onChange={(e) => goToPage(e.value)}
            onChangeNative={(e) => goToPage(e.target.value)}
            aria-label={t("selectbox__select_juz")}
          />
          <PageNavigationButton
            page_id={page_id}
            prev={true}
            ariaLabel={t("navigation__prev_page_arialabel")}
          />
          <Selectbox
            instanceId="topbar__select-page"
            className="topbar__select-page"
            placeholder={t("selectbox__page_placeholder")}
            isSearchable
            value={getPageOptions[page_id]}
            options={getPageOptions}
            onChange={(e) => goToPage(e.value)}
            onChangeNative={(e) => goToPage(e.target.value)}
            aria-label={t("selectbox__select_page")}
          />
          <PageNavigationButton
            page_id={page_id}
            prev={false}
            ariaLabel={t("navigation__next_page_arialabel")}
          />
        </React.Fragment>
      </Navbar>
      <Content>
        <PageDetail>
          <Container>
            <Row>
              <Hidden xs sm md>
                <Col md={1}>
                  <PageEdge left>
                    {leftPageEdge && <PageEdgeJuz>{leftPageEdge}</PageEdgeJuz>}
                    {page_id > 0 && (
                      <Button
                        type="text"
                        onClick={() => goToPrevPage(page_id)}
                        aria-label={t("navigation__prev_page_arialabel")}
                      >
                        <RiArrowLeftSLine />
                      </Button>
                    )}
                  </PageEdge>
                </Col>
              </Hidden>
              <Visible xs sm md>
                <SelectedPageComponent {...PageComponentProps} />
              </Visible>
              <Hidden xs sm md>
                <Col sm={12} md={5}>
                  <LeftPageComponent {...PageComponentProps} />
                </Col>
                <Col sm={12} md={5}>
                  <RightPageComponent {...PageComponentProps} />
                </Col>
              </Hidden>
              <Hidden xs sm md>
                <Col sm={1}>
                  <PageEdge right>
                    {rightPageEdge && (
                      <PageEdgeJuz>{rightPageEdge}</PageEdgeJuz>
                    )}
                    {page_id < 604 && (
                      <Button
                        type="text"
                        onClick={() => goToNextPage(page_id)}
                        aria-label={t("navigation__next_page_arialabel")}
                      >
                        <RiArrowRightSLine />
                      </Button>
                    )}
                  </PageEdge>
                </Col>
              </Hidden>
            </Row>
          </Container>
        </PageDetail>
      </Content>
    </SC>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { locale, authorId } = sessionCookieControl({ ctx, session });

  const {
    query: { page_id },
  } = ctx;

  if (+page_id > 604 || !Number.isInteger(+page_id) || +page_id < 0) {
    return {
      props: {
        errorCode: 404,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  const { data } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/page/${page_id}?author=${authorId}`
  );

  if (data) {
    const pageVerses = data.filter((a) => a.page == page_id);
    const uniqueSurahs = pageVerses.filter((i, index) => {
      const _thing = JSON.stringify(i.surah);
      return (
        index ===
        pageVerses.findIndex((obj) => {
          return JSON.stringify(obj.surah) === _thing;
        })
      );
    });
    return {
      props: {
        locale,
        page_id: +page_id,
        uniqueSurahs,
        pageVerses: pageVerses.map((entry) => ({
          id: entry.id,
          number: entry.verse_number,
          original: entry.verse,
          transcription: entry.transcription,
          transcription_en: entry.transcription_en,
          page: entry.page,
          juz_number: entry.juz_number,
          surah: {
            name: entry.surah.name,
            name_en: entry.surah.name_en,
            name_original: entry.surah.name_original,
            id: entry.surah.id,
          },
          zero: entry.zero,
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

export default Page;
