import localesConfig from "locales.config";

export default (router, customAsPath) => {
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  return localesConfig
    .filter((i) => i.locale != locale)
    .map((item) => {
      return {
        hrefLang: item.locale === "en" ? "x-default" : item.locale,
        href: `https://${item.domain}${customAsPath || router.asPath}`,
      };
    });
};
