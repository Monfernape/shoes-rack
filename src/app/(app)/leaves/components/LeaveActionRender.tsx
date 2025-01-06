"use client";

import React, { useMemo, useState } from "react";
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
import { ConfirmationModal } from "@/common/ConfirmationModal/ConfirmationModal";

interface LeaveRequest extends LeaveRequestsTypes {
  requestedBy: string;
}
interface Props {
  leaveRequestDetails: LeaveRequest;
  loginUser: UserDetails;
}

const LeaveTableActionRender = ({ leaveRequestDetails, loginUser }: Props) => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { id: requestId, status: leaveStatus } = leaveRequestDetails;

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`${Routes.LeaveRequestDetails}/${requestId}`);
  };

  const handleEditInfo = (e: React.MouseEvent, requestId: number) => {
    e.stopPropagation();
    router.push(`${Routes.EditLeaveRequest}/${requestId}`);
  };

  const handleDeleteRequest = async (
    e: React.MouseEvent,
    requestId: number
  ) => {
    e.stopPropagation();
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

  const handleLeaveStatus = async (
    e: React.MouseEvent,
    requestId: number,
    status: LeavesRequestStatus
  ) => {
    // e.stopPropagation();
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
    setIsOpenModal(false);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  const baseActions = useMemo(
    () => [
      {
        title: "Edit",
        id: 2,
        onClick: (e: React.MouseEvent) => {
          handleEditInfo(e, requestId);
        },
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: (e: React.MouseEvent) => {
          handleDeleteRequest(e, requestId);
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

  const approveAction = useMemo(
    () => [
      {
        title: "Approve",
        id: 4,
        onClick: handleOpenModal,
        icon: <CheckCircleIcon size={16} />,
      },
    ],
    []
  );

  const rejectAction = useMemo(
    () => [
      {
        title: "Reject",
        id: 4,
        onClick: handleOpenModal,
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const statusActions = useMemo(() => {
    if (leaveStatus === LeavesRequestStatus.Approved) {
      return rejectAction;
    } else if (leaveStatus === LeavesRequestStatus.Reject) {
      return approveAction;
    } else {
      return [...approveAction, ...rejectAction];
    }
  }, []);

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
      <ConfirmationModal
        title={"Leave Status"}
        description={`Are you sure the leave has been ${
          leaveStatus === LeavesRequestStatus.Approved ? "rejected" : "approved"
        }?`}
        buttonText={
          leaveStatus === LeavesRequestStatus.Approved ? "Reject" : "Approve"
        }
        setIsModalOpen={setIsOpenModal}
        isModalOpen={isOpenModal}
        onHandleConfirm={(e: React.MouseEvent) =>
          handleLeaveStatus(
            e,
            requestId,
            leaveStatus === LeavesRequestStatus.Approved
              ? LeavesRequestStatus.Reject
              : LeavesRequestStatus.Approved
          )
        }
      />
    </>
  );
};

export default LeaveTableActionRender;
