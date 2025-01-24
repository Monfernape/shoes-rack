import React from "react";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { LeaveRequestsTypes } from "@/types";
import { Separator } from "@/components/ui/separator";
import {
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CardWrapper from "@/common/CardWrapper";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface Props {
  leaveRequestDetails: LeaveRequest;
  leaveRequestedBy: string
}

export const LeaveRequestDetails = ({
  leaveRequestDetails,
  leaveRequestedBy,
}: Props) => {
  return (
    <CardWrapper>
   <Card className="w-full max-w-xl">
      <CardContent className="text-left space-y-6 mt-6">
          <div className="flex justify-between items-center py-4">
            {leaveRequestDetails.status && (
              <StatusBadge status={leaveRequestDetails.status} />
            )}
            <span className="text-xs text-left text-gray-700">
              {leaveRequestDetails.leaveType}
            </span>
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <UserIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead text-left">Requested By</span>
              <span className="text-xs text-gray-700 text-left">
                {leaveRequestedBy}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <CalendarIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead text-left">Leave Period</span>
              <span className="text-xs text-gray-700">
                {leaveRequestDetails.startDate}{" "}
                <span className="mx-2 font-semibold">to</span>{" "}
                {leaveRequestDetails.endDate}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <FileTextIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead text-left">Reason</span>
              <span className="text-xs text-gray-700">
                {leaveRequestDetails.reason}
              </span>
            </div>
          </div>
      </CardContent>
    </Card>
    </CardWrapper>
   
  );
};
