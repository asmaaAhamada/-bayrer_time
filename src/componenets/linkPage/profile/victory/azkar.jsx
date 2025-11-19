import React, { useEffect } from "react";
import { Box, Typography, Card, useTheme } from "@mui/material";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { useDispatch, useSelector } from "react-redux";
import { fetch_status } from "../../../../Reducer/payere/get_staticsit";

export default function DailyAzkarPage() {
  const theme = useTheme();
  const barColor = theme.palette.mode === "light" ? "#996c38ff" : "#fffefdff";
  const dispatch = useDispatch();

  const statusData = useSelector((state) => state.get_staticces.data);
  console.log(statusData)
  const isLoading = useSelector((state) => state.get_staticces.isloading);

  useEffect(() => {
    dispatch(fetch_status());
  }, [dispatch]);

 

 // تحويل weekly_statistics إلى مصفوفة من القيم
const weeklyData = statusData?.weekly_statistics
  ? Object.values(statusData.weekly_statistics).map((item) => ({
      zekr_name: item.zekr_name,
      count: item.count,
    }))
  : [];


  return (
    <>
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

        {isLoading ? (
          <Typography>جارٍ تحميل البيانات...</Typography>
        ) : (
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={300}
          >
            <VictoryAxis
              tickFormat={(t) => t}
              style={{
                tickLabels: { fill: theme.palette.text.primary, fontSize: 10 },
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
  data={weeklyData}
  x="zekr_name"
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
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          النسبة الإجمالية: {statusData?.overall_percentage || "0%"} | الحالة:{" "}
          {statusData?.status || "-"}
        </Typography>
      </Card>
    </>
  );
}
