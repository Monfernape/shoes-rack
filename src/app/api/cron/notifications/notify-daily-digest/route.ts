import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { NextResponse } from "next/server";
import {
  DigestStatus,
  MemberRole,
  NotificationType,
  Shift,
  UserStatus,
} from "@/constant/constant";

export async function POST() {
  try {
    const supabase = await getSupabaseClient();
    const digest = {
      status: DigestStatus.Pending,
      absents: [],
      presents: [],
      leaves: [],
    };
    // Insert All digest into Digest Table
    const { error: digestError } = await supabase.from(Tables.Digest).insert([
      { ...digest, shift: Shift.ShiftA },
      { ...digest, shift: Shift.ShiftB },
      { ...digest, shift: Shift.ShiftC },
      { ...digest, shift: Shift.ShiftD },
    ]);

    if (digestError) {
      return digestError;
    }
    // Get All Active Shift Incharges
    const { data: shiftIncharges, error: memberError } = await supabase
      .from(Tables.Members)
      .select(`id,shift,role`)
      .eq("status", UserStatus.Active)
      .eq("role", MemberRole.ShiftIncharge);

    if (memberError) {
      return memberError;
    }

    const attendanceNotifcations = {
      title: "Review Attendance",
      is_read: false,
      system_generated: true,
      description: "Please Review Attendances",
      type: NotificationType.Digest,
    };

    const shiftNotifications = shiftIncharges?.map((shiftIncharge) => {
      return {
        ...attendanceNotifcations,
        member_id: shiftIncharge.id,
      };
    });
    // insert shift incharge notifications to Notification Table
    const { error: notificationError } = await supabase
      .from(Tables.Notification)
      .insert(shiftNotifications);

    if (notificationError) {
      throw notificationError;
    }
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
