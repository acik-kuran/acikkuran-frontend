import "firebase/messaging";

import firebase from "firebase/app";
import localforage from "localforage";

import { initGA, logEvent } from "./analytics";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    if (!firebase.apps.length) {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logEvent("push-notification", `push-request`);
      firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      });

      try {
        if ((await this.tokenInlocalforage()) !== null) {
          return false;
        }

        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();

        localforage.setItem("fcm_token", token);
        logEvent("push-notification", `push-approve`);
      } catch (error) {
        logEvent("push-notification", `push-error`);
        // console.error(error);
      }
    }
  },
};

export { firebaseCloudMessaging };
