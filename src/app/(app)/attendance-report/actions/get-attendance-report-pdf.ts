"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { format } from "date-fns";

export const getAttendanceReportPdf = async (query: string) => {
  const supabase = await getSupabaseClient();
  const formattedQuery = format(query, "MMMM-yyyy");
  const fileName = `attendance-report-${formattedQuery}.pdf`;
  const data = supabase.storage.from("attendance").getPublicUrl(fileName);

  return data;
};
