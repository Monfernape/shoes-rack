"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { getMembers } from "@/app/members/actions/getMembers";

export const getAttendance = async () => {
  const supabase = await getSupabaseClient();

  const membersResponse = await getMembers();
  const members = membersResponse?.data || [];

  const { data: attendanceData } = await supabase
    .from(Tables.Attendance)
    .select("*");

  const enrichedData = (attendanceData || []).map((attendance) => {
    const member = members.find((m) => m.id === attendance.memberId);

    return {
      ...attendance,
      name: member ? member.name : "Unknown",
      shift: member ? member.shift : "Unknown Shift",
    };
  });

  return {
    data: enrichedData,
  };
};
