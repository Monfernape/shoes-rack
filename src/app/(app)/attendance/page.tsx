import React from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = async () => {
  const attendance = await getAttendance();
  return (
    <PageLayout>
      <AttendanceList attendance={attendance} />
    </PageLayout>
  );
};

export default Page;
