import React from "react";
import { PageLayout } from "../../layout/PageLayout";
import { AttendanceReportList } from "./components/AttendanceReport";
import { AttendanceProgress } from "@/constant/constant";

const Page = async () => {
  const attendanceReport = [
    {
      name: "John Doe",
      id: "1",
      attendancePercentage: "90%",
      attendanceStatus: AttendanceProgress.Excellent,
      createdAt: "2024-11-01T10:00:00Z",
    },
    {
      name: "Jane Smith",
      id: "2",
      attendancePercentage: "85%",
      attendanceStatus: AttendanceProgress.VeryGood,
      createdAt: "2024-11-10T14:30:00Z",
    },
    {
      name: "Mike Johnson",
      id: "3",
      attendancePercentage: "72%",
      attendanceStatus: AttendanceProgress.Good,
      createdAt: "2024-10-25T08:15:00Z",
    },
    {
      name: "Emma Brown",
      id: "4",
      attendancePercentage: "65%",
      attendanceStatus: AttendanceProgress.Average,
      createdAt: "2024-09-15T12:00:00Z",
    },
    {
      name: "Emma Brown",
      id: "4",
      attendancePercentage: "50%",
      attendanceStatus: AttendanceProgress.low,
      createdAt: "2024-10-15T12:00:00Z",
    },
  ];

  return (
    <PageLayout>
      <AttendanceReportList data={attendanceReport} />
    </PageLayout>
  );
};

export default Page;
