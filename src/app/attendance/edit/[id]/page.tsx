"use server";
import React from "react";
import AttendanceFormBuilder from "../../components/AttendanceFormBuilder";

import { UserRole, UserStatus } from "@/constant/constant";
import { getAttendanceById } from "../../actions/getAttendanceById";
import { User } from "@/types";

const AttendanceForm = async ({ params }: { params: { id?: string } }) => {
  const { id: attendanceId } = params;

  const loginUser: User = {
    id: 1,
    name: "Muhammad Bilal Ali khokhar",
    shift: "A",
    role: UserRole.Member,
    status: UserStatus.Active,
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };
  let attendanceData = null;

  if (attendanceId) {
    try {
      const response = await getAttendanceById(Number(attendanceId));
      attendanceData = response ? response.data : null;
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  }

  return (
    <AttendanceFormBuilder initialData={attendanceData} loginUser={loginUser} />
  );
};

export default AttendanceForm;
