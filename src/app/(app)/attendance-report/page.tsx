import React from "react";
import { PageLayout } from "../../layout/PageLayout";
import PdfViewer from "./components/PdfViewer";
import { getAttendanceReportPdf } from "./actions/get-attendance-report-pdf";
import DateFilter from "./components/DateFilter";
import { format, startOfMonth, subMonths } from "date-fns";
import { HeaderWrapper } from "@/common/HeaderWapper/HeaderWrapper";
import { Routes } from "@/lib/routes";

const Page = async ({ searchParams }: { searchParams: { date: string } }) => {
  const currentDate = startOfMonth(new Date());
  const lastMonth = format(subMonths(currentDate, 1), "yyyy-MM");
  const {
    data: { publicUrl },
  } = await getAttendanceReportPdf(searchParams.date || lastMonth);

  const breadcrumbs = [
    { href: Routes.AttendanceReport, label: "Attendance Report" },
  ];
  return (
    <>
      <HeaderWrapper breadcrumbs={breadcrumbs} />
      <PageLayout>
        <div className="flex justify-end mb-2">
          <DateFilter />
        </div>
        <div className="w-full justify-start md:justify-center overflow-x-auto overflow-y-hidden">
          <PdfViewer fileUrl={publicUrl} />
        </div>
      </PageLayout>
    </>
  );
};

export default Page;
