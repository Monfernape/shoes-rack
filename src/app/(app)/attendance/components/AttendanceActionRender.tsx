import React, { useMemo } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { AttendanceStatus, MemberRole } from "@/constant/constant";
import { toast } from "@/hooks/use-toast";
import { Routes } from "@/lib/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAttendanceStatus } from "../actions/update-attendance-status";
import { deleteAttendance } from "../actions/deleteAttendance";
import { Attendance, UserDetails } from "@/types";

export type AttendanceActionRenderProps = {
  attendance: Attendance;
  loginUser: UserDetails;
};

const AttendanceActionRender = ({
  attendance,
  loginUser,
}: AttendanceActionRenderProps) => {
  const { id } = attendance;
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery: string | null = searchParams.get("id");
  const { id: requestId } = attendance;
  const handleViewDetails = () => {
    router.push(`${Routes.AttendanceDetails}/${id}`);
  };

  const handleEditInfo = (requestId: number) => {
    router.push(`${Routes.EditAttendance}/${requestId}`);
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      await deleteAttendance(requestId);
      toast({
        title: "Success",
        description: "Request deleted successfully.",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };
  const handleAttendanceStatus = async (
    attendanceId: number,
    status: AttendanceStatus
  ) => {
    try {
      await updateAttendanceStatus({ attendanceId, attendanceStatus: status });
      router.push(
        loginUser?.role == MemberRole.ShiftIncharge
          ? Routes.Attendance
          : `${Routes.Attendance}?id=${searchQuery}`
      );
      toast({
        title: "Success",
        description: "Request updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };

  const baseActions = useMemo(
    () => [
      {
        title: "Edit",
        id: 2,
        onClick: () => {
          handleEditInfo(requestId);
        },
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: () => {
          handleDeleteRequest(requestId);
        },
        icon: <TrashIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const viewInfo = useMemo(
    () => [
      {
        title: "View Details",
        id: 1,
        onClick: handleViewDetails,
        icon: <InfoIcon size={16} />,
      },
    ],
    []
  );

  const statusActions = useMemo(
    () => [
      {
        title: "Approve",
        id: 4,
        onClick: () => {
          handleAttendanceStatus(requestId, AttendanceStatus.Approve);
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Reject",
        id: 4,
        onClick: () => {
          handleAttendanceStatus(requestId, AttendanceStatus.Reject);
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const shiftInchargeActionMenu = (function onShiftInchareMenu() {
    if (attendance.status === AttendanceStatus.Pending) {
      if (attendance.memberId === loginUser?.id) {
        return [...viewInfo, ...baseActions];
      }
      return [...viewInfo, ...baseActions, ...statusActions];
    } else if (attendance.status === AttendanceStatus.Approve) {
      if (attendance.memberId === loginUser?.id) {
        return [...viewInfo];
      }
      return [...viewInfo, ...statusActions];
    } else {
      if (attendance.memberId === loginUser?.id) {
        return [...viewInfo];
      }
      return [...viewInfo, ...statusActions];
    }
  })();

  const actionMenu = useMemo(() => {
    switch (loginUser?.role) {
      case MemberRole.Member:
        return attendance.status === AttendanceStatus.Pending
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
        return shiftInchargeActionMenu;
      case MemberRole.Incharge:
        return attendance.status === AttendanceStatus.Pending
          ? [...viewInfo, ...baseActions, ...statusActions]
          : [...viewInfo, ...statusActions];

      default:
        return [];
    }
  }, [attendance.status, loginUser]);
  return (
    <>
      <ActionsMenu actions={actionMenu} />
    </>
  );
};

export default AttendanceActionRender;
