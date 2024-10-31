import Router from "next/router";
import toast from "react-hot-toast";
import { RiBookmark2Fill, RiBookmarkFill } from "react-icons/ri";

import surahs from "@utils/surahs";

export const fetchJson = async (url, params) => {
  const a = await fetch(url, params);
  const b = await a.json();
  return b;
};

export const goToSurah = (surah_id) => {
  if (surah_id >= 1 && surah_id <= 114) {
    Router.push(`/[surah_id]`, `/${surah_id}`).then(() =>
      window.scrollTo(0, 0)
    );
  }
};

export const goToVerse = (surah_id, verse_number) => {
  if (verse_number > 0 && surah_id >= 1 && surah_id <= 114) {
    Router.push(
      `/[surah_id]/[verse_number]`,
      `/${surah_id}/${verse_number}`
    ).then(() => window.scrollTo(0, 0));
  }
};

export const goToNextVerse = (surah_id, verse_number) => {
  if (
    surahs().find((i) => i.value === surah_id && i.verse_count > verse_number)
  ) {
    goToVerse(surah_id, verse_number + 1);
  } else {
    if (surah_id < 114) {
      goToVerse(surah_id + 1, 1);
    } else {
      goToVerse(1, 1);
    }
  }
};

export const goToPrevVerse = (surah_id, verse_number) => {
  if (verse_number > 1) {
    goToVerse(surah_id, verse_number - 1);
  } else {
    if (surah_id > 1) {
      const prevSurah = surahs().find((i) => i.value === surah_id - 1);
      goToVerse(prevSurah.value, prevSurah.verse_count);
    } else {
      goToVerse(114, 6);
    }
  }
};

export const goToPage = (page_id, verseMap) => {
  const verseMapHash = verseMap ? `#${verseMap}` : ``;
  Router.push(`/page/[page_id]`, `/page/${page_id}${verseMapHash}`).then(() =>
    window.scrollTo(0, 0)
  );
};

export const goToNextPage = (page_id) => {
  if (page_id < 604) {
    goToPage(+page_id + 1);
  }
};

export const goToPrevPage = (page_id) => {
  if (page_id > 0) {
    goToPage(page_id - 1);
  }
};
// root navigation
export const goToRoot = (latin) => {
  Router.push(`/root/[latin]`, `/root/${latin}`).then(() =>
    window.scrollTo(0, 0)
  );
};

export const authorOptions = (authors, language) => {
  let authorOptions = [];
  // Filter authors based on language and sort them alphabetically
  // For English, only show English authors
  // For other languages, show all authors with that language first
  authors
    .filter((author) =>
      language == "en" ? author.language === language : true
    )
    .sort((a, b) => {
      if (a.language === language && b.language !== language) return -1;
      if (a.language !== language && b.language === language) return 1;
      return a.name.localeCompare(b.name);
    })
    .map((item) => {
      authorOptions.push({ value: item.id, label: item.name });
    });
  return authorOptions;
};

// list of numbers of verses for react-select, 1 to verseCount
export const verseOptions = (verseCount) => {
  let vOptions = [];
  for (let i = 1; i <= verseCount; i++) {
    vOptions.push({ value: i, label: i });
  }
  return vOptions;
};

// react-select custom style
export const selectStyles = (theme) => ({
  control: (base, state) => ({
    ...base,
    cursor: "pointer",
    margin: "0 2px",
    backgroundColor: theme.selectBoxBgColor,
    color: theme.selectBoxColor,
    borderColor: state.isFocused
      ? theme.selectBoxFocusedBorderColor
      : theme.selectBoxUnfocusedBorderColor,
    boxShadow: state.isFocused ? theme.selectBoxShadow : "",
  }),
  singleValue: (base) => ({
    ...base,
    color: theme.selectBoxColor,
  }),
  menu: (base) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: theme.selectBoxBgColor,
    color: theme.selectBoxColor,
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: theme.selectBoxBgColor,
    color: theme.selectBoxColor,
    "&:hover": {
      backgroundColor: theme.selectBoxHoveredBgColor,
    },
  }),
});

export const groupBy = (collection) => {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i]["verse"]["id"];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
};

export const getQuickRandom = async (lang) => {
  let selectedLang = lang || "tr";
  const { data } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/random-search?lang=${selectedLang}`
  );

  if (data) {
    return groupQuickSearch(data);
  }
};

export const getQuickSearch = async (q, lang) => {
  let selectedLang = lang || "tr";
  const { data } = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_URL}/search?q=${q}&type=quick&lang=${selectedLang}`
  );

  if (data) {
    return groupQuickSearch(data);
  }
};

const groupQuickSearch = (data) => {
  let quickGroupResult = [];
  if (data.surahs) {
    data.surahs.map((item) => {
      quickGroupResult.push({ type: "surah", ...item });
    });
  }
  if (data.verses) {
    data.verses.map((item) => {
      quickGroupResult.push({ type: "verse", ...item });
    });
  }
  if (data.hits) {
    groupBy(data.hits).map((item) => {
      quickGroupResult.push({ type: "hits", ...item[0] });
    });
  }

  return quickGroupResult;
};

export const convertToArabicDigit = (digits) => {
  const id = ["۰", "۱", "۲", "۳", "٤", "۵", "٦", "۷", "۸", "۹"];
  return digits.toString().replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

export const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const handleBookmark = ({
  action,
  surahId,
  verseNumber,
  verseId,
  setIsBookmarked,
  notifications,
}) => {
  const values = {
    type: "verse",
    bookmarkItem: {
      surah_id: surahId,
      verse_number: verseNumber,
      path: `/${surahId}/${verseNumber}`,
    },
    action,
    verseId: verseId,
    bookmarkKey: `s${surahId}v${verseNumber}`,
  };

  const locale = process.env.NEXT_PUBLIC_LOCALE;

  toast.promise(
    fetch(`/api/bookmark`, {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        setIsBookmarked?.(action === "add");
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }),
    {
      loading:
        action === "add"
          ? notifications.add_loading
          : notifications.remove_loading,
      success: () => {
        return action === "add"
          ? notifications.add_success
          : notifications.remove_success;
      },
      error: notifications.add_error,
    },
    {
      success: {
        icon:
          action === "add" ? (
            <RiBookmarkFill color="#FBA725" />
          ) : (
            <RiBookmark2Fill />
          ),
      },
      error: {
        icon: <RiBookmarkFill color="#c20000" />,
      },
    }
  );
};

export const escapeHtml = (text) => {
  const refinedText = text.replace(/(<([^>]+)>)/gi, "");
  return refinedText;
};
