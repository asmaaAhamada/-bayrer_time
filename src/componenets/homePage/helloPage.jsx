import { Box, Typography } from "@mui/material";
import PrayerCards from "./card";
import DrawerAppBar from "./navBar";
import NextPrayerCard from "./NextPrayerCard";

export default function HelloPage(){
    return(
        <>
        
         <Box sx={{ p: 2, mt: 1, textAlign: 'center' }}>
        <Typography variant="h6" color="color: theme.palette.primary.contrastText">
           تابع أوقات الصلاة بدقة في سوريا، احصل على مواقيت الأذكار اليومية، وحدد اتجاه القبلة بسهولة. كل شيء هنا ليسهل عليك عبادتك اليومية.
        </Typography>
<NextPrayerCard/>
      </Box>
      
        <PrayerCards/>
        
        </>
    )
}