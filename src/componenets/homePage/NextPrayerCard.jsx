import { Card, CardContent, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnnextTimes } from '../../Reducer/payere/get_next_Payer';
import { useEffect } from 'react';


const prayerNamesArabic = {
  Fajr: "الفجر",
 
};

export default function NextPrayerCard() {
  const nextTime= useSelector((state)=>state.fetchnnextTimes)
  console.log(nextTime.data.next_prayer
.name)
  const dispath=useDispatch()





  useEffect(() => {
  dispath(fetchnnextTimes())
  }, [])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
            top: -5,
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
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            {prayerNamesArabic[nextTime.data.next_prayer
.name]}
          </Typography>
          <Typography variant="h5">
  {nextTime.data.next_prayer.time.split(" ")[1].slice(0, 5)}
</Typography>

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
