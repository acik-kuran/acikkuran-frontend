import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

import Button from "@components/common/Button";
import Navbar from "@components/layout/Navbar";
import {
  Col,
  Container,
  ErrorDetail,
  ErrorNumber,
  ErrorText,
  Row,
  SC,
} from "@styles/error.style";
import { Content } from "@styles/global.style";
import { goToSurah } from "@utils/funcs";
import surahs from "@utils/surahs"; // TODO: her sey import etmek dosya boyutunu arttiriyor olabilir
import customSelectFilter from "@utils/customSelectFilter";

const Selectbox = dynamic(() => import("@components/common/Selectbox"), {
  ssr: false,
  loading: () => <></>,
});

const ErrorComponent = () => {
  const { t } = useTranslation("common");
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  return (
    <SC>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
      </Head>
      <NextSeo title={t("error__title")} noindex nofollow />
      <Navbar>
        <div className="navbar-main-title">
          <Button
            type="text"
            onClick={() => {
              Router.back();
            }}
            aria-label={t("navigation__go_to_back")}
          >
            <RiArrowLeftLine onClick={() => Router.push("/")} />
          </Button>
          <h1 className="title">{t("error__title")}</h1>
        </div>
        <React.Fragment>
          <Selectbox
            instanceId="topbar__select-surah"
            className="topbar__select-surah"
            placeholder={t("selectbox__surah_placeholder")}
            isSearchable
            value={surahs(locale)[0]}
            options={surahs(locale)}
            onChange={(e) => goToSurah(e.value)}
            onChangeNative={(e) => goToSurah(e.target.value)}
            aria-label={t("selectbox__select_surah")}
            filterOption={customSelectFilter}
          />
        </React.Fragment>
      </Navbar>
      <Content>
        <ErrorDetail>
          <Container>
            <Row>
              <Col>
                <ErrorNumber>40:4</ErrorNumber>
                <ErrorText>{t("error__text")}</ErrorText>
              </Col>
            </Row>
          </Container>
        </ErrorDetail>
      </Content>
    </SC>
  );
};

export default ErrorComponent;
