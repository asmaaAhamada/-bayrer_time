import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MosqueIcon from "@mui/icons-material/Mosque";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

export default function NotifyPage() {
  const notifications = [
    { title: "موعد صلاة الفجر", detail: "سيكون عند الساعة 5:02 صباحًا" },
    { title: "تنبيه جديد", detail: "تمت إضافة فعالية جديدة في المسجد" },
    { title: "تذكير", detail: "الجمعة القادمة خطبة خاصة" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        direction: "rtl", //  الاتجاه من اليمين لليسار
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 4,
          boxShadow: 6,
          bgcolor: "background.paper",
          p: 2,
          textAlign: "right", //  النصوص من اليمين
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          <MosqueIcon
            sx={{
              color: "primary.main",
              animation: `${float} 2s ease-in-out infinite`,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            تنبيهاتي
          </Typography>
          <MosqueIcon
            sx={{
              color: "primary.main",
              animation: `${float} 2s ease-in-out infinite reverse`,
            }}
          />
        </Box>

        <CardContent sx={{ pt: 0 }}>
          <List disablePadding>
            {notifications.map((n, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    py: 1.5,
                  }}
                >
                  <ListItemText
                    primary={n.title}
                    secondary={n.detail}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "text.primary",
                      textAlign: "right",
                    }}
                    secondaryTypographyProps={{
                      color: "text.secondary",
                      textAlign: "right",
                    }}
                  />
                </ListItem>
                {/*  Divider بين كل إشعار والتاني ما عدا الأخير */}
                {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
