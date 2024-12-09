import React from "react";
import AttendanceFormBuilder from "../components/AttendanceFormBuilder";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";

const AttendanceForm = () => {
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.AddAttendance, label: "Add Attendance" },
  ];
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <AttendanceFormBuilder />
    </>
  );
};

export default AttendanceForm;
