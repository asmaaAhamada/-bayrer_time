
import * as React from "react";
import { Box, Typography } from "@mui/material";
import MosqueIcon from '@mui/icons-material/Mosque'; // رمز جامع من MUI Icons

export default function  KissPage(){
  const [angle, setAngle] = React.useState(0);

  // هنا نقدر نربط مع بيانات الباك لاحقًا
  // مثال: زاوية القبلة بالدرجات
  React.useEffect(() => {
    // محاكاة دوران مستمر
    const interval = setInterval(() => {
      setAngle(prev => (prev + 1) % 360); // دوران دائري
    }, 50); // سرعة الدوران
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        color: "color: theme.palette.primary.contrastText",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        اتجاه القبلة
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "4px solid #d2c019ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(25, 118, 210, 0.1)",
        }}
      >
        {/* المسجد في الوسط */}
        <MosqueIcon sx={{ fontSize: 60, color: "color: theme.palette.primary.contrastText" }} />

        {/* مؤشر دوار */}
        <Box
          sx={{
            position: "absolute",
            width: 4,
            height: 140,
            bgcolor: "#f44336",
            borderRadius: 2,
            transformOrigin: "bottom center",
            transform: `rotate(${angle}deg)`,
            transition: "transform 0.1s linear",
          }}
        />
      </Box>

      <Typography sx={{ mt: 2 }}>
        زاوية القبلة: {angle}°
      </Typography>
    </Box>
  );
}
