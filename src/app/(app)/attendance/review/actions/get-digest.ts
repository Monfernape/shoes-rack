import {
  AttendanceStatus,
  DigestStatus,
  MemberRole,
  UserStatus,
} from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export type Digest = {
  id: number;
  created_at: string;
  status: string;
  presents: number[];
  absents: number[];
  leaves: number[];
};

export const getDigest = async (dateQuery: Date) => {
  const supabase = await getSupabaseClient();
  const loggedInUser = await getLoggedInUser();

  const startDate = `${dateQuery
    .toISOString()
    .slice(0, 10)} 00:00:00.000005+00`;
  const endDate = `${dateQuery.toISOString().slice(0, 10)} 23:59:59.000005+00`;

  const shift =
    loggedInUser.role === MemberRole.ShiftIncharge ? loggedInUser.shift : null;
  let digestData, digestError;

  try {
    const query = supabase.from(Tables.Digest).select("*");
    if (shift) {
      query.eq("shift", shift);
    }

    const { data, error } = await query
      .lte("created_at", endDate)
      .gte("created_at", startDate);

    if (error || !data) {
      throw new Error(error?.message || "No digest data found");
    }

    if (!data.length) {
      return null;
    }

    // Process the data
    digestData = {
      id: data?.[0]?.id,
      created_at: data?.[0]?.created_at,
      status: data?.[0]?.status,
      presents: data?.map((i) => i.presents).flat(),
      absents: data?.map((i) => i.absents).flat(),
      leaves: data?.map((i) => i.leaves).flat(),
    };

    if (digestError || !digestData) {
      console.error(
        "Error fetching digest:",
        digestError || "No digest data found"
      );
    }

    if (digestData && !Array.isArray(digestData)) {
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
            .eq("members.status", UserStatus.Active)
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
            .eq("members.status", UserStatus.Active)
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

        const presents = attendanceResponsePresents.data || [];
        const absents = attendanceResponseAbsents.data || [];
        const leaves = leavesResponse.data || [];

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
          .select("id, name, shift")
          .eq("status", UserStatus.Active);

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
          console.error(
            "Error fetching attendances:",
            attendancesResponse.error
          );
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

        const leaveMemberIds = leavesList
          .map((l) => l.memberId)
          .filter(Boolean);

        // Members who have no attendance or leave for the current date
        const membersWithNoRecords = members.filter((member) => {
          if (
            !attendanceMemberIds.includes(member.id) &&
            !leaveMemberIds.includes(member.id)
          ) {
            return member;
          }
        });

        const presentsMembers = attendances
          .map((attendance) => {
            if (
              attendance.status === AttendanceStatus.Approve ||
              attendance.status === AttendanceStatus.Pending
            ) {
              return attendance;
            }
          })
          .filter(Boolean);

        const absentsMembers = attendances
          .map((attendance) => {
            if (attendance.status === AttendanceStatus.Reject) {
              return attendance;
            }
          })
          .filter(Boolean);

        // Insert rejected attendance for these members
        const absentsMembersList = membersWithNoRecords.map((member) => ({
          id: member.id,
          memberId: member.id,
          status: AttendanceStatus.Reject,
          startTime: "00:00",
          endTime: "00:00",
          created_at: `${new Date(Date.now() - 864e5).toUTCString()}`,
          members: {
            name: member.name,
            shift: member.shift,
          },
        }));

        const allAbsentsMembers = [...absentsMembers, ...absentsMembersList];

        const absentsItems = new Set(
          allAbsentsMembers
            .map((a) => {
              if (a.status === AttendanceStatus.Reject) {
                return a;
              }
            })
            .filter(Boolean)
        );

        const presentsItems = new Set(
          presentsMembers
            .map((a) => {
              if (
                a.status === AttendanceStatus.Approve ||
                a.status === AttendanceStatus.Pending
              ) {
                return {
                  ...a,
                  status: AttendanceStatus.Approve,
                };
              }
            })
            .filter(Boolean)
        );

        const leavesItems = new Set(
          leavesList
            .map((a) => {
              return a;
            })
            .filter(Boolean)
        );

        const presents = Array.from(presentsItems);
        const absents = Array.from(absentsItems);
        const leaves = Array.from(leavesItems);

        return {
          id: digestData.id,
          created_at: digestData.created_at,
          status: digestData.status,
          presents,
          absents,
          leaves,
        };
      }
    }
  } catch (error) {
    console.error("Error processing digest data:", error);
  }
};
