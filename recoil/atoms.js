import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const envInfoState = atom({
  key: "envInfoStateKey",
  default: null,
});

export const themeState = atom({
  key: "themeStateKey",
  default: "light",
  effects: [persistAtom],
});

export const modalState = atom({
  key: "modalStateKey",
  default: {
    openedModal: null,
    modalProps: null,
  },
});

export const streakState = atom({
  key: "streakStateKey",
  default: {},
});
