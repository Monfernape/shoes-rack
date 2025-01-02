"use client";

import React, { useMemo } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { LeaveRequestsTypes, LeavesRequestStatus, UserDetails } from "@/types";
import { MemberRole } from "@/constant/constant";
import { deleteLeaveRequest } from "../actions/delete-leave-request";
import { toast } from "@/hooks/use-toast";
import { processLeaveRequest } from "../actions/process-leave-request";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface Props {
  leaveRequestDetails: LeaveRequest;
  loginUser: UserDetails;
}

const LeaveTableActionRender = ({ leaveRequestDetails, loginUser }: Props) => {
  const router = useRouter();

  const { id: requestId } = leaveRequestDetails;
  const handleViewDetails = () => {
    router.push(`${Routes.LeaveRequestDetails}/${requestId}`);
  };

  const handleEditInfo = (requestId: number) => {
    router.push(`${Routes.EditLeaveRequest}/${requestId}`);
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      await deleteLeaveRequest(requestId);
      toast({
        title: "Success",
        description: "Request deleted successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description:
            "There was an issue deleting the request. Please try again.",
        });
      }
    }
  };

  const handleLeaveRequestStatus = async (
    requestId: number,
    status: LeavesRequestStatus
  ) => {
    try {
      await processLeaveRequest({ requestId, requestStatus: status });
      toast({
        title: "Success",
        description: "Request updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description:
            "There was an issue updating the request. Please try again.",
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
          handleLeaveRequestStatus(requestId, LeavesRequestStatus.Approved);
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Reject",
        id: 4,
        onClick: () => {
          handleLeaveRequestStatus(requestId, LeavesRequestStatus.Reject);
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const shiftInchargeActionMenu = (function onShiftInchareMenu() {
    if (leaveRequestDetails.status === LeavesRequestStatus.Pending) {
      if (leaveRequestDetails.memberId === loginUser?.id) {
        return [...viewInfo, ...baseActions];
      }
      return [...viewInfo, ...baseActions, ...statusActions];
    } else if (leaveRequestDetails.status === LeavesRequestStatus.Approved) {
      if (leaveRequestDetails.memberId === loginUser?.id) {
        return [...viewInfo];
      }
      return [...viewInfo, ...statusActions];
    } else {
      if (leaveRequestDetails.memberId === loginUser?.id) {
        return [...viewInfo];
      }
      return [...viewInfo, ...statusActions];
    }
  })();

  const actionMenu = useMemo(() => {
    switch (loginUser?.role) {
      case MemberRole.Member:
        return leaveRequestDetails.status === LeavesRequestStatus.Pending
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
        return shiftInchargeActionMenu;
      case MemberRole.Incharge:
        return leaveRequestDetails.status === LeavesRequestStatus.Pending
          ? [...viewInfo, ...baseActions, ...statusActions]
          : [...viewInfo, ...statusActions];
      default:
        return [];
    }
  }, [leaveRequestDetails.status, loginUser]);

  return (
    <>
      <ActionsMenu actions={actionMenu} />
    </>
  );
};

export default LeaveTableActionRender;
