/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  disable: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",
  register: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
  dest: "public",
  sw: "sw.js",
});

const nextConfig = {
  i18n,
  swcMinify: true,
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      displayName: process.env.NEXT_PUBLIC_ENVIRONMENT !== "production",
      ssr: true,
      fileName: false,
      meaninglessFileNames: ["index", "styles"],
      pure: true,
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
