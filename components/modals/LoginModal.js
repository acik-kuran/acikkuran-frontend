import { Formik } from "formik";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@components/common/Button";
import { envInfoState, modalState } from "@recoil/atoms";
import {
  FormAlert,
  FormGeneric,
  FormInput,
  FormItem,
  FormSeperator,
  FormSubmit,
  Login,
  LoginModalContainer,
} from "@styles/form.style";
import { fetchJson } from "@utils/funcs";

import BaseModal from "./BaseModal";

const LoginModal = (props) => {
  const { modalKey, fullscreen } = props;
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const MODAL_WIDTH = 400;
  const router = useRouter();
  const { t } = useTranslation("common");

  const envInfo = useRecoilValue(envInfoState);
  const recaptchaRef = createRef();
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
      return object.target.value;
    }
  };

  return (
    <BaseModal
      title={t("login__title")}
      modalKey={modalKey}
      width={MODAL_WIDTH}
      fullscreen={fullscreen}
      contentStyle={{ padding: "0" }}
    >
      <LoginModalContainer>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = t("login__form__email_placeholder");
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email.trim()
              )
            ) {
              errors.email = t("login__form__email_error");
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (activeStep === 1) {
              setSubmitting(true);
              setIsProcessing(true);
              const token = await recaptchaRef.current
                .executeAsync()
                .then((token) => token)
                .catch(() => {});

              if (token) {
                await fetchJson(`/api/create-password`, {
                  method: "POST",
                  body: JSON.stringify({ email: values.email, token }),
                })
                  .then((res) => {
                    if (res.success) {
                      setActiveStep(2);
                      setSubmitting(false);
                      setIsProcessing(false);
                    } else {
                      toast(t("error__title"), {
                        icon: "😞",
                      });
                    }
                  })
                  .catch(() => {
                    toast(t("error__title"), {
                      icon: "😞",
                    });
                  });
              } else {
                toast(t("error__title"), {
                  icon: "😞",
                });
              }
            }

            if (activeStep === 2) {
              setIsProcessing(true);
              await signIn("credentials", {
                email: values.email,
                password: values.password,
              })
                .then(() => {
                  setIsProcessing(false);
                  setModalInfo({ openedModal: null });
                  return;
                })
                .catch(() => {
                  toast(t("error__title"), {
                    icon: "😞",
                  });
                  router.push("/");
                  setIsProcessing(false);
                });
            }
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Login>
              <FormGeneric onSubmit={handleSubmit}>
                {activeStep === 1 && (
                  <FormItem>
                    {modalInfo?.modalProps?.message && (
                      <FormAlert>{modalInfo.modalProps.message}</FormAlert>
                    )}
                    <label>{t("login__form__email_label")}</label>
                    <FormInput
                      name="email"
                      autoFocus={envInfo === "ios" || envInfo === "android"}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      placeholder={t("login__form__email_placeholder")}
                    />
                    {errors.email && <span>{errors.email}</span>}
                  </FormItem>
                )}
                {activeStep === 2 && (
                  <FormItem>
                    <FormAlert>
                      {t("login__form__email_sent")}
                      <br />
                      <strong>{t("login__form__otp_label")}</strong>
                    </FormAlert>
                    <label>{t("login__form__password_label")}</label>
                    <FormInput
                      name="password"
                      type="number"
                      autoFocus
                      placeholder="****"
                      onBlur={handleBlur}
                      value={values.password}
                      onInput={maxLengthCheck}
                      onChange={handleChange}
                      maxLength={4}
                      autoComplete="new-password"
                    />
                  </FormItem>
                )}
                <FormSubmit>
                  {activeStep === 1 && (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
                    />
                  )}
                  <Button
                    type="submit"
                    disabled={
                      values === !!Object.keys(errors).length ||
                      isSubmitting ||
                      (activeStep === 1 && (errors.email || !values.email)) ||
                      (activeStep === 2 &&
                        (!values.password ||
                          values.password.toString().length !== 4)) ||
                      isProcessing
                    }
                    fullwidth
                  >
                    {isProcessing
                      ? t("login__form__continue_button_loading_label")
                      : (activeStep === 1 &&
                          t("login__form__continue_button_label")) ||
                        (activeStep === 2 &&
                          t("login__form__login_button_label"))}
                  </Button>
                </FormSubmit>
              </FormGeneric>
              {activeStep === 1 &&
                envInfo !== "ios" &&
                envInfo !== "android" && (
                  <>
                    <FormSeperator>
                      <span>{t("login__form__divider_text")}</span>
                    </FormSeperator>
                    <div
                      role="button"
                      tabIndex="0"
                      aria-label={t("login__form__login_with_google")}
                      className="google-signin"
                      onClick={() => signIn("google")}
                    >
                      <img src={`/images/google-signin-${locale}.png`} />
                    </div>
                  </>
                )}
            </Login>
          )}
        </Formik>
      </LoginModalContainer>
    </BaseModal>
  );
};

export default LoginModal;
