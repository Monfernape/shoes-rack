"use server";
import { MemberRole } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { permanentRedirect } from "next/navigation";
export const getLeaveRequestById = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();
  const { data: leaveDetails, error } = await supabase
    .from(Tables.Leaves)
    .select(
      `*,
      member:memberId (
        name,
        shift,role
      )
    `
    )
    .eq("id", requestId)
    .maybeSingle();
  if (error) {
    return "Something went wrong";
  }
  let isPermission = true;
  switch (loginUser.role) {
    case MemberRole.Member:
      isPermission = leaveDetails.member !== loginUser.id ? false : true;
      break;
    case MemberRole.ShiftIncharge:
      if (leaveDetails.member.shift === loginUser.shift) {
        isPermission =
          leaveDetails.member.role === MemberRole.Member ? true : false;
      } else {
        isPermission = false;
      }
      break;
  }
  if (!isPermission) {
    return permanentRedirect(Routes.LeaveRequest);
  }
  return leaveDetails;
};



