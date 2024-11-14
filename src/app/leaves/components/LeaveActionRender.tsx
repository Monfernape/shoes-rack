import React, { useMemo, useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { MemberRole } from "@/lib/constants";
import {
  LeaveRequestsTypes,
  LeavesRequestStatus,
  RequestActionTitles,
} from "@/types";
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

  const baseActions = [
    {
      title: RequestActionTitles.Edit,
      id: 2,
      onClick: handleEditInfo,
      icon: <EditIcon size={16} />,
    },
    {
      title: RequestActionTitles.Delete,
      id: 3,
      onClick: handleDeleteRequest,
      icon: <TrashIcon size={16} className="stroke-status-inactive" />,
    },
  ];

  const viewInfo = [
    {
      title: RequestActionTitles.ViewDetails,
      id: 1,
      onClick: handleViewDetails,
      icon: <InfoIcon size={16} />,
    },
  ];

  const statusActions = [
    {
      title: RequestActionTitles.Approve,
      id: 4,
      onClick: handleApprovedRequest,
      icon: <CheckCircleIcon size={16} />,
    },
    {
      title: RequestActionTitles.Reject,
      id: 4,
      onClick: handleRejectedRequest,
      icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
    },
  ];

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
