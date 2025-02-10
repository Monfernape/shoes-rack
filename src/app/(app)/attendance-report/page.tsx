import React from "react";
import { PageLayout } from "../../layout/PageLayout";
import { getAttendanceReport } from "./actions/attendance-report";
import { AttendanceReportList } from "./components/AttendanceReportList";
import PdfViewer from "./components/PdfViewer";

const Page = async () => {
  const attendanceReport = await getAttendanceReport();

  return (
    <PageLayout>
      <AttendanceReportList data={attendanceReport} />
      <PdfViewer fileUrl={"https://pdfobject.com/pdf/sample.pdf"} />
    </PageLayout>
  );
};

export default Page;
