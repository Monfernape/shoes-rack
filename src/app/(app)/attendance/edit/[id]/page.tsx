"use server";
import React from "react";
import AttendanceFormBuilder from "../../components/AttendanceFormBuilder";

import { getAttendanceById } from "../../actions/getAttendanceById";
import { Routes } from "@/lib/routes";
import { AttendanceHeader } from "../../components/AttendanceHeader";
import { getLoggedInUser } from "@/utils/getLoggedInUser";

const AttendanceForm = async ({ params }: { params: { id?: string } }) => {
  const { id: attendanceId } = params;
  const loginUser = await getLoggedInUser();

  let attendanceData = null;

  if (attendanceId) {
    try {
      const response = await getAttendanceById(Number(attendanceId));
      attendanceData = response ? response.data : null;
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }
  const breadcrumbs = [
    { href: Routes.Attendance, label: "Attendance" },
    {
      href: `${Routes.EditAttendance}/${attendanceId}`,
      label: "Edit attendance",
    },
  ];

  return (
    <>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <AttendanceFormBuilder attendance={attendanceData} loginUser={loginUser}/>;
    </>
  );
};

export default AttendanceForm;
