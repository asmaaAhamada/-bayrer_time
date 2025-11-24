importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDZhz6K74u4djZoHqBI8nJP8-_Qz9tzypM",
  authDomain: "aladhan-e5325.firebaseapp.com",
  projectId: "aladhan-e5325",
  storageBucket: "aladhan-e5325.appspot.com",
  messagingSenderId: "723371860897",
  appId: "1:723371860897:web:2d44a955be3d9b6af4a1e0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});
