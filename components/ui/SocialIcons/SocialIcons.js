import {
  RiGithubLine,
  RiInstagramLine,
  RiMailLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { TbBrandPatreon } from "react-icons/tb";
import { useRecoilValue } from "recoil";

import { envInfoState } from "@recoil/atoms";
import { initGA, logEvent } from "@utils/analytics";

import { SC } from "./SocialIcons.style";

const SocialIcon = ({ icon: Component, url, name }) => {
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  return (
    <a
      onClick={() => {
        if (!window.GA_INITIALIZED) {
          initGA();
          window.GA_INITIALIZED = true;
        }
        logEvent("goto-social", `goto-social: ${url}`);
      }}
      className="social-icons__item"
      href={url}
      rel="nofollow noopener noreferrer"
      target="_blank"
      aria-label={name}
    >
      <Component />
    </a>
  );
};

const SocialIcons = ({ isFooter = false }) => {
  const envInfo = useRecoilValue(envInfoState);
  return (
    <SC isFooter={isFooter}>
      <SocialIcon
        url="https://x.com/acikkuran"
        icon={RiTwitterXLine}
        name="twitter"
      />
      <SocialIcon
        url="https://www.instagram.com/acikkuran"
        icon={RiInstagramLine}
        name="instagram"
      />
      <SocialIcon
        url="https://github.com/acik-kuran"
        icon={RiGithubLine}
        name="github"
      />
      <SocialIcon
        url="mailto:selam@acikkuran.com"
        icon={RiMailLine}
        name="e-mail"
      />
      {envInfo !== "ios" && (
        <SocialIcon
          url="https://www.patreon.com/join/acikkuran"
          icon={TbBrandPatreon}
          name="patreon"
        />
      )}
    </SC>
  );
};

export default SocialIcons;
