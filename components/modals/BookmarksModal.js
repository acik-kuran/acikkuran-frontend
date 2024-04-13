import dayjs from "dayjs";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useSession } from "next-auth/react";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RiBook3Line,
  RiBookmark2Fill,
  RiBookmark2Line,
  RiBookmarkFill,
  RiBookmarkLine,
  RiMoreFill,
  RiQuillPenLine,
} from "react-icons/ri";
import { Tooltip } from "react-tippy";
import { useRecoilState } from "recoil";

import Button from "@components/common/Button";
import LoadingBar from "@components/common/LoadingBar";
import VerseExpand from "@components/ui/VerseExpand";
import { modalState } from "@recoil/atoms";
import {
  BookmarkAction,
  BookmarkContainer,
  BookmarkContextMenu,
  BookmarkDate,
  BookmarkEmpty,
  BookmarkList,
  BookmarkLoading,
  BookmarkVerse,
  BookmarkVerseArabic,
  BookmarkVerseNumber,
  BookmarkVerseTranscription,
  BookmarkVerseTranslation,
} from "@styles/bookmark.style";
import { fetchJson } from "@utils/funcs";
import tr from "@utils/javascriptTimeAgo/tr";

import BaseModal from "./BaseModal";

const BookmarksModal = (props) => {
  const router = useRouter();
  const locale = process.env.NEXT_PUBLIC_LOCALE;

  const langs = {
    tr,
    en,
  };

  TimeAgo.addLocale(langs[locale]);
  const timeAgo = new TimeAgo(locale);

  const { t } = useTranslation("common");

  const { modalKey, authorId } = props;

  const title = t("bookmark__title");
  const { data: session } = useSession();

  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginRequired, setIsLoginRequired] = useState(false);
  const [_, setModalInfo] = useRecoilState(modalState);

  const MODAL_WIDTH = 900;

  const handleRemoveBookmark = async (bookmarkKey) => {
    const values = {
      bookmarkKey,
      action: "remove",
    };

    toast.promise(
      fetch(`/api/bookmark`, {
        method: "POST",
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          setBookmarks(
            bookmarks.filter((bookmark) => bookmark.bookmarkKey !== bookmarkKey)
          );
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }),

      {
        loading: t("bookmark__remove_loading"),
        success: t("bookmark__remove_success"),
        error: t("bookmark__remove_error"),
      },
      {
        success: {
          icon: <RiBookmark2Fill />,
        },
        error: {
          icon: <RiBookmarkFill color="#c20000" />,
        },
      }
    );
  };

  const getBookmarks = async () => {
    const data = await fetchJson(`/api/bookmarks?author=${authorId}`);
    data?.users_bookmarks && setBookmarks(data?.users_bookmarks);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      getBookmarks();
    } else {
      setIsLoading(false);
      setIsLoginRequired(true);
    }
  }, []);

  return (
    <BaseModal
      title={title}
      modalKey={modalKey}
      width={MODAL_WIDTH}
      fullscreen
      contentStyle={{ padding: 0 }}
    >
      <BookmarkContainer>
        {isLoading ? (
          <BookmarkLoading>
            <LoadingBar />
          </BookmarkLoading>
        ) : (
          <BookmarkList>
            {!bookmarks.length ? (
              <BookmarkEmpty>
                {isLoginRequired ? (
                  <>
                    <h2>
                      <RiBookmarkLine size="42" />
                    </h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: t("bookmark__login_required"),
                      }}
                    ></p>
                    <p>
                      <Button
                        type="button"
                        fullWidth
                        onClick={() => setModalInfo({ openedModal: "login" })}
                      >
                        {t("login__direction_text")}
                      </Button>
                    </p>
                  </>
                ) : (
                  <>
                    <h2>{t("bookmark__no_bookmark_title")}</h2>

                    <p>
                      <Trans
                        i18nKey="bookmark__no_bookmark_desc"
                        components={{ icon: <RiBookmarkLine /> }}
                      />
                    </p>
                  </>
                )}
                <div className="additional_text">
                  <div>
                    <span>—</span>
                  </div>
                  <span>{t("bookmark__no_bookmark_desc_2")} </span>
                </div>
              </BookmarkEmpty>
            ) : (
              bookmarks.map((bookmark) => {
                const surahNames = {
                  tr: bookmark.verse.surah.name,
                  en: bookmark.verse.surah.name_en,
                };
                return (
                  <BookmarkVerse key={bookmark.id}>
                    <BookmarkVerseNumber>
                      <Link
                        href={`/[surah_id]/[verse_number]`}
                        as={`/${bookmark.verse.surah.id}/${bookmark.verse.verse_number}`}
                        onClick={() => {
                          setModalInfo({ openedModal: null });
                        }}
                      >
                        {t("search__translation_verse_line", {
                          surah_id: bookmark.verse.surah.id,
                          surah_name: surahNames[locale],
                          verse_number: bookmark.verse.verse_number,
                        })}
                      </Link>
                      <BookmarkAction>
                        <BookmarkDate
                          dateTime={bookmark.updated_at}
                          title={dayjs(bookmark.updated_at).format(
                            "DD.MM.YYYY HH:mm:ss"
                          )}
                        >
                          {timeAgo.format(
                            dayjs(bookmark.updated_at).toDate(),
                            "twitter-minute-now"
                          )}
                        </BookmarkDate>
                        <Tooltip
                          interactive
                          tag="span"
                          html={
                            <BookmarkContextMenu>
                              <ul className="tippy-list">
                                <li
                                  onClick={() =>
                                    handleRemoveBookmark(bookmark.bookmarkKey)
                                  }
                                >
                                  <RiBookmark2Line />{" "}
                                  {t("context_menu__remove_bookmark")}
                                </li>
                                <li
                                  onClick={() => {
                                    router.push(
                                      `/${bookmark.verse.surah.id}/${bookmark.verse.verse_number}`
                                    );
                                    setModalInfo({ openedModal: null });
                                  }}
                                >
                                  <RiQuillPenLine />{" "}
                                  {t("context_menu__go_to_verse_detail")}
                                </li>
                                <li
                                  onClick={() => {
                                    router.push(
                                      `/page/${bookmark.verse.page}#${bookmark.verse.surah.id}:${bookmark.verse.verse_number}`
                                    );
                                    setModalInfo({ openedModal: null });
                                  }}
                                >
                                  <RiBook3Line />{" "}
                                  {t("context_menu__go_to_page")}
                                </li>
                              </ul>
                            </BookmarkContextMenu>
                          }
                          theme="light"
                          position="bottom"
                          trigger="click"
                          animation="shift"
                          arrow={true}
                          duration="150"
                        >
                          <RiMoreFill />
                        </Tooltip>
                      </BookmarkAction>
                    </BookmarkVerseNumber>
                    <BookmarkVerseTranslation>
                      <VerseExpand
                        translation={bookmark.verse.translations[0]}
                        showFootnotes={false}
                      />
                    </BookmarkVerseTranslation>
                    <BookmarkVerseArabic>
                      {bookmark.verse.verse}
                    </BookmarkVerseArabic>
                    <BookmarkVerseTranscription>
                      {bookmark.verse.transcription}
                    </BookmarkVerseTranscription>
                  </BookmarkVerse>
                );
              })
            )}
          </BookmarkList>
        )}
      </BookmarkContainer>
    </BaseModal>
  );
};

export default BookmarksModal;
