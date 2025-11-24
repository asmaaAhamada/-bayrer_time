import { getMessaging, getToken } from "firebase/messaging";
import { app } from "./fairbaseconfig";

const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notifications permission not granted");
      return null;
    }

   const currentToken = await getToken(messaging, {
  vapidKey: "BNdkU5bL2mDfQWjJZ_bBUMlCa8aAUFTzR4TdpT1nWObVRWWFkBNDWJ5FLSkv8yYqtvxWkOPKuW_vUTdJTQCciBA"
});



    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.warn("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (err) {
    console.error("FCM token error:", err);
    return null;
  }
};
