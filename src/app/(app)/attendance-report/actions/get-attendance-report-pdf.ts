"use server";

import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAttendanceReportPdf = async () => {
  const supabase = await getSupabaseClient();

  const data = supabase.storage
    .from("attendance")
    .getPublicUrl("attendance_report_December_2024.pdf");

  return data;
};
