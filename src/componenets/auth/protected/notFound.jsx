import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F0F4F8", // خلفية هادئة زرقاء فاتحة
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* أيقونة بسيطة مرتبطة بالصلاة */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "1.5rem" }}
      >
        <circle cx="32" cy="32" r="30" stroke="#4A90E2" strokeWidth="4" />
        <path
          d="M32 12 V32 L44 44"
          stroke="#4A90E2"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#4A90E2" }}>
        404
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
        الصفحة غير موجودة <br />
        يبدو أنك تبحث في المكان الخطأ
      </p>

      <a
        href="/"
        style={{
          textDecoration: "none",
          backgroundColor: "#FFD700", // لون ذهبي دافئ
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          fontWeight: "bold",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#FFC107";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#FFD700";
        }}
      >
        العودة للرئيسية
      </a>
    </div>
  );
};

export default NotFound;
