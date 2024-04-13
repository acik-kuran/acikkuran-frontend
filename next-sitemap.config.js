const surahs_tr = require("./data/surahsEn");

module.exports = {
  siteUrl: "https://en.acikkuran.com",
  generateRobotsTxt: true, // (optional)
  exclude: ["/about", "/search"], // (optional)
  sitemapBaseFileName: "sitemap-en",
  sitemapSize: 2000,
  additionalPaths: async () => {
    const result = [];

    surahs_tr.forEach((surah) => {
      result.push({
        loc: `/${surah.slug}`,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });

      for (let i = 1; i <= surah.verse_count; i++) {
        result.push({
          loc: `/${surah.slug}/verse-${i}`,
          changefreq: "monthly",
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      }

      for (let i = 1; i <= surah.verse_count; i++) {
        result.push({
          loc: `/${surah.slug}/verse-${i}?amp=1`,
          changefreq: "monthly",
          priority: 0.9,
          lastmod: new Date().toISOString(),
        });
      }
    });

    return result;
  },
};
