import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import fager from '../../assets/images/فجر.jpg'
import doher from '../../assets/images/ضهر.jpg'
import assar from '../../assets/images/عصر.jpg'
import maghreb from '../../assets/images/مغرب.jpg'
import eshaa from '../../assets/images/عشاء.jpg'

const prayers = [
  { name: "الفجر", time: "05:10" , img:fager},
  { name: "الظهر", time: "12:30", img:doher },
  { name: "العصر", time: "15:45", img:assar },
  { name: "المغرب", time: "18:20", img:maghreb },
  { name: "العشاء", time: "19:50", img:eshaa },
];

export default function PrayerCards() {
  const theme = useTheme();

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
