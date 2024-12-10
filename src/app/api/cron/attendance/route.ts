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
    console.log("HI");
    // cron.schedule("0 0 0 * * *", async () => {
    const supabase = await getSupabaseClient();

    const getAllAttendance = supabase
      .from(Tables.Attendance)
      .select(`* , ${Tables.Members} (shift,role,name)`)
      .eq("status", AttendanceStatus.Pending);
    // .eq("created_at", Date.now() - 1);

    const getInchargePhoneNumber = supabase
      .from(Tables.Members)
      .select(`phoneNumber`)
      .eq("role", MemberRole.Incharge);

    const getShiftInchargePhoneNumbers = supabase
      .from(Tables.Members)
      .select(`phoneNumber,shift`)
      .eq("role", MemberRole.ShiftIncharge);

    const [
      { data: allAttendance },
      { data: inchargePhoneNumber },
      { data: shiftInchargePhoneNumber },
    ] = await Promise.all([
      getAllAttendance,
      getInchargePhoneNumber,
      getShiftInchargePhoneNumbers,
    ]);
    console.log("data", allAttendance);
    // In case of Holidays
    if (allAttendance?.length === 0) {
      return;
    }

    if (inchargePhoneNumber) {
      // send Notification to Incharge
      // return;
    }

    if (shiftInchargePhoneNumber) {
      for (let shift of shiftInchargePhoneNumber) {
        allAttendance?.filter(
          (attendance) => attendance.members.shift === shift.shift
        );

        // Send Notification to the shift Incharges
      }
    }

    // });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
