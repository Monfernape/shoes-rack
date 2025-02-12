"use server";
import ReactPDF from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MonthlyAttendancePdf } from "./MonthlyReportPdf";
import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";
import { getMonthlyDigest } from "@/app/(app)/digest/actions/get-monthly-digest";
import { format, startOfMonth, subMonths } from "date-fns";

export async function GET() {
  try {
    const bucketName = "attendance";
    const currentDate = startOfMonth(new Date());
    const lastMonth = format(subMonths(currentDate, 1), "MMMM-yyyy");
    const supabase = await getSupabaseClient();

    const attendanceReport = await getMonthlyDigest();
    const fileName = `attendance-report-${lastMonth}.pdf`;
    const streamToBuffer = async (
      stream: NodeJS.ReadableStream
    ): Promise<Buffer> => {
      return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream
          .on("data", (chunk) => chunks.push(chunk))
          .on("end", () => resolve(Buffer.concat(chunks)))
          .on("error", reject);
      });
    };

    // eslint-disable-next-line react/react-in-jsx-scope
    const stream = await ReactPDF.renderToStream(
      // eslint-disable-next-line react/react-in-jsx-scope
      <MonthlyAttendancePdf attendanceReport={attendanceReport} />
    );

    const pdfBuffer = await streamToBuffer(stream);
    await supabase.storage
      .from(bucketName)
      .upload(fileName, pdfBuffer, { upsert: true });

    const { data: members, error: membersError } = await supabase
      .from(Tables.Members)
      .select("*")
      .neq("status", UserStatus.Deactivated)
      .neq("status", UserStatus.Inactive);

    if (membersError) {
      return NextResponse.json({ error: membersError.message }, { status: 500 });
    }

    const memberToNotify = members.map((member) => ({
      title: "Monthly report generated",
      system_generated: true,
      description: "Please check the monthly attendance report",
      member_id: member.id,
      is_read: false,
    }));

    const { error: insertionError } = await supabase
      .from(Tables.Notification)
      .insert([...memberToNotify]);

    if (insertionError) {
      return NextResponse.json({ error: insertionError.message }, { status: 500 });
    }

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
