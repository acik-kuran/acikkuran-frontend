import ReactGA from "react-ga4";
export const initGA = () => {
  let tagId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    // console.log('GA init!');
    ReactGA.initialize(tagId);
  }
};

export const logPageView = () => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    // console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
  }
};
export const logEvent = (category = "", action = "") => {
  if (category && action) {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
      ReactGA.event({ category, action });
    }
  }
};
export const logException = (description = "", fatal = false) => {
  if (description) {
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" &&
      ReactGA.exception({ description, fatal });
  }
};
