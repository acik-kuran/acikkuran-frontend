import styled, { css } from "styled-components";
import { BaseModalBackground } from "styled-react-modal";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  ${(props) => css`
    z-index: 9998 !important;
    width: ${props.width}px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${props.theme.bodyBackground};
    position: relative;
    height: max-content;
    margin: 0 24px;

    @media only screen and (max-width: ${props.theme.sizes.sm}) {
      margin: 0;
    }

    ${props.height &&
    css`
      max-height: ${props.height} !important;
    `}

    ${props.isMobile &&
    css`
      @keyframes slide-in-bottom {
        0% {
          -webkit-transform: translateY(500px);
          transform: translateY(500px);
          opacity: 1;
        }
        100% {
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
      }
      position: absolute;
      width: 100vw !important;
      bottom: 0;
      animation: slide-in-bottom 0.3s cubic-bezier(0.25, 0.2, 0.2, 1) both;
      height: max-content;
      border-radius: 8px 8px 0 0;
    `}

    

      ${props.isMobile &&
    props.fullscreen &&
    css`
      height: 100dvh;
      max-height: unset;
      border-radius: 0;
    `}
  `}
        
  `;

const StyledModalHeaderLeft = styled.div`
  position: absolute;
  left: 24px;
  a {
    font-weight: 600;
    cursor: pointer;
  }
`;
const StyledModalHeader = styled.div`
  ${({ theme }) => css`
    user-select: none;
    width: 100%;
    border-bottom: 1px solid ${theme.lineBorderBottomColor};
    height: 3.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 9998;

    h3 {
      font-size: 1.15em;
      color: ${theme.primaryDark};
      font-weight: 600;
      line-height: 0;
      margin-top: 3px;
      @media only screen and (max-width: ${theme.sizes.xs}) {
        font-size: 1.15em;
      }
    }

    svg {
      @media print {
        display: none;
      }
      cursor: pointer;
      margin-right: 10px;
      padding: 8px;
      width: 2.25em;
      height: 2.25em;
      @media (hover: hover) {
        :hover {
          background: ${theme.secondaryColor};
          border-radius: 50%;
        }
      }
      position: absolute;
      right: 4px;
    }
  `}
`;

const StyledModalContent = styled.div`
  ${({ theme }) => css`
    flex-grow: 1;
    padding: 24px;
    z-index: 9998;
    width: 100%;
    @media only screen and (max-width: ${theme.sizes.sm}) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
  `}
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  z-index: 9998 !important;
  height: -webkit-fill-available;
`;

export {
  StyledModal,
  StyledModalHeader,
  StyledModalContent,
  StyledModalHeaderLeft,
  FadingBackground,
};
