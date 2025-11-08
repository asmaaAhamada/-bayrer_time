import * as React from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import MosqueIcon from '@mui/icons-material/Mosque';
import { useDispatch, useSelector } from "react-redux";
import { fetch_get_qibla } from "../../Reducer/payere/get_qibla";

export default function KissPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.get_qibla);
  const [angle, setAngle] = React.useState(0);

  // جلب البيانات عند التحميل
  React.useEffect(() => {
    dispatch(fetch_get_qibla());
  }, [dispatch]);

  // تحديث زاوية الدوران بالاعتماد على direction_degrees لو موجود
  React.useEffect(() => {
    if (state.data.direction_degrees) {
      setAngle(state.data.direction_degrees);
    }
  }, [state.data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        اتجاه القبلة
      </Typography>

      {state.isloading ? (
        <CircularProgress color="primary" />
      ) : state.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      ) : (
        <>
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
            <MosqueIcon sx={{ fontSize: 60, color: "#000" }} />

            <Box
              sx={{
                position: "absolute",
                width: 4,
                height: 140,
                bgcolor: "#f44336",
                borderRadius: 2,
                transformOrigin: "bottom center",
                transform: `rotate(${angle}deg)`,
                transition: "transform 0.5s ease",
              }}
            />
          </Box>

          {/* عرض الزاوية والوصف فقط */}
          <Typography sx={{ mt: 2 }}>
            زاوية القبلة: {angle.toFixed(2)}°
          </Typography>
          <Typography sx={{ mt: 1, textAlign: "center", maxWidth: 280 }}>
            {state.data.description}
          </Typography>
        </>
      )}
    </Box>
  );
}
