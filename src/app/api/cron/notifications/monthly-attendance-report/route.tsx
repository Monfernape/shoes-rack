"use server";
import * as cron from "node-cron";
import ReactPDF from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MonthlyAttendancePdf } from "@/app/(app)/attendance-report/components/MonthlyReportPdf";
import { getAttendanceReport } from "@/app/(app)/attendance-report/actions/attendance-report";

export async function GET() {
  try {
    cron.schedule("0 6 1 * *", async () => {

    const bucketName = "attendance";

    const supabase = await getSupabaseClient();

    const attendanceReport = await getAttendanceReport();

    const fileName = `${new Date().toISOString().slice(0, 10)}.pdf`;

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
      <MonthlyAttendancePdf data={attendanceReport} />
    );
    const pdfBuffer = await streamToBuffer(stream);

    await supabase.storage
      .from(bucketName)
      .upload(fileName, pdfBuffer, { upsert: true });
    });

    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
