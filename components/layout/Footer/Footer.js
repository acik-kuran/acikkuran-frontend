import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import SocialIcons from "@components/ui/SocialIcons";
import themeVars from "@styles/theme";
import { PlayerContext } from "@utils/playerProvider";

import { CopyLeft, FooterWrapper, SC } from "./Footer.style";

const Footer = (props) => {
  const { home } = props;
  const { audioSurah } = useContext(PlayerContext);
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const year = useMemo(() => {
    return new Date().getFullYear();
  });
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const computedFavicon = useMemo(() => {
    const computedTheme =
      home & (viewportWidth <= themeVars.awesomegrid.breakpoints.sm * 16)
        ? "dark"
        : theme;
    return `/locales/${locale}/images/manifest/favicon-${computedTheme}.png`;
  });
  return (
    <SC
      mp3={audioSurah && audioSurah.audio && audioSurah.audio.mp3}
      home={home}
    >
      <FooterWrapper>
        <CopyLeft>
          <span>{year} </span>{" "}
          <Link href="/about">
            <img
              src={computedFavicon}
              alt="Açık Kuran Logo"
              width={24}
              height={24}
            />
            {t("seo__base_title")}
          </Link>
        </CopyLeft>

        <SocialIcons isFooter />
      </FooterWrapper>
    </SC>
  );
};

export default Footer;
