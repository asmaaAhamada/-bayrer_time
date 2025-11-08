import * as React from "react";
import {
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import RemembranceCard from "./Remembrances";
import { fetchAzkarByCategory, fetchCategories } from "../../../Reducer/payere/azkar";

export default function AzkarTabs() {
  const dispatch = useDispatch();
  const { categories, azkar, isLoading, error } = useSelector(
    (state) => state.remembrances
  );
  const [value, setValue] = React.useState(0);

  // تحميل التصنيفات عند أول تشغيل
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // تحميل أذكار أول تصنيف عند جلب التصنيفات
  React.useEffect(() => {
    if (categories.length > 0) {
      dispatch(fetchAzkarByCategory(categories[value].id));
    }
  }, [categories, value, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(fetchAzkarByCategory(categories[newValue].id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* التابات */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="azkar tabs"
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.name} />
        ))}
      </Tabs>

      {/* اللودر */}
      {isLoading && (
        <LinearProgress sx={{ mt: 1, height: 5, borderRadius: 2 }} />
      )}

      {/* الخطأ */}
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      {/* عرض الأذكار */}
      <Box sx={{ p: 2 }}>
        {azkar.length > 0 ? (
          azkar.map((item) => (
            <RemembranceCard
              key={item.id}
              text={item.content}
              reward={`تكرار: ${item.repetition}`}
            />
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            لا توجد أذكار حالياً
          </Typography>
        )}
      </Box>
    </Box>
  );
}
