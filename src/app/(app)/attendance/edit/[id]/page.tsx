"use server";
import React from "react";
import AttendanceFormBuilder from "../../components/AttendanceFormBuilder";

import { getAttendanceById } from "../../actions/getAttendanceById";

const AttendanceForm = async ({ params }: { params: { id?: string } }) => {
  const { id: attendanceId } = params;

  let attendanceData = null;

  if (attendanceId) {
    try {
      const response = await getAttendanceById(Number(attendanceId));
      attendanceData = response ? response.data : null;
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }

  return <AttendanceFormBuilder attendance={attendanceData} />;
};

export default AttendanceForm;
