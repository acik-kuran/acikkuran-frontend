import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { CommonNavigation } from "@styles/verse.style";

const VerseNavigationButton = ({ surah, prev, verseNumber, ariaLabel }) => {
  let nextVerseNumber = null;
  if (verseNumber < surah.verse_count && !prev) {
    nextVerseNumber = verseNumber + 1;
  }
  if (verseNumber > 1 && prev) {
    nextVerseNumber = verseNumber - 1;
  }
  return (
    <CommonNavigation>
      {nextVerseNumber ? (
        <Link
          href={`/[surah_id]/[verse_number]`}
          as={`/${surah.id}/${nextVerseNumber}`}
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

export default VerseNavigationButton;
