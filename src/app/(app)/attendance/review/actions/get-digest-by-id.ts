import { AttendanceStatus, DigestStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export type Digest = {
  id: number;
  created_at: string;
  status: string;
  presents: number[];
  absents: number[];
  leaves: number[];
};

export const getDigestById = async (id: number) => {
  const supabase = await getSupabaseClient();

  try {
    // Fetch the digest data
    const { data: digestData, error: digestError } = await supabase
      .from(Tables.Digest)
      .select("*")
      .eq("id", id) // Use the dynamic id passed to the function
      .single();

    if (digestError || !digestData) {
      console.error(
        "Error fetching digest:",
        digestError?.message || "No digest data found"
      );
    }

    // Fetch the attendance and leaves data concurrently
    if (digestData.status === DigestStatus.Confirmed) {
      const [
        attendanceResponsePresents,
        attendanceResponseAbsents,
        leavesResponse,
      ] = await Promise.all([
        supabase
          .from(Tables.Attendance)
          .select("*, members(name, shift)")
          .eq("status", AttendanceStatus.Approve)
          .in("memberId", digestData.presents)
          .filter(
            "created_at",
            "gte",
            new Date(
              Number(new Date(digestData.created_at)) - 864e5
            ).toUTCString()
          ),
        supabase
          .from(Tables.Attendance)
          .select("*, members(name, shift)")
          .eq("status", AttendanceStatus.Reject)
          .in("memberId", digestData.absents)
          .filter(
            "created_at",
            "gte",
            new Date(
              Number(new Date(digestData.created_at)) - 864e5
            ).toUTCString()
          ),
        supabase
          .from(Tables.Leaves)
          .select("*, members(name, shift)")
          .in("memberId", digestData.leaves)
          .filter(
            "created_at",
            "gte",
            new Date(
              Number(new Date(digestData.created_at)) - 864e5
            ).toUTCString()
          ),
      ]);

      if (
        attendanceResponsePresents.error ||
        attendanceResponseAbsents?.error ||
        leavesResponse.error
      ) {
        throw new Error();
      }

      const attendanceListPresents = attendanceResponsePresents.data || [];
      const attendanceListAbsents = attendanceResponseAbsents.data || [];
      const leavesList = leavesResponse.data || [];

      // Process absents and presents based on the attendance status
      const absents = attendanceListAbsents;
      const presents = attendanceListPresents;
      // Assuming leaves are represented by the `leavesList`
      const leaves = leavesList;
      return {
        id: digestData.id,
        created_at: digestData.created_at,
        status: digestData.status,
        presents,
        absents,
        leaves,
      };
    } else {
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
          .select("*, members(name, shift)")
          .filter(
            "created_at",
            "gte",
            new Date(Date.now() - 864e5).toUTCString()
          ),
        supabase
          .from(Tables.Leaves)
          .select("*, members(name, shift)")
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
        startTime: "00:00",
        endTime: "00:00",
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
        .select("*, members(name, shift)");

      if (attendanceError) {
        return {
          error: attendanceError.message,
        };
      }

      const absentsMembersIds = new Set(
        attendancesList
          .map((a) => {
            if (a.status === AttendanceStatus.Reject) {
              return a;
            }
          })
          .filter(Boolean)
      );

      const presentsMembersIds = new Set(
        attendancesList
          .map((a) => {
            if (a.status === AttendanceStatus.Approve) {
              return a;
            }
          })
          .filter(Boolean)
      );

      const leavesMembersIds = new Set(
        leavesList
          .map((a) => {
            return a;
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
          presents,
          absents,
          leaves,
        });
      if (digestInsertionError) {
        throw digestInsertionError;
      }
      return {
        id: digestData.id,
        created_at: digestData.created_at,
        status: digestData.status,
        presents,
        absents,
        leaves,
      };
    }
  } catch (error) {
    console.error("Error processing digest data:", error);
  }
};
