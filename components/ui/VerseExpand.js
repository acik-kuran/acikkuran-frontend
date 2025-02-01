import React from "react";
import { Tooltip } from "react-tippy";
import styled from "styled-components";

import FootnoteFormatter from "./FootnoteFormatter";

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
                      <FootnoteFormatter value={footnote.text} />
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
