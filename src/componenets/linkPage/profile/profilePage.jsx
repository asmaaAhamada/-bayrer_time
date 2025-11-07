import React from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLocationIcon from '@mui/icons-material/AddLocation';import DailyAzkarPage from "./victory/azkar";

export default function ProfilePage() {
  const theme = useTheme();

  const user = {
    name: "أحمد محمد",
    email: "ahmad@example.com",
    city: "دمشق",
    avatar: "",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {/* 🌙 العبارة التحفيزية */}
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        ما دام قلبك يذكر الله، لن يضيع طريقك 🌙
      </Typography>

      {/* 📊 الإحصائيات (المخططان) */}
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: 1100,
          mb: 4,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Grid item xs={12} md={6}>
          
           
            <DailyAzkarPage color={theme.palette.primary.main} />
         
        </Grid>

      
      </Grid>

    

      {/*  بيانات المستخدم */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          p: 3,
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            bgcolor: "primary.main",
            width: 80,
            height: 80,
            margin: "auto",
            fontSize: 32,
            mb: 2,
          }}
        >
          {user.name.charAt(0)}
        </Avatar>

        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email || "بريد إلكتروني غير مضاف"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          <AddLocationIcon/> {user.city}
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{
            mt: 3,
            borderRadius: 3,
            px: 3,
            fontWeight: "bold",
          }}
        >
          تسجيل الخروج
        </Button>
      </Card>
    </Box>
  );
}
