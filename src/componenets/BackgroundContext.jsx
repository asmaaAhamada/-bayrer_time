import React, { createContext, useContext } from "react";
import bgImage from "../assets/images/homePecutre.png"; // صورتك من مجلد assets

// إنشاء السياق
const BackgroundContext = createContext();

// مكوّن الـ Provider
export const BackgroundProvider = ({ children }) => {
  const value = {
    backgroundImage: bgImage,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};

// hook مخصص للاستخدام بسهولة
export const useBackground = () => useContext(BackgroundContext);
