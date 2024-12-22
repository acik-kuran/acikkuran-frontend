import { setCookie } from "cookies-next";
import { Formik } from "formik";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RiHistoryLine,
  RiLogoutBoxLine,
  RiSettings5Line,
  RiUser4Line,
} from "react-icons/ri";
import Switch from "react-switch";
import { useRecoilState } from "recoil";

import Button from "@components/common/Button";
import Selectbox from "@components/common/Selectbox";
import { modalState } from "@recoil/atoms";
import {
  FormGeneric,
  FormInput,
  FormItem,
  FormItemDivider,
  FormSelectItem,
  FormSubmit,
  FormSwitchItem,
} from "@styles/form.style";
import {
  Logout,
  ProfileLoginArea,
  SettingsModalContainer,
  Tab,
  TabList,
  TabPanel,
  TabText,
  Tabs,
} from "@styles/settings.style";
import { authorOptions, fetchJson } from "@utils/funcs";

import BaseModal from "./BaseModal";
import StatsModal from "./StatsModal";

const fontOptions = [
  { value: 1, label: "1"},
  { value: 1.1, label: "1.1"},
  { value: 1.2, label: "1.2"},
  { value: 1.3, label: "1.3"},
  { value: 1.4, label: "1.4"},
  { value: 1.5, label: "1.5"},
  { value: 1.6, label: "1.6"},
  { value: 1.7, label: "1.7"},
  { value: 1.8, label: "1.8"},
  { value: 1.9, label: "1.9"},
  { value: 2, label: "2"},
  { value: 2.1, label: "2.1"},
  { value: 2.2, label: "2.2"}
]


const SettingsModal = (props) => {
  const { modalKey, fullscreen } = props;

  const { t } = useTranslation("common");
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  const router = useRouter();
  const MODAL_WIDTH = 600;

  const [modalInfo, setModalInfo] = useRecoilState(modalState);
  const { data: session, update: updateSession } = useSession();

  const [title, setTitle] = useState(t("settings__tab__settings_title"));
  const [authors, setAuthors] = useState([]);
  const [modalUserSettings, setModalUserSettings] = useState(
    modalInfo?.modalProps?.userSettings || {}
  );

  useEffect(() => {
    if (modalInfo?.modalProps) {
      setModalUserSettings(modalInfo.modalProps.userSettings);
    }
  }, [modalInfo?.modalProps]);

  const logoutAction = () => {
    return (
      <a
        onClick={async () => {
          await signOut();
          toast(t("settings__logout_success"), {
            icon: "👋",
          });
        }}
      >
        <RiLogoutBoxLine />
        <span>{t("settings__logout")}</span>
      </a>
    );
  };

  const getAuthors = async () => {
    const { data } = await fetchJson(
      `${process.env.NEXT_PUBLIC_API_URL}/authors`
    );
    setAuthors(authorOptions(data));
  };

  useEffect(() => {
    getAuthors();
  }, []);

  const setSomething = async (key, event) => {
    const newValue = event === false ? "" : event;
    const newSettings = {
      ...modalUserSettings,
      [key]: newValue,
    };
    // hack for author_en :( - backwards compatibility - it should be fixed
    if (locale === "en" && key === "a") {
      newSettings.a_en = newValue;
    }
    if (modalInfo.modalProps.setUserSettings) {
      modalInfo.modalProps.setUserSettings(newSettings);
    }

    setModalUserSettings(newSettings);
    setCookie("settings", JSON.stringify(newSettings), {
      maxAge: 60 * 60 * 24 * 12265,
    });

    if (session) {
      await fetch(`/api/settings`, {
        method: "POST",
        body: JSON.stringify({ key, newValue }),
      });

      updateSession();
    }

    if (key === "a") {
      setTimeout(() => router.reload(), 50);
      // TODO: add counter
    }
  };

  return (
    <BaseModal
      title={title}
      modalKey={modalKey}
      width={MODAL_WIDTH}
      fullscreen={fullscreen}
      contentStyle={{ padding: 0 }}
    >
      <SettingsModalContainer>
        <Tabs>
          <TabList>
            <Tab onClick={() => setTitle(t("settings__tab__settings_title"))}>
              <RiSettings5Line />
              <TabText>{t("settings__tab__settings")}</TabText>
            </Tab>
            <Tab onClick={() => setTitle(t("settings__tab__profile_title"))}>
              <RiUser4Line />
              <TabText>{t("settings__tab__profile")}</TabText>
            </Tab>
            <Tab onClick={() => setTitle(t("settings__tab__history_title"))}>
              <RiHistoryLine />
              <TabText>{t("settings__tab__history")}</TabText>
            </Tab>
          </TabList>

          <TabPanel>
            {modalInfo.modalProps && (
              <FormGeneric>
                <FormSelectItem>
                  <label>{t("settings__form__author_label")}</label>

                  <Selectbox
                    instanceId="change-author__select"
                    className="change-author__select"
                    placeholder={t("selectbox__author_placeholder")}
                    isSearchable
                    value={authors.find((i) => i.value == modalUserSettings.a)}
                    options={authors}
                    menuPosition="fixed"
                    onChange={(event) => {
                      setSomething("a", event.value);
                    }}
                    onChangeNative={(event) => {
                      setSomething("a", event.target.value);
                    }}
                    aria-label={t("selectbox__select_author")}
                  />
                </FormSelectItem>
                <FormSwitchItem style={{ paddingTop: 4 }}>
                  <label>{t("settings__form__footnote_label")}</label>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    checked={Boolean(modalUserSettings.sF || false)}
                    activeBoxShadow={"unset"}
                    onColor={"#82a573"}
                    offColor={"#838383"}
                    onChange={(event) => {
                      setSomething("sF", event);
                    }}
                  />
                </FormSwitchItem>
                <FormItemDivider>
                  {t("settings__form__surah_divider")}
                </FormItemDivider>
                <FormSelectItem>
                  <label>{t("settings__form__font_size")}</label>

                  <Selectbox
                    instanceId="change-font_size__select"
                    className="change-font_size__select"
                    value={fontOptions.find((i) => i.value == modalUserSettings.fs)}
                    options={fontOptions}
                    menuPosition="fixed"
                    onChange={(event) => {
                      setSomething("fs", event.value);
                    }}
                    onChangeNative={(event) => {
                      setSomething("fs", event.target.value);
                    }}
                    aria-label={t("selectbox__select_font_size")}
                  />
                </FormSelectItem>
                <FormSwitchItem>
                  <label>{t("settings__form__hide_arabic_label")}</label>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(event) => {
                      setSomething("hO", event);
                    }}
                    checked={Boolean(modalUserSettings.hO || false)}
                    activeBoxShadow={"unset"}
                    onColor={"#82a573"}
                    offColor={"#838383"}
                    disabled={Boolean(
                      modalUserSettings.hC && modalUserSettings.hT
                    )}
                  />
                </FormSwitchItem>
                <FormSwitchItem>
                  <label>{t("settings__form__hide_transcription_label")}</label>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(event) => {
                      setSomething("hC", event);
                    }}
                    checked={Boolean(modalUserSettings.hC || false)}
                    activeBoxShadow={"unset"}
                    onColor={"#82a573"}
                    offColor={"#838383"}
                    disabled={Boolean(
                      modalUserSettings.hO && modalUserSettings.hT
                    )}
                  />
                </FormSwitchItem>
                <FormSwitchItem>
                  <label>{t("settings__form__hide_translation_label")}</label>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(event) => {
                      setSomething("hT", event);
                    }}
                    checked={Boolean(modalUserSettings.hT || false)}
                    activeBoxShadow={"unset"}
                    disabled={Boolean(
                      modalUserSettings.hO && modalUserSettings.hC
                    )}
                    onColor={"#82a573"}
                    offColor={"#838383"}
                  />
                </FormSwitchItem>
              </FormGeneric>
            )}
          </TabPanel>
          <TabPanel>
            {session ? (
              <Formik
                initialValues={{
                  name: session.user?.name || "",
                  location: session.user?.location || "",
                  birthdate: session.user?.birthdate || "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = t("settings__form__name_required");
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    fetch(`/api/update-profile`, {
                      method: "POST",
                      body: JSON.stringify(values),
                    })
                      .then((res) => {
                        updateSession();
                        res.ok
                          ? toast(t("settings__form__saved"), {
                              icon: "👍",
                            })
                          : toast(t("error__title"), {
                              icon: "😞",
                            });
                      })
                      .catch(() => {
                        toast(t("error__title"), {
                          icon: "😞",
                        });
                      });
                    setSubmitting(false);
                  }, 400);
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
                  <FormGeneric onSubmit={handleSubmit}>
                    <FormItem>
                      <label>{t("settings__form__name_label")}</label>
                      <FormInput
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                        placeholder="İsim"
                      />
                    </FormItem>
                    <FormItem>
                      <label>{t("settings__form__city_label")}</label>
                      <FormInput
                        name="location"
                        onBlur={handleBlur}
                        value={values.location}
                        onChange={handleChange}
                      />
                    </FormItem>
                    <FormItem>
                      <label>{t("settings__form__birthdate_label")}</label>
                      <FormInput
                        type="date"
                        name="birthdate"
                        onBlur={handleBlur}
                        value={values.birthdate}
                        onChange={handleChange}
                      />
                    </FormItem>
                    <FormSubmit>
                      <Button
                        type="submit"
                        disabled={
                          values === !!Object.keys(errors).length ||
                          isSubmitting
                        }
                        fullwidth
                      >
                        {t("settings__form__submit_button_label")}
                      </Button>
                    </FormSubmit>
                  </FormGeneric>
                )}
              </Formik>
            ) : (
              <ProfileLoginArea>
                <Button
                  type="button"
                  fullWidth
                  onClick={() => setModalInfo({ openedModal: "login" })}
                >
                  {t("login__direction_text")}
                </Button>
              </ProfileLoginArea>
            )}
          </TabPanel>
          <TabPanel>
            {session ? (
              <StatsModal />
            ) : (
              <ProfileLoginArea>
                <Button
                  type="button"
                  fullWidth
                  onClick={() => setModalInfo({ openedModal: "login" })}
                >
                  {t("login__direction_text")}
                </Button>
              </ProfileLoginArea>
            )}
          </TabPanel>
        </Tabs>
        {session && <Logout>{logoutAction()}</Logout>}
      </SettingsModalContainer>
    </BaseModal>
  );
};

export default SettingsModal;
