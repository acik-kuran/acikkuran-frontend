import { useTranslation } from "next-i18next";
import { SocialProfileJsonLd } from "next-seo";
import React from "react";

const Organization = () => {
  const { t } = useTranslation("common");
  return (
    <SocialProfileJsonLd
      type="Organization"
      name={t("seo__base_title")}
      url={t("seo__base_url")}
      sameAs={[
        "https://www.facebook.com/acikkuran",
        t("social_urls__twitter"),
        t("social_urls__instagram"),
      ]}
    />
  );
};

export default Organization;
