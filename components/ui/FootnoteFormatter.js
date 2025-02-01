import Link from "next/link";
import Router from "next/router";
import React from "react";

const TextFormatter = ({ value }) => {
  // Format {{2:184}}Bakara 2:184{{/}} pattern first
  const formatDetailedReferences = (text) => {
    const DETAILED_PATTERN = /{{(\d+:\d+)}}(.*?){{\/}}/g;
    const parts = [];
    let lastIndex = 0;

    text.replace(DETAILED_PATTERN, (match, verseRef, description, offset) => {
      // Add text before the match
      if (offset > lastIndex) {
        parts.push(text.slice(lastIndex, offset));
      }

      // Split verse reference
      const [surahId, verseNumber] = verseRef.split(":");

      // Create link component
      parts.push(
        <Link
          key={`detailed-${offset}`}
          href={`/${surahId}/${verseNumber}`}
          style={{ fontWeight: "bold" }}
          onClick={(e) => {
            e.preventDefault();
            Router.push(`/${surahId}/${verseNumber}`);
          }}
        >
          {description}
        </Link>
      );

      lastIndex = offset + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  // Format simple verse references (2:3 or 2/3)
  const formatSimpleReferences = (content) => {
    if (typeof content !== "string") return content;

    const SIMPLE_PATTERN = /\b(\d+[:\/]\d+)\b/g;
    const parts = [];
    let lastIndex = 0;

    content.replace(SIMPLE_PATTERN, (match, verseRef, offset) => {
      // Add text before the match
      if (offset > lastIndex) {
        parts.push(content.slice(lastIndex, offset));
      }

      // Process verse reference
      const [surahId, verseNumber] = verseRef.replace(":", "/").split("/");

      // Create link component
      parts.push(
        <Link
          key={`simple-${offset}`}
          href={`/${surahId}/${verseNumber}`}
          style={{ fontWeight: "bold" }}
          onClick={(e) => {
            e.preventDefault();
            Router.push(`/${surahId}/${verseNumber}`);
          }}
        >
          {verseRef.includes("/") ? verseRef.replace("/", ":") : verseRef}
        </Link>
      );

      lastIndex = offset + match.length;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  const formatText = (text) => {
    // First process detailed references
    const detailedProcessed = formatDetailedReferences(text);

    // Then process simple references in each text segment
    return detailedProcessed.map((part, index) => {
      if (typeof part === "string") {
        return (
          <React.Fragment key={`processed-${index}`}>
            {formatSimpleReferences(part)}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  // Split by newlines and process each line
  const formatLines = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={`line-${index}`}>
        {formatText(line)}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return <div>{formatLines(value)}</div>;
};

export default TextFormatter;
