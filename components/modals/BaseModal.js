import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useRecoilState } from "recoil";
import useMobileDetect from "use-mobile-detect-hook";

import { modalState } from "@recoil/atoms";
import {
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalHeaderLeft,
} from "@styles/modal.style";

const BaseModal = (props) => {
  const detectMobile = useMobileDetect();
  const {
    title,
    modalKey,
    children,
    width = 400,
    height = null,
    headerLeft,
    fullscreen = false,
    contentStyle,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  function afterOpen() {
    // setTimeout(() => {}, 100);
  }

  function beforeClose() {
    // return new Promise((resolve) => {
    //   setTimeout(resolve, 300);
    // });
  }

  const closeModal = () => {
    setModalInfo({ openedModal: null });
  };

  useEffect(() => {
    setIsOpen(modalInfo?.openedModal === modalKey);
  }, [modalInfo]);

  return (
    <StyledModal
      fullscreen={fullscreen}
      isMobile={detectMobile.isMobile()}
      width={width}
      height={height}
      isOpen={isOpen}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <StyledModalHeader>
        {headerLeft && (
          <StyledModalHeaderLeft>{headerLeft}</StyledModalHeaderLeft>
        )}
        <h3>{title}</h3>
        <RiCloseLine onClick={closeModal} />
      </StyledModalHeader>
      <StyledModalContent style={contentStyle}>{children}</StyledModalContent>
    </StyledModal>
  );
};

export default BaseModal;
