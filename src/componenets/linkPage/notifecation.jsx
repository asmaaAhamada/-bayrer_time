/*
مكون React واحد (Single File) - واجهة مسبح رقمي باستخدام Material UI v5
ميزات مضمّنة:
- وضع النوايا (قصدة: صدقة جارية، لأمي، لشفائي، ...)
- أذكار مصنّفة مع قائمة التسابيح الأساسية
- مسبحة رقمية تفاعلية: عدّاد، اختيار ذكر، اختيار هدف (33/100/1000)، تقدم، إعادة تعيين
- إعدادات صوت/اهتزاز (محاكاة) ووضع داكن
- تصميم احترافي مبني على Material UI (AppBar, Cards, Lists, Buttons, Dialogs)

كيفية الاستخدام:
- استورد هذا الملف كمكوّن داخل تطبيق React مع تثبيت @mui/material و @mui/icons-material
- هذا ملف توضيحي — يمكن توسيعه لربط التخزين المحلي أو قاعدة بيانات.
*/

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Favorite as FavoriteIcon,
  FormatListBulleted as ListIcon,
  VolumeUp as VolumeUpIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";

export default function NotifyPage() {
  // النوايا
  const [intention, setIntention] = useState("صدقة جارية");

  // الأذكار المصنّفة
  const categories = {
    "تسابيح عامة": [
      "سبحان الله",
      "الحمد لله",
      "الله أكبر",
      "لا إله إلا الله",
    ],
    "أذكار بعد الصلاة": [
      "اللهم اغفر لي ما قدمت وما أخرت",
      "اللهم اجعل عملي خالصًا لوجهك",
    ]
  };

  const categoriesKeys = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState(categoriesKeys[0]);

  // مسبحة
  const [selectedZikr, setSelectedZikr] = useState(categories[activeCategory][0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundOn, setSoundOn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [customGoal, setCustomGoal] = useState(100);

  useEffect(() => {
    // عند تغيير الفئة، نختار الذكر الأول تلقائيًا
    setSelectedZikr(categories[activeCategory][0]);
    setCount(0);
  }, [activeCategory]);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    if (soundOn) playClick();
  };

  const reset = () => setCount(0);

  const playClick = () => {
    // تأثير صوتي بسيط — هنا محاكاة باستخدام Web Audio API إن أردت
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 660;
      g.gain.value = 0.02;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 60);
    } catch (e) {
      // إذا لم يُسمح بالصوت، نتجاهل
    }
  };

  const progress = Math.min(100, Math.round((count / target) * 100));

  // واجهة العرض
  return (
      
<>
      <Container sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* الشريط الجانبي: نوايا و فئات الأذكار */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  وضع النية
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="intention-label">النية</InputLabel>
                  <Select
                    labelId="intention-label"
                    value={intention}
                    label="النية"
                    onChange={(e) => setIntention(e.target.value)}
                  >
                    <MenuItem value={"صدقة جارية"}>صدقة جارية</MenuItem>
                    <MenuItem value={"لأمي"}>لأمي</MenuItem>
                    <MenuItem value={"لشفائي"}>لشفائي</MenuItem>
                    <MenuItem value={"لأهلي"}>لأهلي</MenuItem>
                    <MenuItem value={"لِي"}>لِي</MenuItem>
                    <MenuItem value={"لنية خاصة"}>لنية خاصة</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">فئات الأذكار</Typography>
                  <List>
                    {categoriesKeys.map((cat) => (
                      <ListItem key={cat} disablePadding>
                        <ListItemButton selected={cat === activeCategory} onClick={() => setActiveCategory(cat)}>
                          <ListItemText primary={cat} />
                          <Chip label={categories[cat].length} size="small" />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="subtitle1">التسبيحات في "{activeCategory}"</Typography>
                <List>
                  {categories[activeCategory].map((zikr) => (
                    <ListItem key={zikr} disablePadding>
                      <ListItemButton selected={zikr === selectedZikr} onClick={() => { setSelectedZikr(zikr); setCount(0); }}>
                        <ListItemText primary={zikr} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* اللوحة الرئيسية: المسبحة الرقمية */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5">{selectedZikr}</Typography>
                    <Typography variant="body2" color="text.secondary">النية: {intention}</Typography>

                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 2 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="caption">{count} / {target} تسبيحات</Typography>
                        <Typography variant="caption">{progress}%</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <Typography variant="h3" sx={{ mb: 1 }}>{count}</Typography>

                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ width: 160, mb: 1 }}
                        onClick={increment}
                      >
                        أضف
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{ width: 160 }}
                        onClick={reset}
                      >
                        إعادة
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2">اختيار الهدف</Typography>
                      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                        {[33, 100, 333].map((g) => (
                          <Chip
                            key={g}
                            label={g}
                            color={g === target ? "primary" : "default"}
                            onClick={() => setTarget(g)}
                          />
                        ))}

                        <Chip label={"مخصص"} onClick={() => setGoalDialogOpen(true)} icon={<FlagIcon />} />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2">التحكم</Typography>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
                        <FormControl>
                          <Typography variant="caption">الصوت</Typography>
                          <Switch checked={soundOn} onChange={() => setSoundOn((s) => !s)} />
                        </FormControl>

                       

                        <Tooltip title="حفظ الورد ومشاركته لاحقًا">
                          <IconButton>
                            <FavoriteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2">تفصيل الورد</Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={6} md={3}>
                      <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                          <Typography variant="h6" align="center">{target}</Typography>
                          <Typography variant="caption" display="block" align="center">هدف</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                          <Typography variant="h6" align="center">{count}</Typography>
                          <Typography variant="caption" display="block" align="center">المحصلة</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                          <Typography variant="caption">ملاحظة:</Typography>
                          <Typography variant="body2">عند الوصول إلى الهدف، سيبقى العداد ويمكنك اختيار تكرار الهدف أو تغييره.</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* حوار اختيار هدف مخصص */}
      <Dialog open={goalDialogOpen} onClose={() => setGoalDialogOpen(false)}>
        <DialogTitle>حدد هدف مخصص</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 300, pt: 1 }}>
            <Typography variant="caption">قيمة الهدف: {customGoal}</Typography>
            <Slider
              value={customGoal}
              min={10}
              max={5000}
              step={1}
              onChange={(e, v) => setCustomGoal(v)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGoalDialogOpen(false)}>إلغاء</Button>
          <Button onClick={() => { setTarget(customGoal); setGoalDialogOpen(false); }} variant="contained">حفظ</Button>
        </DialogActions>
      </Dialog>

    
    </>
  );
}
