import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { AttendanceStatus, MemberRole, Shift } from "@/constant/constant";
import * as cron from "node-cron";

const SHIFT_TIMING = [
  {
    time: "Shift 12:00am to 00:06am",
    shift: Shift.ShiftA,
  },
  {
    time: "Shift 00:06am to 00:12pm",
    shift: Shift.ShiftB,
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    shift: Shift.ShiftC,
  },
  {
    time: "Shift 00:06pm to 00:12am",
    shift: Shift.ShiftD,
  },
];

export async function GET() {
  try {
    cron.schedule("0 0 0 * * *", async () => {
      // Get All Attendances
      const supabase = await getSupabaseClient();
      const { data: attendance, error } = await supabase
        .from(Tables.Attendance)
        .select(`*,${Tables.Members} (role,shift,phoneNumber)`)
        .eq("status", AttendanceStatus.Pending);

      if (error) {
        throw error;
      }
      // In case of Holidays
      else if (attendance.length === 0) {
        return attendance;
      }
      // Get Incharge Phone Number from the database
      const { data: incharge, error: inchargeError } = await supabase
        .from(Tables.Members)
        .select("phoneNumber")
        .eq("role", MemberRole.Incharge);

      if (inchargeError) {
        throw inchargeError;
      }
      //Send Notification to Incharge
      console.warn(incharge);

      // Filter All Shift Incharges Attendance
      const shiftInchargesAttendance = attendance?.filter(
        (attendance) => attendance?.members.role === MemberRole.ShiftIncharge
      );

      // Filter All Members
      const memberAttendance = attendance?.filter(
        (attendance) => attendance.members.role === MemberRole.Member
      );
      //Send Notification to Shift Incharge
      SHIFT_TIMING.map(async (shiftIncharge) => {
        const shiftInchargePhoneNumber = shiftInchargesAttendance.find(
          (attendance) => attendance.members.shift === shiftIncharge.shift
        );

        if (shiftInchargePhoneNumber) {
          // send notification to the phone number of the shift Incharge
          return shiftInchargePhoneNumber.members.phoneNumber;
        }
        const { data: phoneNumberOfunattendedShiftIncharge, error } =
          await supabase
            .from(Tables.Members)
            .select("phoneNumber")
            .eq("role", MemberRole.ShiftIncharge)
            .eq("shift", shiftIncharge.shift);
        if (error) {
          throw error;
        }
        // send Notification to the phone number of unattended shiftIncharge
        return phoneNumberOfunattendedShiftIncharge;
      });
      // Map members to related shift
      SHIFT_TIMING?.map((shift) => {
        const results = memberAttendance.filter(
          (attendance) => attendance.members.shift === shift.shift
        );
        return {
          shift: shift.shift,
          attendance: results,
        };
      });
    });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
