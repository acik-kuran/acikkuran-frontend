import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { CommonNavigation } from "@styles/verse.style";

const pageNavigationButton = ({ page_id, prev, ariaLabel }) => {
  let nextPageNumber = null;
  if (page_id < 605 && !prev) {
    nextPageNumber = page_id + 1;
  }
  if (page_id >= 0 && prev) {
    nextPageNumber = page_id - 1;
  }

  return (
    <CommonNavigation>
      {nextPageNumber >= 0 && nextPageNumber < 605 ? (
        <Link
          href={`/page/[page_id]`}
          as={`/page/${nextPageNumber}`}
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

export default pageNavigationButton;
