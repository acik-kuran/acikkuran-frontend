import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiHome6Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useTheme } from "styled-components";

import Organization from "@components/common/Organization";
import Error from "@components/layout/Error";
import Navbar from "@components/layout/Navbar";
import { AboutLogo, AboutMain, PrivacyText } from "@styles/about.style";
import { Content } from "@styles/global.style";
import { Col, Container, Row, SC } from "@styles/verse.style";
import { initGA, logPageView } from "@utils/analytics";
import languageAlternates from "@utils/languageAlternates";

const About = (props) => {
  const { errorCode, locale } = props;
  const { theme } = useTheme();
  const { t } = useTranslation("common");
  const router = useRouter();

  if (errorCode) {
    return <Error />;
  }

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 60) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <SC>
      <Head></Head>
      <NextSeo
        languageAlternates={languageAlternates(router)}
        noindex
        title={`${t("seo__privacy__title")} - ${t("seo__base_title")}`}
        openGraph={{
          locale: locale,
          type: "article",
          url: `${t("seo__base_url")}/about`,
          title: `${t("seo__privacy__title")} - ${t("seo__base_title")}`,
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
            name: `${t("seo__privacy__title")}`,
            item: `${t("seo__base_url")}/about`,
          },
        ]}
      />

      <Navbar hideBottom>
        <div className="navbar-main-title">
          <Link
            href="/"
            aria-label={t("navigation__go_to_homepage")}
            className="button-as-a"
          >
            <RiHome6Line />
          </Link>
          <h1 className="title">{t("privacy_policy__title")}</h1>
        </div>
        <React.Fragment></React.Fragment>
      </Navbar>

      <Content>
        <AboutMain>
          <Container>
            <Row>
              <Col>
                <AboutLogo>
                  <img
                    src={`/locales/${locale}/images/manifest/favicon-${theme}.png`}
                    alt="Açık Kuran"
                    width={72}
                    height={72}
                  />
                </AboutLogo>
                <PrivacyText
                  dangerouslySetInnerHTML={{
                    __html: t("privacy_policy__text"),
                  }}
                ></PrivacyText>
              </Col>
            </Row>
          </Container>
        </AboutMain>
      </Content>
    </SC>
  );
};

export async function getServerSideProps() {
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default About;
