import { useRecoilValue } from "recoil";
import { ModalProvider } from "styled-react-modal";

import { modalState } from "@recoil/atoms";
import { FadingBackground } from "@styles/modal.style";

import AuthorSelectionModal from "./AuthorSelectionModal";
import BookmarksModal from "./BookmarksModal";
import LoginModal from "./LoginModal";
import SettingsModal from "./SettingsModal";
import StatsModal from "./StatsModal";

const Modals = (props) => {
  const { authorId } = props;
  const modalInfo = useRecoilValue(modalState);

  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      {modalInfo?.openedModal === "login" && <LoginModal modalKey="login" />}
      {modalInfo?.openedModal === "settings" && (
        <SettingsModal modalKey="settings" />
      )}
      {modalInfo?.openedModal === "stats" && <StatsModal modalKey="stats" />}
      {modalInfo?.openedModal === "bookmarks" && (
        <BookmarksModal
          modalKey="bookmarks"
          fullscreen={true}
          authorId={authorId}
        />
      )}
      {modalInfo?.openedModal === "authorSelection" && (
        <AuthorSelectionModal modalKey="authorSelection" fullscreen={true} />
      )}
    </ModalProvider>
  );
};

export default Modals;
