"use server";

import { AttendanceStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { LeavesRequestStatus } from "@/types";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export type Digest = {
  id: number;
  created_date: string;
  status: string;
  presents: number[];
  absents: number[];
  leaves: number[];
};

export const getDigestById = async (id: number): Promise<Digest | Error> => {
  const supabase = await getSupabaseClient();

  const { data: digestData, error: digestError } = await supabase
    .from(Tables.Digest)
    .select("*")
    .eq("id", id)
    .single();

  if (digestError) {
    throw new Error(digestError.message);
  }

  const { data: attendances, error: attendancesError } = await supabase
    .from(Tables.Attendance)
    .select("*")
    .neq("status", AttendanceStatus.Pending)
    .in("memberId", digestData.absents);

  if (attendancesError) {
    throw new Error(attendancesError.message);
  }

  const { data: leaves, error: leavesError } = await supabase
    .from(Tables.Attendance)
    .select("*")
    .eq("status", LeavesRequestStatus.Approved)
    .in("memberId", digestData.absents);

  if (leavesError) {
    throw new Error(leavesError.message);
  }

  const absents = attendances?.filter(
    (attendance) => attendance.status === AttendanceStatus.Reject
  );
  const presents = attendances?.filter(
    (attendance) => attendance.status === AttendanceStatus.Approve
  );


  return {
    id: digestData.id,
    created_date: digestData.created_date,
    status: digestData.status,
    absents: absents || [],
    presents: presents || [],
    leaves: leaves || [],
  };
};