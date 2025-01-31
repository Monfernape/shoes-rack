import { AttendanceStatus } from "@/constant/constant";
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
    const [
      attendanceResponsePresents,
      attendanceResponseAbsents,
      leavesResponse,
    ] = await Promise.all([
      supabase
        .from(Tables.Attendance)
        .select("*, members(name, shift)")
        .eq("status", AttendanceStatus.Approve)
        .in("memberId", digestData.presents),
      supabase
        .from(Tables.Attendance)
        .select("*, members(name, shift)")
        .eq("status", AttendanceStatus.Reject)
        .in("memberId", digestData.absents),
      supabase
        .from(Tables.Leaves)
        .select("*, members(name, shift)")
        .in("memberId", digestData.leaves),
    ]);

    if (
      attendanceResponsePresents.error ||
      attendanceResponseAbsents.error ||
      leavesResponse.error
    ) {
      console.error(
        "Error fetching attendance or leaves:",
        attendanceResponsePresents.error?.message ||
          attendanceResponseAbsents.error?.message ||
          leavesResponse.error?.message
      );
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
      absents,
      presents,
      leaves,
    };
  } catch (error) {
    console.error("Error processing digest data:", error);
  }
};
