import { UserStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import * as cron from "node-cron";

const EVERY_MONTH_OF_FIRST_DAY_AT_MIDNIGHT = "0 0 1 * *";

export async function GET() {
  try {
    cron.schedule(EVERY_MONTH_OF_FIRST_DAY_AT_MIDNIGHT, async () => {
      const supabase = await getSupabaseClient();

      // Fetch members who are not deactivated or inactive
      const { data: members, error: membersError } = await supabase
        .from(Tables.Members)
        .select("*")
        .neq("status", UserStatus.Deactivated)
        .neq("status", UserStatus.Inactive);

      if (membersError) {
        return NextResponse.json(
          { error: membersError.message },
          { status: 500 }
        );
      }

      if (!members || members.length === 0) {
        return;
      }

      const fundsList = members.map((member) => ({
        member_id: member.id.toString(),
        amount: "0",
      }));

      if (fundsList.length === 0) {
        return;
      }

      const { error: insertError } = await supabase
        .from(Tables.Funds)
        .insert(fundsList);

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
    });

    return NextResponse.json({
      data: "Cron job scheduled successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
