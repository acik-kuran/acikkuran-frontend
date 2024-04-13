import { useTranslation } from "next-i18next";
import { SocialProfileJsonLd } from "next-seo";
import React from "react";

const Organization = () => {
  const { t } = useTranslation();
  return (
    <SocialProfileJsonLd
      type="Organization"
      name={t("seo__base_title")}
      url={t("seo__base_url")}
      sameAs={[
        "https://www.facebook.com/acikkuran",
        "https://www.instagram.com/acikkuran",
        "https://x.com/acikkuran", // TODO: locale
      ]}
    />
  );
};

export default Organization;
