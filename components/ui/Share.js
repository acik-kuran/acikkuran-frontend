import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  RiCheckboxCircleLine,
  RiFacebookBoxLine,
  RiQuillPenLine,
  RiShareForward2Fill,
  RiShareLine,
  RiTwitterXLine,
} from "react-icons/ri";
import { Tooltip } from "react-tippy";
import styled from "styled-components";

import Button from "@components/common/Button";

const SC = styled.div`
  div {
    display: flex !important;
  }
`;

const Share = (props) => {
  const { url, verse } = props;
  const { t } = useTranslation("common");
  const href = `${t("seo__base_url")}${url}`;
  const [urlCopied, setUrlCopied] = useState(false);
  const [verseCopied, setVerseCopied] = useState(false);
  return (
    <SC>
      <Tooltip
        interactive
        html={
          <div
            className="share-links"
            style={{
              padding: "10px 0",
              textAlign: "left",
              width: 200,
            }}
          >
            <ul className="tippy-list">
              {verse && (
                <CopyToClipboard
                  onCopy={() => {
                    setVerseCopied(true);
                    setTimeout(() => {
                      setVerseCopied(false);
                    }, 3500);
                  }}
                  text={verse}
                  aria-label={t("share__copy_verse")}
                >
                  <li>
                    {verseCopied ? (
                      <React.Fragment>
                        <RiCheckboxCircleLine />{" "}
                        {t("share__copy_verse_success")}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <RiQuillPenLine />
                        {t("share__copy_verse")}
                      </React.Fragment>
                    )}
                  </li>
                </CopyToClipboard>
              )}
              <CopyToClipboard
                onCopy={() => {
                  setUrlCopied(true);
                  setTimeout(() => {
                    setUrlCopied(false);
                  }, 3500);
                }}
                text={href}
                aria-label={t("share__copy_link")}
              >
                <li>
                  {urlCopied ? (
                    <React.Fragment>
                      <RiCheckboxCircleLine /> {t("share__copy_link_success")}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <RiShareForward2Fill />
                      {t("share__copy_link")}
                    </React.Fragment>
                  )}
                </li>
              </CopyToClipboard>
              <li
                onClick={() =>
                  window.open(
                    `https://x.com/intent/tweet/?url=${href}`,
                    "Twitter",
                    "height=285,width=550,resizable=1"
                  )
                }
                aria-label={t("share__twitter")}
              >
                <RiTwitterXLine />
                {t("share__twitter")}
              </li>
              <li
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${href}`,
                    "Facebook",
                    "height=269,width=550,resizable=1"
                  )
                }
                aria-label={t("share__facebook")}
              >
                <RiFacebookBoxLine />
                {t("share__facebook")}
              </li>
            </ul>
          </div>
        }
        theme="light"
        position="bottom"
        trigger="click"
        animation="shift"
        arrow={true}
        duration="150"
      >
        <Button
          type="text"
          aria-label={t("share__base_title")}
          aria-haspopup="menu"
        >
          <RiShareLine />
        </Button>
      </Tooltip>
    </SC>
  );
};

export default Share;
