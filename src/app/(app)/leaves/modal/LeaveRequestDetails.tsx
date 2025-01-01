import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { LeaveRequestsTypes } from "@/types";
import { Separator } from "@/components/ui/separator";
import {
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
} from "lucide-react";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface Props {
  isOpenViewModal: boolean;
  setIsOpenViewModal: (state: boolean) => void;
  leaveRequestDetails: LeaveRequest;
}

export const LeaveRequestDetails = ({
  isOpenViewModal,
  setIsOpenViewModal,
  leaveRequestDetails,
}: Props) => {
  return (
    <Dialog open={isOpenViewModal} onOpenChange={setIsOpenViewModal}>
      <DialogContent className="w-80 md:w-full rounded">
        <DialogHeader>
          <DialogTitle className="text-table-thead text-left text-sm">
            Leave Request Details
          </DialogTitle>
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
                {leaveRequestDetails.requestedBy}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
