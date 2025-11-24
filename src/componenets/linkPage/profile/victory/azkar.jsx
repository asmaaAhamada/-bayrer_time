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
  const dispatch = useDispatch();

  const statusData = useSelector((state) => state.get_staticces.data);
  const isLoading = useSelector((state) => state.get_staticces.isloading);

  useEffect(() => {
    dispatch(fetch_status());
  }, [dispatch]);

  const weeklyData = statusData?.weekly_statistics
    ? Object.values(statusData.weekly_statistics).map((item) => ({
        zekr_name: item.zekr_name,
        count: item.count,
      }))
    : [];

  // استخدم لون primary من الثيم للأشرطة
  const barColor = theme.palette.primary.main;
  const labelColor = theme.palette.text.primary;
  const textHighlight = theme.palette.mode === "light" 
    ? theme.palette.primary.dark 
    : theme.palette.primary.light;

  return (
    <Card
      sx={{
        p: 2,
        mb: 4,
        borderRadius: 4,
        boxShadow: 6,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold", color: labelColor }}>
        عدد الأذكار حسب الأيام
      </Typography>

      {isLoading ? (
        <Typography sx={{ color: labelColor }}>جارٍ تحميل البيانات...</Typography>
      ) : (
        <VictoryChart theme={VictoryTheme.material} domainPadding={20} height={300}>
          <VictoryAxis
            tickFormat={(t) => t}
            style={{
              tickLabels: { fill: labelColor, fontSize: 10 },
              axis: { stroke: theme.palette.divider },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}`}
            style={{
              tickLabels: { fill: labelColor, fontSize: 12, padding: 5 },
              axis: { stroke: theme.palette.divider },
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
              labels: { fontSize: 10, fill: labelColor },
            }}
          />
        </VictoryChart>
      )}

      <Typography variant="body2" sx={{ mt: 2, color: textHighlight, fontSize: '24px' }}>
        النسبة الإجمالية: {statusData?.overall_percentage || "0%"} | الحالة: {statusData?.status || "-"}
      </Typography>
    </Card>
  );
}

