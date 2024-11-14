import React, { useMemo, useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { LeaveRequestsTypes, LeavesRequestStatus } from "@/types";
import { MemberRole } from "@/constant/constant";
import { LeaveRequestDetails } from "../modal/LeaveRequestDetails";

const loggedUser = {
  name: "John Smith",
  role: "member",
};

interface Props {
  leaveRequestDetails: LeaveRequestsTypes;
}

const LeaveTableActionRender = ({ leaveRequestDetails }: Props) => {
  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false);

  const handleViewDetails = () => {
    setIsOpenViewModal(!isOpenViewModal);
  };

  const handleEditInfo = () => {
    console.log("Editing info...");
  };

  const handleDeleteRequest = () => {
    console.log("Deleting request...");
  };

  const handleApprovedRequest = () => {
    console.log("Approved Request...");
  };

  const handleRejectedRequest = () => {
    console.log("Rejected Request...");
  };

  const baseActions = useMemo(
    () => [
      {
        title: "Edit",
        id: 2,
        onClick: handleEditInfo,
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: handleDeleteRequest,
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
        onClick: handleApprovedRequest,
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Reject",
        id: 4,
        onClick: handleRejectedRequest,
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const actionMenu = useMemo(() => {
    switch (loggedUser.role) {
      case MemberRole.Member:
        return leaveRequestDetails.status === LeavesRequestStatus.Pending
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...viewInfo, ...statusActions];

      default:
        return [];
    }
  }, [leaveRequestDetails.status]);

  return (
    <>
      <ActionsMenu actions={actionMenu} />
      <LeaveRequestDetails
        isOpenViewModal={isOpenViewModal}
        setIsOpenViewModal={setIsOpenViewModal}
        leaveRequestDetails={leaveRequestDetails}
      />
    </>
  );
};

export default LeaveTableActionRender;