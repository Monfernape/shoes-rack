import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { Breadcrumbs } from "@/types";
import { Routes } from "@/lib/routes";

import { AttendanceHeader } from "../../components/AttendanceHeader";
import { AttendanceDetails } from "../../components/AttendanceDetails";

import { getAttendanceById } from "../../actions/getAttendanceById";

type Parameters = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Parameters) => {
  const { id } = params;
  const attendance = await getAttendanceById(Number(id));
  const breadcrumbs: Breadcrumbs[] = [
    { href: Routes.Attendance, label: "Attendance" },
    { href: `${Routes.AttendanceDetails}/${id}`, label: attendance.name },
  ];
  return (
    <div>
      <AttendanceHeader breadcrumbs={breadcrumbs} />
      <FormWrapper>
        <AttendanceDetails attendance={attendance} />
      </FormWrapper>
    </div>
  );
};

export default Page;
