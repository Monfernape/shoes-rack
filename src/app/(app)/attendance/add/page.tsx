import React from "react";
import AttendanceFormBuilder from "../components/AttendanceFormBuilder";
import { AttendanceHeader } from "../components/AttendanceHeader";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const AttendanceForm = async() => {
  const loginUser = await getLoggedInUser();
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: Routes.AddAttendance, label: "Add attendance" },
  ];
  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <AttendanceFormBuilder  loginUser={loginUser}/>
    </>
  );
};

export default AttendanceForm;
