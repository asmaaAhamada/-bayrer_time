import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZhz6K74u4djZoHqBI8nJP8-_Qz9tzypM",
  authDomain: "aladhan-e5325.firebaseapp.com",
  projectId: "aladhan-e5325",
  storageBucket: "aladhan-e5325.appspot.com",
  messagingSenderId: "723371860897",
  appId: "1:723371860897:web:2d44a955be3d9b6af4a1e0",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
