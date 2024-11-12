import React, { useMemo } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { MemberRole } from "@/lib/constants";

const loggedUser = {
  name: "John Smith",
  role: "member",
};

const LeaveTableActionRender = ({
  leaveRequestStatus,
}: {
  leaveRequestStatus: string | undefined;
}) => {
  const handleViewDetails = () => {
    console.log("Viewing details...");
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
      title: "Edit",
      id: 2,
      onClick: handleEditInfo,
      icon: <EditIcon size={16} />,
    },
    {
      title: "Delete",
      id: 3,
      onClick: handleDeleteRequest,
      icon: <TrashIcon size={16} />,
    },
  ];

  const viewInfo = [
    {
      title: "View Details",
      id: 1,
      onClick: handleViewDetails,
      icon: <InfoIcon size={16} />,
    },
  ];

  const StatusActions = [
    {
      title: "Approved",
      id: 4,
      onClick: handleApprovedRequest,
      icon: <CheckCircleIcon size={16} />,
    },
    {
      title: "Reject",
      id: 4,
      onClick: handleRejectedRequest,
      icon: <AlertCircleIcon size={16} />,
    },
  ];

  const actionMenu = useMemo(() => {
    switch (loggedUser.role) {
      case MemberRole.Member:
        return leaveRequestStatus === "pending"
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...viewInfo, ...StatusActions];

      default:
        return [];
    }
  }, [leaveRequestStatus]);

  return <ActionsMenu actions={actionMenu} />;
};

export default LeaveTableActionRender;
