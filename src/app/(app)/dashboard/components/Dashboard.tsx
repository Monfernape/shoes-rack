"use client";
import React, { useMemo } from "react";
import { AttendanceDonutChart } from "./AttendanceDonutChart";
import moment from "moment";
import { User } from "@/types";
import { PageLayout } from "@/app/layout/PageLayout";
import FundPaymentCard from "./FundPaymentCard";
import LeaveRequestCard from "./LeaveRequestCard";
import AddMemberCard from "./AddMemberCard";
import { MemberRole } from "@/constant/constant";

export const Dashboard = ({ loggedUser  }: { loggedUser: User }) => {
  const currentDate = moment().format("dddd, MMMM DD, YYYY");
  const generateGreetings = useMemo(() => {
    const currentHour = moment().format("HH");

    if (currentHour >= "3" && currentHour < "12") {
      return "Good morning";
    } else if (currentHour >= "12" && currentHour < "15") {
      return "Good afternoon";
    } else if (currentHour >= "15" && currentHour < "20") {
      return "Good evening";
    } else if (currentHour >= "20" || currentHour < "3") {
      return "Good night";
    } else {
      return "Hello";
    }
  },[]);
  return (
    <PageLayout>
      <p className="text-xs py-4 text-foreground"> {currentDate} </p>
      <p className="text-sm font-medium pb-4">{`${generateGreetings}, ${
        loggedUser.name
      } 👋`}</p>
      <AttendanceDonutChart />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loggedUser.role !== MemberRole.Member && <AddMemberCard />}
        <FundPaymentCard />
        {/* <MissedAttendanceCard /> */}
        <LeaveRequestCard />
      </div>
    </PageLayout>
  );
};
