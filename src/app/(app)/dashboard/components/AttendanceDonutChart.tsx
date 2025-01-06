"use client";
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
const chartData = [
  { browser: "Present", visitors: 12, fill: "var(--color-present)" },
  { browser: "Absent", visitors: 15, fill: "var(--color-absent)" },
  { browser: "Leaves", visitors: 3, fill: "var(--color-leaves)" },
];

const chartConfig = {
  visitors: {
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
                dataKey="visitors"
                nameKey="browser"
                innerRadius={100}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
