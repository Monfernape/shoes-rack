import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import {
  AttendanceStatus,
  MemberRole,
  SHIFT_TIMING,
} from "@/constant/constant";
import * as cron from "node-cron";

export async function GET() {
  try {
    cron.schedule("0 0 0 * * *", async () => {
      const supabase = await getSupabaseClient();

      const { data: allAttendance, error } = await supabase
        .from(Tables.Attendance)
        .select(`*,${Tables.Members} (role,shift,phoneNumber)`)
        .eq("status", AttendanceStatus.Pending);

      // Get All Attendances and Incharge Phone Number
      if (error) {
        throw error;
      }
      // In case of Holidays
      if (allAttendance?.length === 0) {
        return;
      }

      // Filter All Shift Incharges Attendance
      const shiftInchargesAttendance = allAttendance?.filter(
        (attendance) => attendance.members.role === MemberRole.ShiftIncharge
      );

      //Send Notification to Incharge
      const inchargeAttendance = allAttendance?.find(
        (attendance) => attendance.members.role === MemberRole.Incharge
      );
      // handle Incharge Notification

      // in case of absence of incharge then we will go to member table for getting phone number of the incharge
      if (!inchargeAttendance) {
        await supabase.from(Tables.Members).select("phoneNumber");
        // handle Incharge Notification
      }

      //Send Notification to Shift Incharge
      for (let shiftTiming of SHIFT_TIMING) {
        const shiftInchargePhoneNumber = shiftInchargesAttendance?.find(
          (attendance) => attendance.members.shift === shiftTiming.shift
        );
        if (shiftInchargePhoneNumber) {
          // Handle Whatsapp Notification for  attended Shift Incharge
          return;
        }
        const { error } = await supabase
          .from(Tables.Members)
          .select("phoneNumber")
          .eq("role", MemberRole.ShiftIncharge)
          .eq("shift", shiftTiming.shift);
        if (error) {
          throw error;
        }
        // Handle Whatsapp Notification for Un attended Shift Incharge
        return;
      }
    });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
