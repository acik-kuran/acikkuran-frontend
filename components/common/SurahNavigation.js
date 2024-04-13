import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { CommonNavigation } from "@styles/verse.style";

const SurahNavigationButton = ({ surah, prev, ariaLabel }) => {
  let nextSurahNumber = null;
  if (surah.id < 114 && !prev) {
    nextSurahNumber = surah.id + 1;
  }
  if (surah.id > 1 && prev) {
    nextSurahNumber = surah.id - 1;
  }
  return (
    <CommonNavigation>
      {nextSurahNumber ? (
        <Link
          href={`/[surah_id]`}
          as={`/${nextSurahNumber}`}
          className="button"
          aria-label={ariaLabel}
        >
          <span className="icon">
            {prev ? (
              <RiArrowLeftSLine size="22" />
            ) : (
              <RiArrowRightSLine size="22" />
            )}
          </span>
        </Link>
      ) : (
        <div className="button half-opacity">
          <span className="icon">
            {prev ? (
              <RiArrowLeftSLine size="22" />
            ) : (
              <RiArrowRightSLine size="22" />
            )}
          </span>
        </div>
      )}
    </CommonNavigation>
  );
};

export default SurahNavigationButton;
