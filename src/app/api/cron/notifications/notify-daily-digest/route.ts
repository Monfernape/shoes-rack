import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { DigestStatus, Shift } from "@/constant/constant";

export async function POST() {
  try {
    const supabase = await getSupabaseClient();
    const digest = {
      status: DigestStatus.Pending,
      absents: [],
      presents: [],
      leaves: [],
    };
    const { error } = await supabase.from(Tables.Digest).insert([
      { ...digest, shift: Shift.ShiftA },
      { ...digest, shift: Shift.ShiftB },
      { ...digest, shift: Shift.ShiftC },
      { ...digest, shift: Shift.ShiftD },
    ]);

    if (error) {
      throw error;
    }
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
