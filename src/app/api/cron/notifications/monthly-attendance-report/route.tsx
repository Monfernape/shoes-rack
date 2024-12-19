"use server";
import * as cron from "node-cron";
import ReactPDF from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MonthlyAttendancePdf } from "./MonthlyReportPdf";
import { getAttendanceReport } from "@/app/(app)/attendance-report/actions/attendance-report";

const EVERY_MONTH_FIRST_DAY_AT_6AM = "0 6 1 * *";

export async function GET() {

  try {
    cron.schedule(EVERY_MONTH_FIRST_DAY_AT_6AM, async () => {
      const bucketName = "attendance";

      const supabase = await getSupabaseClient();

      const attendanceReport = await getAttendanceReport();
      const date = new Date();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const fileName = `attendance_report_${month}_${year}.pdf`;

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

      await supabase.storage.from(bucketName).upload(fileName, pdfBuffer);
    });

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
