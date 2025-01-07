"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import moment from "moment";

export const getFundDetailsByMemberId = async (memberId: number) => {
  // first day of current month
  const firstDay = moment()
    .startOf("month")
    .utc()
    .format("YYYY-MM-DD HH:mm:ss.SSSSSS+00");
  // last day of current month
  const lastDay = moment()
    .endOf("month")
    .utc()
    .format("YYYY-MM-DD HH:mm:ss.SSSSSS+00");

  const supabase = await getSupabaseClient();
  const response = await supabase
    .from(Tables.Funds)
    .select()
    .eq("member_id", memberId)
    .gte("created_at", firstDay)
    .lte("created_at", lastDay)

  return response;
};
