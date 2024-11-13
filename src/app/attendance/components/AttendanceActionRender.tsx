import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Trash2, Edit, XCircle, CheckSquare } from "lucide-react";
import { MemberRole } from "@/lib/constants";

interface MemberInfo {
  id: number;
  name: string;
  phone: string;
  role: string;
  status: string;
}
interface AttendanceData {
  status: string;
}

type Props = {
  memberInfo: MemberInfo;
  attendanceData: AttendanceData;
};

const AttendanceActionRender = ({ memberInfo, attendanceData }: Props) => {
  const { role, status } = memberInfo;

  const handleEditInfo = () => {
    console.log("Editing info...");
  };

  const handleDeleteMember = () => {
    console.log("Deleting member...");
  };

  const handleApproveRequest = () => {
    console.log("Request Status");
  };
  const handleRejectRequest = () => {
    console.log("Request Status");
  };

  const baseActions = [
    {
      title: "Edit Info",
      id: 2,
      onClick: handleEditInfo,
      icon: <Edit size={16} />,
    },
    {
      title: "Delete Member",
      id: 3,
      onClick: handleDeleteMember,
      icon: <Trash2 size={16} />,
    },
  ];
  const ApprovelRequest = [
    {
      title: "Approve",
      id: 2,
      onClick: handleApproveRequest,
      icon: <CheckSquare size={16} />,
    },
    {
      title: "Reject",
      id: 3,
      onClick: handleRejectRequest,
      icon: <XCircle size={16} />,
    },
  ];

  const actionMenu = React.useMemo(() => {
    switch (role) {
      case MemberRole.Member:
        return attendanceData.status === "pending" ? [...baseActions] : [];
      case MemberRole.ShiftIncharge:
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...ApprovelRequest];
      default:
        return [];
    }
  }, [role, status])

  return <ActionsMenu actions={actionMenu} />;
};

export default AttendanceActionRender;
