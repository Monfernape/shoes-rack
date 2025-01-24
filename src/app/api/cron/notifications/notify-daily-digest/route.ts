import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { DigestStatus, MemberRole, UserStatus } from "@/constant/constant";
import * as cron from "node-cron";
// every day at midnight
const EVERY_DAY_AT_MIDNIGHT = "* * * * *";

export async function GET() {
  try {
    cron.schedule(EVERY_DAY_AT_MIDNIGHT, async () => {
      const supabase = await getSupabaseClient();
      const { data: users, error } = await supabase
        .from(Tables.Members)
        .select()
        .or(
          `role.eq.${MemberRole.Incharge},role.eq.${MemberRole.ShiftIncharge}`
        )
        .neq("status", UserStatus.Deactivated);
      if (error) {
        throw error;
      }

      const allNotification = users.map((user) => ({
        title: "Review Attendance",
        system_generated: true,
        description: "Please Review Attendance",
        member_id: user.id,
        is_read: false,
      }));
      const { error: insertionError } = await supabase
        .from(Tables.Notification)
        .insert([...allNotification]);
      if (insertionError) {
        return { error: insertionError.message };
      }
      const { error: digestInsertionError } = await supabase
        .from(Tables.Digest)
        .insert({
          status: DigestStatus.Pending,
        });
      if (digestInsertionError) {
        return { error: digestInsertionError.message };
      }
    });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
