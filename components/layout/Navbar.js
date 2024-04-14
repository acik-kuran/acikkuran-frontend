import localesConfig from "locales.config";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { RiHome6Line, RiSearchLine } from "react-icons/ri";

import Button from "@components/common/Button";
import {
  Bottom,
  BottomContainer,
  Nav,
  NavCenter,
  NavContainer,
  NavHome,
  NavLeft,
  NavRight,
  NavSearch,
} from "@styles/navbar.style";
import theme from "@styles/theme";

const MobileSearch = dynamic(() => import("@components/ui/MobileSearch"), {
  ssr: false,
  loading: () => <></>,
});
const DesktopSearch = dynamic(() => import("@components/ui/DesktopSearch"), {
  ssr: false,
  loading: () => <></>,
});

const Navbar = (props) => {
  const { hideSearchButton, hideBottom, children, isAmp } = props;
  const { t } = useTranslation();
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const [navWidth, setNavWidth] = useState(
    theme.awesomegrid.breakpoints.lg * 16
  );
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    setNavWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setNavWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });

  const localeItem = localesConfig.find((l) => l.locale == locale);
  const ComputedLogo = useMemo(() => {
    return localeItem.logo.component;
  });

  const ComputedLogoHeight = useMemo(() => {
    return localeItem.logo.height;
  });

  return (
    <React.Fragment>
      <Nav>
        <NavContainer isAmp={isAmp}>
          <NavLeft>
            {children[0]}
            {!isAmp &&
              !hideSearchButton &&
              navWidth <= theme.awesomegrid.breakpoints.sm * 16 && (
                <NavSearch>
                  <Button
                    type="text"
                    aria-label={t("navigation__search_button_arialabel")}
                    onClick={() => setShowSearch(true)}
                    style={{ marginLeft: 2 }}
                  >
                    <span className="icon">
                      <RiSearchLine />
                    </span>
                  </Button>
                </NavSearch>
              )}
          </NavLeft>

          {navWidth >= theme.awesomegrid.breakpoints.sm * 16 && (
            <React.Fragment>
              {!isAmp && (
                <NavCenter height={ComputedLogoHeight}>
                  <Link href="/" aria-label={t("navigation__go_to_homepage")}>
                    <ComputedLogo />
                  </Link>
                </NavCenter>
              )}

              {!isAmp && (
                <NavRight>
                  {!hideSearchButton && (
                    <React.Fragment>
                      {navWidth <= theme.awesomegrid.breakpoints.md * 16 ? (
                        <>
                          {!isAmp && (
                            <NavSearch>
                              <Link
                                href="/"
                                aria-label={t("navigation__go_to_homepage")}
                                style={{ marginLeft: 4 }}
                              >
                                <span className="icon">
                                  <RiHome6Line />
                                </span>
                              </Link>
                            </NavSearch>
                          )}
                          {!isAmp && (
                            <NavSearch>
                              <Button
                                type="text"
                                onClick={() => setShowSearch(true)}
                                aria-label={t(
                                  "navigation__search_button_arialabel"
                                )}
                              >
                                <span className="icon">
                                  <RiSearchLine />
                                </span>
                              </Button>
                            </NavSearch>
                          )}
                        </>
                      ) : (
                        <>
                          {!isAmp && (
                            <NavSearch>
                              <Button
                                type="text"
                                onClick={() => setShowSearch(true)}
                                aria-label={t(
                                  "navigation__search_button_arialabel"
                                )}
                              >
                                <span className="icon">
                                  <RiSearchLine />
                                </span>
                              </Button>
                            </NavSearch>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  )}
                  {children[1]}
                </NavRight>
              )}
              {!hideSearchButton && showSearch && (
                <DesktopSearch setShowSearch={setShowSearch}></DesktopSearch>
              )}
            </React.Fragment>
          )}
        </NavContainer>
      </Nav>
      {!hideBottom && navWidth <= theme.awesomegrid.breakpoints.sm * 16 && (
        <React.Fragment>
          <Bottom>
            <BottomContainer>
              <NavHome>
                <Link
                  href="/"
                  className="button"
                  aria-label={t("navigation__go_to_homepage")}
                >
                  <span className="icon">
                    <RiHome6Line />
                  </span>
                </Link>
              </NavHome>
              {children[1]}
            </BottomContainer>
          </Bottom>
        </React.Fragment>
      )}
      {!hideSearchButton &&
        showSearch &&
        navWidth <= theme.awesomegrid.breakpoints.sm * 16 && (
          <MobileSearch setShowSearch={setShowSearch}></MobileSearch>
        )}
    </React.Fragment>
  );
};

export default Navbar;
