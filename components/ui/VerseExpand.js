import Link from "next/link";
import Router from "next/router";
import React from "react";
import reactStringReplace from "react-string-replace";
import { Tooltip } from "react-tippy";
import styled from "styled-components";

const nl2br = require("react-nl2br");

const FootnoteAsterix = styled.span`
  cursor: pointer;
  font-weight: bold;
  :hover {
    color: ${(props) => props.theme.linkColor};
  }
`;

const verseExpand = (props) => {
  const { translation, showFootnotes, isAmp } = props;
  if (!translation || !translation?.text) {
    return null;
  }
  const { text, footnotes, _formatted } = translation;
  const finalText = _formatted ? _formatted.text : text;
  const verseParts = finalText?.split(/\]/) || [];

  // refactor it please
  const refineGrammar = (value) => {
    if (!value) return "";
    value = value.replace(" ,", ",");
    value = value.replace(" .", ".");
    value = value.replace(" :", ":");
    value = value.replace(" ;", ";");
    return value;
  };

  const textFormat = (value) => {
    let newValue = reactStringReplace(
      value,
      /(\b\d+[:\/]\d+\b)/g,
      (match, i) => {
        const newMatch = match.replace(":", "/");
        const part = newMatch.split("/");
        return (
          <Link
            key={i}
            href={`/[surah_id]/[verse_number]`}
            as={`/${part[0]}/${part[1]}`}
            style={{ fontWeight: "bold" }}
            onClick={(e) => {
              Router.push(`/${part[0]}/${part[1]}`);
              e.preventDefault();
              return false;
            }}
          >
            {match.replace("/", ":")}
          </Link>
        );
      }
    );

    newValue = nl2br(newValue);

    return newValue;
  };

  return (
    <React.Fragment>
      {!showFootnotes && (
        <p
          dangerouslySetInnerHTML={{
            __html: refineGrammar(
              (_formatted?.text || text)?.replace(/\[.*?\]/g, "").trim()
            ),
          }}
        />
      )}
      {showFootnotes &&
        verseParts.map((i, index) => {
          const textClean = i.split("[")[0];

          const verseText = refineGrammar(textClean);

          const footnoteNumber = i.split("[")[1];
          const footnote =
            footnotes && footnotes.find((i) => i.number == footnoteNumber);
          return (
            <React.Fragment key={index}>
              {verseText}
              {!isAmp && footnoteNumber && footnote && (
                <Tooltip
                  interactive
                  tag="span"
                  html={
                    <div
                      style={{
                        padding: 10,
                        textAlign: "left",
                        overflowY: "auto",
                        maxHeight: 300,
                      }}
                    >
                      {textFormat(footnote.text)}
                    </div>
                  }
                  theme="light"
                  position="bottom"
                  trigger="click"
                  animation="shift"
                  arrow={true}
                  duration="150"
                >
                  <FootnoteAsterix>*</FootnoteAsterix>
                </Tooltip>
              )}
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default verseExpand;
