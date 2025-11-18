import React, { useEffect } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import fager from '../../assets/images/فجر.jpg'
import doher from '../../assets/images/ضهر.jpg'
import assar from '../../assets/images/عصر.jpg'
import maghreb from '../../assets/images/مغرب.jpg'
import eshaa from '../../assets/images/عشاء.jpg'
import { useDispatch, useSelector } from "react-redux";
import { fetchPrayerTimes } from "../../Reducer/payere/prayerTime";



export default function PrayerCards() {
    const state = useSelector((state) => state.prayerTimes);
// console.log(state.data.timings.
// Asr)
  const dispath= useDispatch()
  const theme = useTheme();
// if (loading) return <Typography>جاري التحميل...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;
useEffect(()=>{
dispath(fetchPrayerTimes())
},[])

const prayers = [
    { name: "الفجر", time: state?.data.timings?.Fajr, img: fager },
    { name: "الظهر", time: state?.data.timings?.Dhuhr, img: doher },
    { name: "العصر", time: state?.data.timings?.Asr, img: assar },
    { name: "المغرب", time: state?.data.timings?.Maghrib, img: maghreb },
    { name: "العشاء", time: state?.data.timings?.Isha, img: eshaa },
];






  return (
    <Box sx={{ p: 2, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 3 }} 
        columns={{ xs: 1, sm: 2, md: 5 }}
      >
        {prayers.map((prayer, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <Card sx={{ 
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              textAlign: 'center',boxShadow:`1px 1px 1px ${theme.palette.primary.main}`,
              p: 1
            }}>
              <CardMedia
                component="img"
                height="140"
                image={prayer.img}
                alt={prayer.name}
              />
              <CardContent>
                <Typography variant="h6">{prayer.name}</Typography>
                <Typography variant="body1">{prayer.time}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
