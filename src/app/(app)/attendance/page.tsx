import React, { Suspense } from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = async () => {
  const attendance = await getAttendance();
  return (
    <PageLayout>
      <Suspense>
        <AttendanceList attendance={attendance} />
      </Suspense>
    </PageLayout>
  );
};

export default Page;
