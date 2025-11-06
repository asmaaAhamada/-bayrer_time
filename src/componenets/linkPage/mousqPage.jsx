import React from "react";
import { Box, Card, Typography, Button, Divider, useTheme } from "@mui/material";
import MosqueIcon from "@mui/icons-material/Mosque";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function NearestMosquePage() {
    const them= useTheme()
  const mosqueName = "مسجد النور الكبير";
  const distance = 250; // بالمتر

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 5,
          boxShadow: 8,
          textAlign: "center",
          p: 4,
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.main",
        }}
      >
        {/* عنوان */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          المسجد الأقرب إليك
        </Typography>

        {/* مشهد الشخص والمسجد */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <PersonPinCircleIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
            }}
          />
          <Box
            sx={{
              position: "relative",
              flexGrow: 1,
              height: "3px",
              bgcolor: "divider",
              mx: 2,
            }}
          >
            {/* المسافة مكتوبة بالنص فوق الخط */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                position: "absolute",
                top: "-25px",
                left: "50%",
                transform: "translateX(-50%)",
                fontWeight: "bold",
              }}
            >
              {distance} م
            </Typography>
          </Box>
          <MosqueIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
            }}
          />
        </Box>

        {/* اسم المسجد */}
        <Typography
          variant="body1"
          fontWeight="medium"
          sx={{ mt: 3, color: "text.primary" }}
        >
          {mosqueName}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* زر عرض على الخريطة */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<LocationOnIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: "bold",
          }}
          onClick={() =>
            window.open("https://www.google.com/maps?q=33.5102,36.2912", "_blank")
          }
        >
          عرض على الخريطة
        </Button>
      </Card>
    </Box>
  );
}
