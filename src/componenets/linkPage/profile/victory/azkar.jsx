import React from "react";
import { Box, Typography, Card, useTheme } from "@mui/material";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from "victory";
const dailyAzkar = [
    { day: "السبت", count: 18 },
    { day: "الأحد", count: 22 },
    { day: "الإثنين", count: 30 },
    { day: "الثلاثاء", count: 15 },
    { day: "الأربعاء", count: 25 },
    { day: "الخميس", count: 28 },
    { day: "الجمعة", count: 35 },
  ];

export default function DailyAzkarPage(){
     const theme = useTheme(); // استخدام ألوان الثيم
const barColor = theme.palette.mode === "light" ? "#996c38ff" : "#fffefdff";
    return(<>
    
     
    
          {/* 📅 عدد الأذكار اليومية */}
          <Card
            sx={{
              p: 2,
              mb: 4,
              borderRadius: 4,
              boxShadow: 6,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              عدد الأذكار حسب الأيام
            </Typography>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              height={300}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
          tickLabels: { fill: theme.palette.text.primary, fontSize: 8 },
          axis: { stroke: theme.palette.divider },
        }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `${x}`}
                style={{
                  tickLabels: { fontSize: 12, padding: 5 },
                }}
              />
              <VictoryBar
                data={dailyAzkar}
                x="day"
                y="count"
                barWidth={25}
                labels={({ datum }) => `${datum.count}`}
                labelComponent={<VictoryTooltip />}
                style={{
data: { fill: barColor, borderRadius: 5 },
    labels: { fontSize: 10, fill: theme.palette.text.primary },
                }}
              />
            </VictoryChart>
          </Card>
        
        
    
    </>)
}










