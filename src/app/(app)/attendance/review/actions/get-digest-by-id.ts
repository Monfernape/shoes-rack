import {
  AttendanceStatus,
  DigestStatus,
  LeaveRequestStatus,
} from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export type Digest = {
  id: number;
  created_date: string;
  status: string;
  presents: number[];
  absents: number[];
  leaves: number[];
};

export const getDigestById = async (id: number) => {
  const supabase = await getSupabaseClient();

  // Fetch the digest data
  const { data: digestData, error: digestError } = await supabase
    .from(Tables.Digest)
    .select("*")
    .eq("id", id)
    .single();

  if (digestError) {
    console.error("Error fetching digest:", digestError?.message);
    return null;
  }

  const fetchTableData = async ({
    status,
    table,
    membersId,
  }: {
    status: AttendanceStatus | LeaveRequestStatus;
    table: Tables;
    membersId?: number[];
  }) => {
    try {

      const createdAt = new Date(digestData.created_at);

      // Calculate the date range for the previous day beacuse
      const fromDate = new Date(createdAt);
      fromDate.setDate(createdAt.getDate() - 1);
      fromDate.setHours(0, 0, 0, 0); // Start of previous day

      const toDate = new Date(fromDate);
      toDate.setHours(23, 59, 59, 999); // End of previous day

      // Fetch data from Supabase table
      let query = supabase
        .from(table)
        .select("*")
        .eq("status", status)
        .gte("created_at", fromDate.toISOString())
        .lte("created_at", toDate.toISOString());

      // If membersId is provided, filter the data by memberId
      if (membersId && membersId.length > 0) {
        query = query.in("memberId", membersId);
      }

      const { data, error } = await query;

      // If there's an error in the query
      if (error) {
        console.error("Error fetching data:", error.message);
        return [];
      }

      // Return the fetched data
      return data;
    } catch (error) {
      console.error("Error processing data:", error);
      return [];
    }
  };

  try {
    if (digestData.status === DigestStatus.Confirmed) {
      console.log("asdfasdf",digestData.status)
      const fetchBy = [
        {
          table: Tables.Attendance,
          status: AttendanceStatus.Reject,
          memberIds: digestData.absents,
        },
        {
          table: Tables.Attendance,
          status: AttendanceStatus.Approve,
          memberIds: digestData.presents,
        },
        {
          table: Tables.Leaves,
          status: AttendanceStatus.Approve,
          memberIds: digestData.leaves,
        },
      ];

      const results = await Promise.all(
        fetchBy.map((item) =>
          fetchTableData({
            table: item.table,
            status: item.status,
            membersId: item.memberIds,
          })
        )
      );

      const [absents, presents, leaves] = results;

      return {
        id: digestData.id,
        created_date: digestData.created_date,
        status: digestData.status,
        absents: absents,
        presents: presents,
        leaves: leaves,
      };
    } else {
      const fetchBy = [
        {
          table: Tables.Attendance,
          status: AttendanceStatus.Pending,
        },
        {
          table: Tables.Leaves,
          status: AttendanceStatus.Pending,
        },
      ];

      const results = await Promise.all(
        fetchBy.map((item) =>
          fetchTableData({
            table: item.table,
            status: item.status,
          })
        )
      );

      const [attendances, leaves] = results;
      const pendingDailyDigest = [...attendances, ...leaves];

      return {
        id: digestData.id,
        created_date: digestData.created_date,
        status: digestData.status,
        pending: pendingDailyDigest || [],
      };
    }
  } catch (error) {
    console.error("Error processing digest data:", error);
    return null;
  }
};