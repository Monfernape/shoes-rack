import { Member } from "@/types";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { AttendanceStatus, MemberRole } from "@/constant/constant";
import * as cron from "node-cron";
export async function GET() {
  try {
    cron.schedule("0 0 0 * * *", async () => {
      const supabase = await getSupabaseClient();
      const { data: attendance, error } = await supabase
        .from(Tables.Attendance)
        .select()
        .eq("status", AttendanceStatus.Pending);
      if (error) {
        throw error;
      }
      const shiftInchargesAttendance = attendance?.filter(
        (attendance) => attendance.role === MemberRole.ShiftIncharge
      );
      const memberAttendance = shiftInchargesAttendance?.map(
        (shiftIncharge) => {
          attendance?.filter(
            (shift) =>
              shift.shift === shiftIncharge.shift &&
              shift.role === MemberRole.Member
          );
        }
      );
      memberAttendance?.map(() => {
        //here we will handle Whatsapp Notifications
        return;
      });
    });

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
