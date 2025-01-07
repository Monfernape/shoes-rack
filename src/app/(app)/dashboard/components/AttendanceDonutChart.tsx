import { Pie, PieChart, ResponsiveContainer, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useMediaQuery from "@/hooks/use-media-query";
const chartData = [
  { attendance: "Present", count: 12, fill: "var(--color-present)" },
  { attendance: "Absent", count: 15, fill: "var(--color-absent)" },
  { attendance: "Leaves", count: 3, fill: "var(--color-leaves)" },
];

const totalCount = chartData.reduce((total, entry) => total + entry.count, 0);

const dataWithPercentage = chartData.map(item => ({
  ...item,
  percentage: ((item.count / totalCount) * 100).toFixed(2),
}));

const chartConfig = {
  count: {
    label: "Visitors",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
  leaves: {
    label: "Leaves",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function AttendanceDonutChart() {
  const isSmallScreen = useMediaQuery("sm");
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-800">
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="attendance"
                innerRadius={isSmallScreen ? 60 : 100}
              />
              <Legend
              className="pie-chart-legend" 
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                formatter={(value) => {
                  const item = dataWithPercentage.find(d => d.attendance === value);
                  return `${value} (${item ? item.percentage : 0}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
