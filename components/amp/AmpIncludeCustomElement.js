import Head from "next/head";
import React from "react";

const AmpIncludeCustomElement = (props) => (
  <Head>
    <script
      async
      custom-element={props.name}
      src={
        "https://cdn.ampproject.org/v0/" +
        props.name +
        "-" +
        props.version +
        ".js"
      }
      key={props.name}
    />
  </Head>
);

export default AmpIncludeCustomElement;
