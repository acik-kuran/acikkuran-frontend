import styled, { css } from "styled-components";

const Login = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    .google-signin {
      background-color: #fff;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 200px;
      }
      border-radius: 4px;
      box-shadow: rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 12%) 0px 1px 1px 0px,
        rgb(${theme.formInputBorderSecondary} / 16%) 0px 0px 0px 1px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorderSecondary} / 8%) 0px 2px 5px 0px;
      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;

const LoginModalContainer = styled.div`
  max-height: calc(100dvh - 200px);
  height: 100%;
  padding: 24px;
  overflow-y: auto;
`;

const FormAlert = styled.div`
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  box-sizing: border-box;
  padding: 8px 12px;
  line-height: 1.5;
  list-style: none;
  position: relative;
  align-items: center;
  word-wrap: break-word;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;
`;

const FormQuote = styled.blockquote`
  ${({ theme }) => css`
    background-color: ${theme.chartBackgroundColor};
    box-sizing: border-box;
    padding: 24px;
    line-height: 1.5;
    align-items: center;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 24px;
    color: ${theme.primaryTextColor};
    a {
      font-weight: 600;
    }
  `}
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
  label {
    padding-bottom: 12px;
    font-weight: 600;
  }
  input {
    padding: 12px;
  }
  span {
    color: gray;
    font-size: 11px;
    line-height: 15px;
    margin-top: 6px;
    font-style: italic;
  }
`;

const FormSeperator = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 14px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 30px;
    span {
      font-size: 12px;
      font-weight: 600;
      background-color: ${theme.bodyBackground};
      padding: 0 10px;
      color: #888;
      text-transform: uppercase;
    }
  `}
`;

const FormSelectItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  label {
    font-weight: 600;
    display: flex;
    align-items: center;
    svg {
      margin-left: 4px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  input {
    padding: 12px;
  }
`;

const FormSwitchItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  label {
    font-weight: 600;
    display: flex;
    align-items: center;
    svg {
      margin-left: 4px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
  input {
    padding: 12px;
  }
`;

const FormItemDivider = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    text-align: center;
    color: ${theme.primaryTextcolor};
    font-size: 0.75em;
    margin-bottom: 2em;
    text-transform: uppercase;
    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px dashed ${theme.borderHover};
    }
    &:not(:empty)::before {
      margin-right: 0.5em;
    }
    &:not(:empty)::after {
      margin-left: 0.5em;
    }
  `}
`;

const FormSubmit = styled.div`
  a {
    margin-right: 24px;
  }
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const FormInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.inputBackground};
    color: ${theme.enSiyah};
    font-size: 1em;
    font-family: var(--font-inter);

    &:disabled {
      background: ${theme.bunedir};
    }

    box-shadow: rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
      rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
      rgb(${theme.formInputBorder} / 12%) 0px 1px 1px 0px,
      rgb(${theme.formInputBorderSecondary} / 16%) 0px 0px 0px 1px,
      rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
      rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
      rgb(${theme.formInputBorderSecondary} / 8%) 0px 2px 5px 0px;
    border: 0px;
    border-radius: 4px;
    outline: none;

    &:hover {
      color: ${theme.enSiyah};
      box-shadow: rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 12%) 0px 1px 1px 0px,
        rgb(${theme.formInputBorderSecondary} / 16%) 0px 0px 0px 1px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px;
    }

    &:focus {
      box-shadow: rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(58 151 212 / 36%) 0px 0px 0px 4px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorderSecondary} / 16%) 0px 0px 0px 1px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px,
        rgb(${theme.formInputBorder} / 0%) 0px 0px 0px 0px;
    }
  `}
`;

const FormInputError = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 15px;
  color: rgb(178, 1, 16);
`;

const FormGeneric = styled.form`
  width: 100%;
`;

const FormBottomLink = styled.a`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
  cursor: pointer;
`;

export {
  Login,
  FormItem,
  FormSubmit,
  FormInput,
  FormInputError,
  FormGeneric,
  FormBottomLink,
  FormSwitchItem,
  FormSelectItem,
  FormItemDivider,
  FormSeperator,
  FormAlert,
  FormQuote,
  LoginModalContainer,
};
