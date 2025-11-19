import * as React from "react";
import {
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import RemembranceCard from "./Remembrances";
import { fetchAzkarByCategory, fetchCategories } from "../../../Reducer/payere/azkar";
import { fetchFavorites } from "../../../Reducer/payere/favourite";
import { patchData } from "../../../Backend/ApiServeces";
import { BaseUrl, MAKEREAD } from "../../../Backend/Api";

export default function AzkarTabs() {
  const [readCategories, setReadCategories] = React.useState([]);
  const [readerror, setReaderror] = React.useState(false);

  const dispatch = useDispatch();
  const { categories, azkar, isLoading, error } = useSelector(
    (state) => state.remembrances
  );
const { favorites } = useSelector((state) => state.favorites);

  console.log(favorites)
  const [value, setValue] = React.useState(0);

  // تحميل التصنيفات عند أول تشغيل
  React.useEffect(() => {
    dispatch(fetchCategories());
  dispatch(fetchFavorites()); // 👈 يستدعي الفيفوريت الجديدة

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
// make_read
  const handleCategoryRead = async (categoryId) => {
  try {
    const body = { zekr_category_id: categoryId };
    const res = await patchData(`${BaseUrl}${MAKEREAD}`, body);

    if (res?.success) {
      setReadCategories((prev) => [...prev, categoryId]);
    }

    console.log("Mark Category Read:", res);
  } catch (error) {
    setReaderror("لقد  قمت بقراءة هذا الذكر بالفعل سابقا")
    console.error("Error make category read:", error);
    setTimeout(() => setReaderror(false), 3000);

  }
};

// ===========make_read==============


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
  {categories.map((cat, index) => (
    <Tab
      key={cat.id}
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{cat.name}</Typography>

          {/* 👈 زر العين لكل تب */}
         <IconButton
  size="small"
    sx={{ color: readCategories.includes(cat.id) ? "#007BFF" : "inherit" }} 
  onClick={(e) => {
    e.stopPropagation();
    handleCategoryRead(cat.id);
  }}
>
  <RemoveRedEyeIcon fontSize="small" />
</IconButton>

        </Box>
      }
    />
  ))}
</Tabs>
{readerror && (
  <Alert
    severity="error"
    sx={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      minWidth: "250px",
    }}
  >
    {readerror}
  </Alert>
)}


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
                 id={item.id}              

              text={item.content}
              reward={`تكرار: ${item.repetition}`}
                      likedInitially={favorites.includes(item.id)} // 👈 هنا نمرّر حالة الإعجاب المبدئية
  isCategoryRead={readCategories.includes(categories[value]?.id)} // 👈 هنا

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
