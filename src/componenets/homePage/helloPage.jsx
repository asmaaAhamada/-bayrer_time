import { Box, Typography } from "@mui/material";
import PrayerCards from "./card";
import DrawerAppBar from "./navBar";
import NextPrayerCard from "./NextPrayerCard";

export default function HelloPage(){
    return(
        <>
        
         <Box sx={{ p: 2, mt: 1, textAlign: 'center' }}>
        
<NextPrayerCard/>
      </Box>
      
        <PrayerCards/>
        
        </>
    )
}