import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { onMessage } from "firebase/messaging";
import { messaging } from "./fairbaseconfig";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { title: "تذكير 1", body: "هذا مثال على نص الإشعار الأول" },
    { title: "تذكير 2", body: "هذا مثال على نص الإشعار الثاني" },
  ]);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("رسالة واردة:", payload);

      const newNotification = {
        title: payload.notification?.title || "بدون عنوان",
        body: payload.notification?.body || "بدون نص",
      };

      // أضف الرسالة الجديدة لقلب الـ Box
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 2,
      }}
    >
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "'Amiri', serif" }}>
            فذكر ان نفعت الذكرى
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* محتوى الإشعارات */}
        {notifications.map((notif, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {notif.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {notif.body}
            </Typography>
            {index < notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
