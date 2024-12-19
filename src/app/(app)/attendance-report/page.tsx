import React from "react";
import { PageLayout } from "../../layout/PageLayout";
import { getAttendanceReport } from "./actions/attendance-report";
import { AttendanceReportList } from "./components/AttendanceReportList";

const Page = async () => {
  const attendanceReport = await getAttendanceReport();

  return (
    <PageLayout>
      <AttendanceReportList data={attendanceReport} />
    </PageLayout>
  );
};

export default Page;
