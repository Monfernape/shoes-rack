import React from "react";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { MyDocument } from "./generatePdf";
import { getAttendanceReport } from "../actions/attendance-report";
import ReactPDF from "@react-pdf/renderer";

// Upload file using standard upload
export const uploadFile = async () => {
  const supabase = await getSupabaseClient();
  const attendanceReport = await getAttendanceReport();

  const fileName = `${Date.now()}_${new Date().toISOString().slice(0, 10)}.pdf`;
  const bucketName = "attendance";

  // eslint-disable-next-line no-async-promise-executor
  const pdfBuffer = await new Promise<Buffer>(async (resolve, reject) => {
    const chunks: Buffer[] = [];
    (await ReactPDF.renderToStream(<MyDocument data={attendanceReport} />))
      .on("data", (chunk: Buffer) => chunks.push(chunk))
      .on("end", () => resolve(Buffer.concat(chunks)))
      .on("error", reject);
  });

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, pdfBuffer, { upsert: true });

  if (error) {
    return error;
  } else {
    return data;
  }
};
