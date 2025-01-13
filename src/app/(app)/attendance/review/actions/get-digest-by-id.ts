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
    console.error("Error fetching digest:", digestError.message);
  }

  const date = new Date(digestData.created_at);

  const digestCreatedAt = date.toISOString().split('T')[0];

  const [absentsResults, presentsResult, leavesResult] = await Promise.all([
    supabase
      .from(Tables.Attendance)
      .select("*")
      .eq("status", AttendanceStatus.Reject)
      .in("memberId", digestData.absents || []),

    supabase
      .from(Tables.Attendance)
      .select("*")
      .eq("status", AttendanceStatus.Approve)
      .in("memberId", digestData.presents || []),

    supabase
      .from(Tables.Leaves)
      .select("*")
      .eq("status", LeavesRequestStatus.Approved)
      .in("memberId", digestData.leaves || []),
  ]);

  if (absentsResults.error ?? presentsResult.error ?? leavesResult.error) {
    console.warn(
      "Error fetching leaves:",
      absentsResults.error?.message ??
        presentsResult.error?.message ??
        leavesResult.error?.message
    );
  }

  if (leavesResult.error) {
    console.warn("Error fetching leaves:", leavesResult.error.message);
  }


  const absents = absentsResults.data?.filter((attendance)=>attendance.created_at.includes(digestCreatedAt));
  const presents = presentsResult.data?.filter((attendance)=>attendance.created_at.includes(digestCreatedAt));
  const leaves = leavesResult.data?.filter((attendance)=>attendance.created_at.includes(digestCreatedAt));

  return {
    id: digestData.id,
    created_date: digestData.created_date,
    status: digestData.status,
    absents: absents || [],
    presents: presents || [],
    leaves: leaves || [],
  };
};