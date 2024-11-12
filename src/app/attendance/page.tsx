import React from "react";
import { PageLayout } from "../layout/PageLayout";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendance } from "./actions/getAttendance";


const Page = async () => {
  const attendance = await getAttendance();
 
  return (
    <PageLayout>
      <AttendanceList attendance={attendance} />
    </PageLayout>
  );
};

export default Page;
