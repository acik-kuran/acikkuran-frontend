import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useDarkMode = (currentTheme) => {
  const [theme, setTheme] = useState(currentTheme);
  const [mountedComponent, setMountedComponent] = useState(false);
  const setMode = (mode) => {
    document.cookie = `theme=${mode};max-age=315360000;path=/;SameSite=Lax;Secure`;
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = Cookies.get("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
    setMountedComponent(true);
  }, []);

  return [theme, themeToggler, mountedComponent];
};
