import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { Separator } from "@/components/ui/separator";
import {
  FileText as FileTextIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
} from "lucide-react";
import { Attendance } from "@/types";

interface Props {
  isOpenViewModal: boolean;
  setIsOpenViewModal: (state: boolean) => void;
  attendanceDetails: Attendance;
}

export const AttendanceDetails = ({
  isOpenViewModal,
  setIsOpenViewModal,
  attendanceDetails,
}: Props) => {
  return (
    <Dialog open={isOpenViewModal} onOpenChange={setIsOpenViewModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-table-thead text-sm">
            Attendance report
          </DialogTitle>
          <div className="flex justify-between items-center py-4">
            {attendanceDetails.status && (
              <StatusBadge status={attendanceDetails.status} />
            )}
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <UserIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead">Attendance By</span>
              <span className="text-xs text-gray-700">
                {attendanceDetails.name}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <CalendarIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead">Attendance time</span>
              <span className="text-xs text-gray-700">
                {attendanceDetails.startTime}
                <span className="mx-2 font-semibold">to</span>{" "}
                {attendanceDetails.endTime}
              </span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-start items-center gap-4 py-4">
            <FileTextIcon className="self-start h-5 w-5 text-table-thead" />
            <div className="flex flex-col gap-2">
              <span className="text-sm text-table-thead">Shift</span>
              <span className="text-xs text-gray-700">
                {attendanceDetails.shift}
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
