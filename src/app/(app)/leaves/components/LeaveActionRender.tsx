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
import {
  EventType,
  LeaveRequestsTypes,
  LeavesRequestStatus,
  UserDetails,
} from "@/types";
import { LeaveRequestStatus, MemberRole } from "@/constant/constant";
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
  const [menuAction, setMenuAction] = useState("");

  const { id: leaveRequestId, status: leaveStatus } = leaveRequestDetails;

  const handleViewDetails = (e: EventType) => {
    e.stopPropagation();
    router.push(`${Routes.LeaveRequestDetails}/${leaveRequestId}`);
  };

  const handleEditInfo = (e: EventType, requestId: number) => {
    e.stopPropagation();
    router.push(`${Routes.EditLeaveRequest}/${requestId}`);
  };

  const handleDeleteRequest = async (
    e: EventType,
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
    setIsOpenModal(false);
  };

  const handleLeaveStatus = async (
    e : EventType,
    requestId: number,
    status: LeavesRequestStatus
  ) => {
    e.stopPropagation();
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

  const handleModalAction = (e: EventType) => {
    e.stopPropagation();
    switch (menuAction) {
      case "Approve":
        return handleLeaveStatus( e,leaveRequestId, LeavesRequestStatus.Approved);
      case "Reject":
        return handleLeaveStatus(e ,leaveRequestId, LeavesRequestStatus.Reject);
      case "Delete":
        return handleDeleteRequest(e, leaveRequestId);
      default:
        return () => {};
    }
  };

  const baseActions = useMemo(
    () => [
      {
        title: "Edit",
        id: 2,
        onClick: (e: EventType) => {
          handleEditInfo(e, leaveRequestId);
        },
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: (e: EventType) => {
          e.stopPropagation();
          setMenuAction("Delete");
          setIsOpenModal(true);
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
        onClick: (e: EventType) => {
          e.stopPropagation();
          setMenuAction("Approve");
          setIsOpenModal(true);
        },
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
        onClick: (e: EventType) => {
          e.stopPropagation();
          setMenuAction("Reject");
          setIsOpenModal(true);
        },
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
        description={`Are you sure you want to perform this action?`}
        buttonText={menuAction}
        setIsModalOpen={setIsOpenModal}
        isModalOpen={isOpenModal}
        onHandleConfirm={handleModalAction}
      />
    </>
  );
};

export default LeaveTableActionRender;
