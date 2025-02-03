import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { DigestStatus, Shift } from "@/constant/constant";

export async function GET(req: NextRequest) {
  try {
    
    const shift = req?.nextUrl?.searchParams.get("shift");
    const supabase = await getSupabaseClient();
    const query = await supabase.from(Tables.Digest);

    const handleShift = async (shift: string | null) => {
      switch (shift) {
        case "A":
          await query.insert({
            status: DigestStatus.Pending,
            shift: Shift.ShiftA,
            absents: [],
            presents: [],
            leaves: [],
          });
          break;
        case "B":
          await query.insert({
            status: DigestStatus.Pending,
            shift: Shift.ShiftB,
            absents: [],
            presents: [],
            leaves: [],
          });
          break;
        case "C":
          await query.insert({
            status: DigestStatus.Pending,
            shift: Shift.ShiftC,
            absents: [],
            presents: [],
            leaves: [],
          });
          break;
        case "D":
          await query.insert({
            status: DigestStatus.Pending,
            shift: Shift.ShiftD,
            absents: [],
            presents: [],
            leaves: [],
          });
          break;
        default:
          return null;
      }
    };
    handleShift(shift);
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
