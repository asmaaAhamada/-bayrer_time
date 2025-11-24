import React, { useEffect } from "react";
import { Box, Card, Typography, Button, Divider, useTheme, Grid, CircularProgress, Alert } from "@mui/material";
import MosqueIcon from "@mui/icons-material/Mosque";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';import { useDispatch, useSelector } from "react-redux";
import { fetch_get_date } from "../../Reducer/date/all_data";
import { fetchconvert } from "../../Reducer/date/convert";

export default function Hijri_DatePage() {
const calendar = useSelector(
  (state) => state.get_data
);
// console.log(calendar.data.calendar
// )
const { data, isloading ,error } = useSelector((state) => state.get_data);

  const dispath=useDispatch()

const state= useSelector((state)=>state.convert)
  console.log(data?.data?.day
)
    const {Isloading }= useSelector((state)=>state.convert)



useEffect(() => {
  dispath(fetchconvert())

  }, [])

  useEffect(()=>{
dispath(fetch_get_date())
  },[])
    const theme= useTheme()
  const month = data?.calendar?.[0]?.month;
const year = data?.calendar?.[0]?.year;

  return (
    <>
             
    <Box
      sx={{
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 5,
          boxShadow: 8,
          textAlign: "center",
          p: 4,
          color:"white",
          position: "relative",
          overflow: "hidden",
          background: 'linear-gradient(135deg, #d37217ff 0%, #a86e16ff 100%)',
                      boxShadow: '0 0 20px 5px rgba(255, 200, 0, 0.6)',

        }}
      >
     <Typography variant="h5" fontWeight="bold">
            اليوم الهجري
            <EditCalendarIcon/>
          </Typography>
     {Isloading ? (
                      <CircularProgress color="primary" />
                    ):(<> <Typography variant="h6" color="primary">
            {state?.data?.day} {state?.data?.month} {state?.data?.year} هـ
          </Typography>
    
          <Typography variant="body2" mt={1}>
            {state?.data?.hijri_date}
          </Typography></>)}
          </Card>
          </Box>
         
          {/* ==================اليوم الهجري========================== */}
    <Box
      sx={{
        minHeight: "400%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 5,
          boxShadow: 8,
          textAlign: "center",
          p: 4,
          position: "relative",
          overflow: "hidden",
          bgcolor: "background.main",
        }}
      >
        {/* عنوان */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
التقويم الهجري        </Typography>
{isloading?(        <CircularProgress color="primary" />
):error?(<Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>):(<>
         <Typography variant="h6" fontWeight="bold" color="primary">
    {month} {year}
  </Typography>
<Grid container spacing={1} columns={7}>
  {data?.calendar.map((item, index) => {
    
    const today = new Date().getDate(); // يوم التقويم الميلادي الحالي
    const isToday = Number(item.day) === today;


    return (

      
      <Grid item xs={1} key={index}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            textAlign: "center",
            border: "1px solid #ddd",
            bgcolor: isToday ? "primary.main" : "background.paper",
            color: isToday ? "#fff" : "text.primary",
            boxShadow: isToday ? 3 : 0,
            fontWeight: isToday ? "bold" : "normal",
          }}
        >
          <Typography>{item.day}</Typography>
          <Typography variant="caption">{item.weekday}</Typography>
        </Box>
      </Grid>
    );
  })}
</Grid>
        
        </>)}
      


      </Card>
    </Box>
    </>
  );
}
