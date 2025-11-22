/* صفحة الأناشيد والأدعية - React + MUI (مع تعديل Select لتشغيل الدعاء فور الاختيار + ملفات صوتية Offline) */
        import yaserImg from '../../assets/images/ياسر.jpg';
        import maherImg from '../../assets/images/ماهر.jpg';
import medinaImg from '../../assets/images/مدينة.jpg'
import makkahImg from '../../assets/images/R.jpeg';
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  Paper,
  IconButton
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon
} from "@mui/icons-material";

export default function AudiosPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [playingSrc, setPlayingSrc] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  const sheikhs = [
    {
      name: "ماهر المعيقلي",
      img: maherImg,
      folder: "maher",
      duas: [
        { name: "دعاء ختم القرآن", file: "/public/douuaa/daou1.mp3" },
        { name: "دعاء القنوت في رمضان", file: "/public/douuaa/daou5.mp3" },
        { name: "دعاء ليلة القدر", file: "/public/douuaa/daou2.mp3" },
        { name: "دعاء التراويح", file: "/public/douuaa/daou3.mp3" },
        { name: "دعاء جامع", file: "/public/douuaa/daou4.mp3" }
      ]
    },
    {

      name: "ياسر الدوسري",
      img: yaserImg,
      folder: "dosari",
      duas: [
        { name: "دعاء القنوت (الوتر)", file: "/public/douuaa/daou6.mp3" },
        { name: "دعاء التهجد", file: "/public/douuaa/daou7.mp3" },
        { name: "دعاء خاشع من الحرم", file: "/public/douuaa/daou8.mp3"},
        { name: "دعاء قصير للفرج والرحمة", file: "/public/douuaa/daou9.mp3" },
        { name: "فجرية خاشعة", file: "/public/douuaa/daou0.mp3"}
      ]
    }
  ];

 

const nasheeds = [
  { name: "المدينة المنورة", file: "/public/azan/madina.mp3", img: medinaImg },
  { name: "مكة المكرمة", file: "/public/azan/Makkah.mp3", img: makkahImg }
];


  const playAudio = (src) => {
    if (playingSrc === src && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    audio.src = src;
    audio.play();
    setPlayingSrc(src);
    setIsPlaying(true);
  };

  return (
    <Container sx={{ pt: -1 }}>
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} centered>
        <Tab label="الأدعية" />
        <Tab label="الاذان" />
      </Tabs>

      {/* الأدعية */}
      {activeTab === 0 && (
        <Grid container spacing={2} sx={{ mt: 1}}>
          {sheikhs.map((sh) => (
            <Grid item xs={12} md={6} key={sh.folder}>
              <Card>
                <CardMedia component="img" height="300" image={sh.img} alt={sh.name} />
                <CardContent>
                  <Typography align="center" variant="subtitle1">{sh.name}</Typography>
                  <Select
                    fullWidth
                    defaultValue=""
                    displayEmpty
                    onChange={(e) => playAudio(e.target.value)}
                  >
                    <MenuItem value="" disabled>اختر الدعاء</MenuItem>
                    {sh.duas.map((d, i) => (
                      <MenuItem key={i} value={d.file}>{d.name}</MenuItem>
                    ))}
                  </Select>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

    {/* الاذان */}
{/* الأذان */}
{activeTab === 1 && (
  <Grid container spacing={2} sx={{ mt: 2 }}>
    {nasheeds.map((n, i) => (
      <Grid item xs={12} md={6} key={i}>
        <Card>
          <CardActionArea onClick={() => playAudio(n.file)}>
            <CardMedia
              component="img"
              height="300"
              image={n.img} // الصورة المخصصة (مكة / المدينة)
              alt={n.name}
            />
            <CardContent>
              <Typography align="center">{n.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
)}



      {/* Mini Player */}
      {playingSrc && (
        <Paper elevation={3} sx={{ position: "fixed", bottom: 0, left: 0, right: 0, p: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>{playingSrc.split('/').pop()}</Typography>
            <IconButton onClick={() => playAudio(playingSrc)}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
