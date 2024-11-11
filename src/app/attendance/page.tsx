import React from "react";
import { PageLayout } from "../layout/PageLayout";
import { AttendanceList } from "./components/AttendanceList";
import { getAttendace } from "./actions/getAttendance";
import { getMembers } from "../members/actions/getMembers";

const Page = async () => {
  const attendance = await getAttendace();
  const members = await getMembers();
  return (
    <>
      <PageLayout>
        <AttendanceList attendance={attendance} members={members} />
      </PageLayout>
    </>
  );
};

export default Page;
