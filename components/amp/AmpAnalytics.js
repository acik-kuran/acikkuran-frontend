import React from "react";

import AmpIncludeCustomElement from "./AmpIncludeCustomElement";

const AmpAnalytics = (props) => (
  <React.Fragment>
    <AmpIncludeCustomElement name="amp-analytics" version="0.1" />
    <amp-analytics type={props.type}>
      {props.script && (
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(props.script),
          }}
        />
      )}
    </amp-analytics>
  </React.Fragment>
);

export default AmpAnalytics;
