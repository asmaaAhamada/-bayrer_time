import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnnextTimes } from '../../Reducer/payere/get_next_Payer';
import { useEffect, useState } from 'react';

const prayerNamesArabic = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Midnight: "قيام الليل",
  Imsak: "إمساك",
  Firstthird: "الوتر",
  Lastthird: "الوتر",  
};

export default function NextPrayerCard() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.fetchnnextTimes);
  
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    dispatch(fetchnnextTimes());
  }, [dispatch]);

  useEffect(() => {
    if (!data?.next_prayer?.time) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = data.next_prayer.time.split(" ")[1].split(":");
      const nextPrayerDate = new Date();
      nextPrayerDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // إذا الوقت فات، نزود يوم واحد
      if (nextPrayerDate < now) {
        nextPrayerDate.setDate(nextPrayerDate.getDate() + 1);
      }

      const diff = nextPrayerDate - now;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <Card
        sx={{
          minWidth: 280,
          borderRadius: 3,
          boxShadow: 5,
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
          animation: 'bounceY 1.5s ease-in-out infinite',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -9,
            left: -5,
            right: -5,
            bottom: -5,
            borderRadius: '12px',
            boxShadow: '0 0 20px 5px rgba(255, 200, 0, 0.6)',
            opacity: 0.7,
            animation: 'glow 2s infinite alternate',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            الصلاة القادمة
          </Typography>
          {loading ? (
            <CircularProgress color="primary" />
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                {prayerNamesArabic[data?.next_prayer?.name]}
              </Typography>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {timeLeft || "00:00:00"}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <style>
        {`
          @keyframes bounceY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          @keyframes glow {
            0% { box-shadow: 0 0 10px 3px rgba(255, 200, 0, 0.4); }
            50% { box-shadow: 0 0 25px 8px rgba(255, 200, 0, 0.8); }
            100% { box-shadow: 0 0 10px 3px rgba(255, 200, 0, 0.4); }
          }
        `}
      </style>
    </Box>
  );
}
