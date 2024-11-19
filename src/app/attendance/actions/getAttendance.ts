"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../utils/supabase/supabaseClient";
import { getMembers } from "@/app/members/actions/getMembers";

export const getAttendance = async () => {
  const supabase = await getSupabaseClient();

  const membersResponse = await getMembers("");
  const members = membersResponse?.data || [];
  const { data: attendanceData } = await supabase
    .from(Tables.Attendance)
    .select("*");
  const updateAttendance = (attendanceData || []).map((attendance) => {
    const member = members.find((member) => attendance.memberId === member.id);
    return {
      ...attendance,
      name: member?.name,
      shift: member?.shift,
    };
  });

  return updateAttendance;
};
