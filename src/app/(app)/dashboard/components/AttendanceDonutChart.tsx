"use client";
import { Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useMediaQuery from "@/hooks/use-media-query";
import { attendanceDetailsType } from "@/types";

interface Props {
  attendanceDetails: attendanceDetailsType;
}

export function AttendanceDonutChart({ attendanceDetails }: Props) {
  const isSmallScreen = useMediaQuery("sm");

  const chartData = [
    {
      attendance: "Present",
      count: attendanceDetails?.presentCount ?? 0,
      fill: "var(--color-present)",
    },
    {
      attendance: "Absent",
      count: attendanceDetails?.absentCount ?? 0,
      fill: "var(--color-absent)",
    },
    {
      attendance: "Leaves",
      count: attendanceDetails?.totalApprovedLeaveDays ?? 0,
      fill: "var(--color-leaves)",
    },
  ];

  const totalCount = chartData.reduce((total, entry) => total + entry.count, 0);

  const dataWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: totalCount ? ((item.count / totalCount) * 100).toFixed(2) : 0,
  }));

  const chartConfig = {
    count: {
      label: "Attendance",
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

  // Check if all values are zero
  const isDataEmpty = totalCount === 0;
  const disabledColor = "hsl(var(--row-color))";

  const chartSegments = chartData.map((item) => ({
    ...item,
    fill: isDataEmpty ? disabledColor : item.fill,
    count: isDataEmpty ? 1 : item.count,
  }));

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
              {!isDataEmpty && (
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
              )}
              <Pie
                data={chartSegments}
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
                  const item = dataWithPercentage.find(
                    (d) => d.attendance === value
                  );
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
