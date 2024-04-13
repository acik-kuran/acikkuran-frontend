import { setCookie } from "cookies-next";
import cookies from "next-cookies";

import defaultAuthorSelections from "@data/defaultAuthorSelections";
import defaultAuthors from "@data/defaultAuthors";

const settingsWithLocale = (locale, settings) => {
  if (locale === "en" && settings) {
    return {
      ...settings,
      a: settings.a_en || settings.a,
    };
  } else {
    return settings;
  }
};

export default function ({ session, ctx }) {
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const defaultAuthorId = defaultAuthors[locale];

  const defaultSettings = {
    a: defaultAuthorId,
    hT: null,
    hC: null,
    sF: null,
    hO: null,
  };

  let settings =
    settingsWithLocale(locale, cookies(ctx).settings) || defaultSettings;

  let authorSelections = cookies(ctx).a_s || defaultAuthorSelections[locale];

  const cookieOptions = {
    req: ctx.req,
    res: ctx.res,
    maxAge: 60 * 6 * 24 * 12226,
  };

  if (session) {
    const settingsFromSession =
      settingsWithLocale(locale, session.user.settings) || settings;

    if (JSON.stringify(settings) !== JSON.stringify(settingsFromSession)) {
      settings = settingsFromSession;
      setCookie("settings", JSON.stringify(settings), cookieOptions);
    }

    const authorSelectionsFromSession = session.user.author_selections;

    if (
      authorSelections == [] ||
      authorSelections == "undefined" ||
      authorSelections == null
    ) {
      authorSelections = defaultAuthorSelections[locale];
    }

    if (
      authorSelectionsFromSession?.[locale] &&
      JSON.stringify(authorSelectionsFromSession?.[locale]) !=
        JSON.stringify(authorSelections)
    ) {
      authorSelections = authorSelectionsFromSession[locale];
      setCookie(
        "a_s",
        `${JSON.stringify(authorSelectionsFromSession[locale])}`,
        cookieOptions
      );
    }
  }

  const authorId = settings?.a || defaultAuthorId;

  return { locale, settings, authorId, authorSelections };
}
