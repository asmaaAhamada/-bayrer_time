import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import MosqueIcon from "@mui/icons-material/Mosque";

const WelcomePage = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        dir="rtl"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: theme.palette.primary.main,
          fontFamily: "'Amiri', serif",
          opacity: 0,
          animation: "fadeIn 2s ease-in forwards",
          "@keyframes fadeIn": {
            to: { opacity: 1 },
          },
        }}
      >
        وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ
      </Typography>

      <MosqueIcon
        sx={{
          fontSize: 100,
          mb: 3,
          color: theme.palette.primary.main,
          animation: "pulse 3s infinite ease-in-out",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.1)", opacity: 0.9 },
          },
        }}
      />

      <Box
        sx={{
          opacity: 0,
          animation: "fadeUp 2s ease-in-out 0.8s forwards",
          "@keyframes fadeUp": {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          أهلاً بك في <strong>تطبيق صلاتي</strong>
        </Typography>
        <Typography variant="body1" color="text.primary">
          احصل على أوقات الصلاة بدقة تامة ودليلك اليومي لقبلتك.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomePage;
