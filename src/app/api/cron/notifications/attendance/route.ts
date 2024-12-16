import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { MemberRole, UserStatus } from "@/constant/constant";
import * as cron from "node-cron";

export async function GET() {
  try {
    cron.schedule("0 0 0 * * *", async () => {
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
      for (const user of users) {
        const { error } = await supabase.from(Tables.Notification).insert({
          title: "Review Attendance",
          system_generated: true,
          description: "Please Review Attendance",
          member_id: user.id,
          is_read: true,
        });

        if (error) {
          throw error;
        }
      }
    });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
