import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { MemberDetails } from "@/types";
import CardWrapper from "@/common/CardWrapper";

export const AttendanceDetails = ({
  attendance,
}: {
  attendance: MemberDetails;
}) => {
  return (
    <CardWrapper>
      <Card className="w-full max-w-xl">
        <CardContent className="text-left space-y-6 mt-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar userName={attendance.name} />
              <h2 data-testid="user-name" className="text-base text-gray-800">
                {attendance.name}
              </h2>
            </div>
            <div className=" ml-[54px]">
              <StatusBadge status={attendance.status} />
            </div>
          </div>
          <div className="text-gray-700">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <span> Attendance Information</span>
            </h3>
            <div className="pl-12 space-y-2 ">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  StartTime:
                </span>{" "}
                {attendance.startTime}
              </p>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium  mr-1  text-muted-foreground">
                  EndTime:
                </span>{" "}
                {attendance.endTime}
              </p>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  Shift:
                </span>{" "}
                {attendance.shift}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};
