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
} from "@mui/material";

export default function SettingPage() {
  const theme = useTheme();
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
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
        الإعدادات
      </Typography>

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

      {/* طريقة حساب الأوقات */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: theme.palette.text.primary }} id="reminder-time-label">
          طريقة حساب الأوقات
        </InputLabel>
        <Select
          labelId="reminder-time-label"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "& .MuiSvgIcon-root": {
              color: theme.palette.text.primary,
            },
          }}
        >
          <MenuItem value={5}>السعودية</MenuItem>
          <MenuItem value={10}>رابطة العالم الاسلامي</MenuItem>
        </Select>
      </FormControl>

      {/* وقت التذكير قبل الصلاة */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: theme.palette.text.primary }} id="reminder-time-label2">
          وقت التذكير قبل الصلاة
        </InputLabel>
        <Select
          labelId="reminder-time-label2"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "& .MuiSvgIcon-root": {
              color: theme.palette.text.primary,
            },
          }}
        >
          <MenuItem value={5}>5 دقائق</MenuItem>
          <MenuItem value={10}>10 دقائق</MenuItem>
          <MenuItem value={15}>15 دقائق</MenuItem>
        </Select>
      </FormControl>

      {/* اختيار صوت الأذان */}
      <FormControl fullWidth>
        <InputLabel sx={{ color: theme.palette.text.primary }} id="azan-sound-label">
          صوت الأذان
        </InputLabel>
        <Select
          labelId="azan-sound-label"
          value={azanSound}
          onChange={(e) => setAzanSound(e.target.value)}
          sx={{
            color: theme.palette.text.primary,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "& .MuiSvgIcon-root": {
              color: theme.palette.text.primary,
            },
          }}
        >
          <MenuItem value="Makkah">أذان مكة</MenuItem>
          <MenuItem value="Madina">أذان المدينة</MenuItem>
          <MenuItem value="Other">أصوات أخرى</MenuItem>
        </Select>
      </FormControl>

      {/* المساعدة / تعليمات */}
      <Box>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
          مساعدة / تعليمات
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
          - كيفية استخدام القبلة  
          - إعداد الأذكار  
          - تشغيل الأذان
        </Typography>
      </Box>
    </Box>
  );
}
