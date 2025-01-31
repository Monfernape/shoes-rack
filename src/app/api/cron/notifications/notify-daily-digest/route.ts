import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import {
  AttendanceStatus,
  DigestStatus,
  MemberRole,
  UserStatus,
} from "@/constant/constant";
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

      // Fetch members
      const { data: members, error: membersError } = await supabase
        .from(Tables.Members)
        .select("id");

      if (membersError) {
        console.error("Error fetching members:", membersError?.message);
        return null;
      }

      // Fetch attendance and leaves for the current date
      const [attendancesResponse, leavesResponse] = await Promise.all([
        supabase
          .from(Tables.Attendance)
          .select("*")
          .filter(
            "created_at",
            "gte",
            new Date(Date.now() - 864e5).toUTCString()
          ),
        supabase
          .from(Tables.Leaves)
          .select("*")
          .filter(
            "created_at",
            "gte",
            new Date(Date.now() - 864e5).toUTCString()
          ),
      ]);

      if (attendancesResponse.error) {
        console.error("Error fetching attendances:", attendancesResponse.error);
        return null;
      }

      if (leavesResponse.error) {
        console.error("Error fetching leaves:", leavesResponse.error);
        return null;
      }

      const attendances = attendancesResponse.data || [];
      const leavesList = leavesResponse.data || [];

      // get members ids that are exists in leaves and attendances
      const attendanceMemberIds = attendances
        .map((a) => a.memberId)
        .filter(Boolean);
      const leaveMemberIds = leavesList.map((l) => l.memberId).filter(Boolean);

      // Members who have no attendance or leave for the current date
      const membersWithNoRecords = members.filter(
        (member) =>
          !attendanceMemberIds.includes(member.id) &&
          !leaveMemberIds.includes(member.id)
      );

      // Insert rejected attendance for these members
      const newAttendances = membersWithNoRecords.map((member) => ({
        memberId: member.id,
        status: AttendanceStatus.Reject,
        startTime: "12:00",
        endTime: "02:00",
        created_at: `${new Date(Date.now() - 864e5).toUTCString()}`,
      }));
      if (newAttendances.length > 0) {
        const { error: insertError } = await supabase
          .from(Tables.Attendance)
          .insert(newAttendances);
        if (insertError) {
          throw insertError;
        }
      }

      const { data: attendancesList, error: attendanceError } = await supabase
        .from(Tables.Attendance)
        .select("*");

      if (attendanceError) {
        return {
          error: attendanceError.message,
        };
      }

      const absentsMembersIds = new Set(
        attendancesList
          .map((a) => {
            if (a.status === AttendanceStatus.Reject) {
              return a.memberId;
            }
          })
          .filter(Boolean)
      );

      const presentsMembersIds = new Set(
        attendancesList
          .map((a) => {
            if (a.status === AttendanceStatus.Approve) {
              return a.memberId;
            }
          })
          .filter(Boolean)
      );

      const leavesMembersIds = new Set(
        leavesList
          .map((a) => {
            return a.memberId;
          })
          .filter(Boolean)
      );

      const absents = Array.from(absentsMembersIds);
      const presents = Array.from(presentsMembersIds);
      const leaves = Array.from(leavesMembersIds);

      const { error: digestInsertionError } = await supabase
        .from(Tables.Digest)
        .insert({
          status: DigestStatus.Pending,
          absents,
          presents,
          leaves,
        });
      if (digestInsertionError) {
        throw digestInsertionError;
      }

      const allNotification = users.map((user) => ({
        title: "Review Attendance",
        system_generated: true,
        description: "Please Review Attendance",
        memberId: user.id,
        is_read: false,
      }));

      const { error: insertionError } = await supabase
        .from(Tables.Notification)
        .insert(allNotification);

      if (insertionError) {
        return { error: insertionError.message };
      }
    });
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
