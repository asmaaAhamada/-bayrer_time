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
const favAzkar = [
    { name: "تسبيح", count: 40 },
    { name: "استغفار", count: 32 },
    { name: "تحميد", count: 25 },
    { name: "تهليل", count: 18 },
    { name: "الصلاة على النبي ﷺ", count: 45 },
  ];


export default function Fav_AzkarPage(){
      const theme = useTheme();
const barColor = theme.palette.mode === "light" ? "#996c38ff" : "#fffefdff";

    return(<>
    
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
          الأذكار التي تم تفضيلها
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
            data={favAzkar}
            x="name"
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










