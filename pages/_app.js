import "react-tippy/dist/tippy.css";
import "react-h5-audio-player/lib/styles.css";

import localesConfig from "locales.config";
import { SessionProvider } from "next-auth/react";
import cookies from "next-cookies";
import { appWithTranslation, useTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config";
import { DefaultSeo } from "next-seo";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import Modals from "@components/modals";
import Player from "@components/ui/Player";
import defaultAuthors from "@data/defaultAuthors";
import { useDarkMode } from "@hooks/useDarkMode";
import GlobalStyles from "@styles/global.style";
import { darkTheme, lightTheme } from "@styles/theme";
import PlayerProvider from "@utils/playerProvider";
import ScrollPositionProvider from "@utils/scrollProvider";

React.useLayoutEffect = React.useEffect; // POF

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Acikkuran = (props) => {
  const {
    Component,
    pageProps,
    currentTheme,
    currentDomain,
    authorId,
    locale,
  } = props;

  const [theme, themeToggler] = useDarkMode(currentTheme);
  let themeMode = lightTheme;
  if (theme === "dark") themeMode = darkTheme;
  if (theme === "light") themeMode = lightTheme;
  const { t } = useTranslation("common");

  const domain = currentDomain || "acikkuran.com";
  const SEOConfig = {
    openGraph: {
      site_name: t("seo__home_title"),
      images: [
        {
          url: `https://${domain}/locales/${locale}/images/android/android-launchericon-192-192.png`,
          width: 200,
          height: 200,
          alt: t("seo__base_title"),
        },
      ],
    },
    twitter: {
      handle: t("seo__twitter_handle"),
      site: t("seo__twitter_handle"),
      cardType: "summary",
    },
  };

  const manifest = localesConfig.find((i) => i.locale === locale).manifest;

  return (
    <SessionProvider session={pageProps.session}>
      <DefaultSeo {...SEOConfig} />
      <Head>
        <link
          rel="shortcut icon"
          href={`/locales/${locale}/images/manifest/favicon.ico`}
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/locales/${locale}/images/manifest/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/locales/${locale}/images/manifest/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/locales/${locale}/images/manifest/favicon-16x16.png`}
        />
        <link rel="manifest" href={manifest} />
        <link
          rel="mask-icon"
          href={`/locales/${locale}/images/manifest/safari-pinned-tab.svg`}
          color="#9e9e9e"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <RecoilRoot>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                color: themeMode.bodyBackground,
                backgroundColor: themeMode.primaryDark,
              },
            }}
            containerStyle={{
              bottom: 50,
            }}
          />
          <PlayerProvider>
            <Player />
            <ScrollPositionProvider>
              <Component
                {...pageProps}
                themeToggler={themeToggler}
                theme={theme}
              />
            </ScrollPositionProvider>
          </PlayerProvider>
          <Modals authorId={authorId} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

Acikkuran.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { req } = appContext.ctx;
  const { theme, author_id } = cookies({ req });
  const currentDomain = req.headers.host;

  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const defaultAuthorId = defaultAuthors[locale];

  let authorId = author_id || defaultAuthorId;
  if (authorId == 0) {
    authorId = defaultAuthorId;
  }

  return { ...appProps, currentTheme: theme, authorId, currentDomain, locale };
};

export default appWithTranslation(Acikkuran, nextI18nextConfig);
