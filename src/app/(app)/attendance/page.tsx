import React, { Suspense } from "react";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";
import { PageLayout } from "@/app/layout/PageLayout";

const Page = async () => {
  const attendance = await getAttendance();
  return (
    <Suspense>
      <PageLayout>
        <AttendanceList attendance={attendance} />
      </PageLayout>
    </Suspense>
  );
};

export default Page;
