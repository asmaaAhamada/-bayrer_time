import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

export default function SettingPage() {
  const theme = useTheme(); //  استخدم الـ hook بدلاً من props
  const [azanEnabled, setAzanEnabled] = React.useState(true);
  const [timeFormat, setTimeFormat] = React.useState("24");
  const [reminderTime, setReminderTime] = React.useState(5);
  const [azanSound, setAzanSound] = React.useState("Makkah");

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5">الإعدادات</Typography>

      {/* تشغيل/إيقاف الأذان */}
      <FormControlLabel
        control={
          <Switch
            checked={azanEnabled}
            onChange={(e) => setAzanEnabled(e.target.checked)}
            color="primary"
          />
        }
        label="تشغيل الأذان"
      />

      {/* تنسيق الوقت */}
      <FormControl component="fieldset">
        <FormLabel component="legend">تنسيق الوقت</FormLabel>
        <RadioGroup
          row
          value={timeFormat}
          onChange={(e) => setTimeFormat(e.target.value)}
        >
          <FormControlLabel value="12" control={<Radio />} label="12 ساعة" />
          <FormControlLabel value="24" control={<Radio />} label="24 ساعة" />
        </RadioGroup>
      </FormControl>

      {/* وقت التذكير قبل الصلاة */}
      <FormControl fullWidth>
        <InputLabel id="reminder-time-label">وقت التذكير قبل الصلاة</InputLabel>
        <Select
          labelId="reminder-time-label"
          value={reminderTime}
          label="وقت التذكير قبل الصلاة"
          onChange={(e) => setReminderTime(e.target.value)}
        >
          <MenuItem value={5}>5 دقائق</MenuItem>
          <MenuItem value={10}>10 دقائق</MenuItem>
          <MenuItem value={15}>15 دقائق</MenuItem>
        </Select>
      </FormControl>

      {/* اختيار صوت الأذان */}
      <FormControl fullWidth>
        <InputLabel id="azan-sound-label">صوت الأذان</InputLabel>
        <Select
          labelId="azan-sound-label"
          value={azanSound}
          label="صوت الأذان"
          onChange={(e) => setAzanSound(e.target.value)}
        >
          <MenuItem value="Makkah">أذان مكة</MenuItem>
          <MenuItem value="Madina">أذان المدينة</MenuItem>
          <MenuItem value="Other">أصوات أخرى</MenuItem>
        </Select>
      </FormControl>

      {/* المساعدة / تعليمات */}
      <Box>
        <Typography variant="h6">مساعدة / تعليمات</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          - كيفية استخدام القبلة  
          - إعداد الأذكار  
          - تشغيل الأذان
        </Typography>
      </Box>

      {/* زر تسجيل الخروج */}
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 3 }}
        onClick={() => alert("تم تسجيل الخروج")}
      >
        تسجيل الخروج
      </Button>
    </Box>
  );
}
