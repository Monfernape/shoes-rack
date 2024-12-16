"use server";
import React from "react";
import { NextResponse } from "next/server";
import ReactPDF from "@react-pdf/renderer";
import { MyDocument } from "../../(app)/attendance-report/components/generatePdf";
import path from "path";
import { getAttendanceReport } from "@/app/(app)/attendance-report/actions/attendance-report";

export async function handler(req) {
  const attendanceReport = await getAttendanceReport();
  const fileName = `${new Date().toISOString().slice(0, 10)}.pdf`;
  if (req.method === "GET") {
    try {
      const folderPath = path.join("Public/PDFs", "monthlyReport");
      const filePath = path.join(folderPath, fileName);

      await ReactPDF.renderToFile(
        <MyDocument data={attendanceReport} />,
        filePath
      );

      return NextResponse.json({
        message: "PDF generated successfully!",
        filePath,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      return NextResponse.json(
        { error: "Failed to generate PDF" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}

export { handler as GET, handler as POST };
