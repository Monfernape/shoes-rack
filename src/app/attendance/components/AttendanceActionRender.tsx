import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Trash2 as TrashIcon,
  Edit as EditIcon,
  XCircle as XCricleIcon,
  CheckSquare as CheckSquareIcon,
} from "lucide-react";
import { AttendanceStatus, MemberRole } from "@/constant/constant";
import { useRouter } from "next/navigation";

interface MemberInfo {
  shift: string;
  role: string;
  status: string;
  id: number;
}
interface AttendanceData {
  shift: string;
  status: string;
  id: number;
}

type Props = {
  loginUser: MemberInfo;
  attendanceData: AttendanceData;
};

const AttendanceActionRender = ({ loginUser, attendanceData }: Props) => {
  const router = useRouter();

  const handleEditInfo = (id: number) => {
    router.push(`/attendance/edit/${id}`);
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
      onClick: () => handleEditInfo(attendanceData.id),
      icon: <EditIcon size={16} />,
    },
    {
      title: "Delete Member",
      id: 3,
      onClick: handleDeleteMember,
      icon: <TrashIcon size={16} className="text-red-500" />,
      className: "text-red-500",
    },
  ];
  const ApprovelRequest = [
    {
      title: "Approve",
      id: 2,
      onClick: handleApproveRequest,
      icon: <CheckSquareIcon size={16} />,
    },
    {
      title: "Reject",
      id: 3,
      onClick: handleRejectRequest,
      icon: <XCricleIcon size={16} className="text-red-500" />,
      className: "text-red-500",
    },
  ];

  const actionMenu = React.useMemo(() => {
    switch (loginUser.role) {
      case MemberRole.Member:
        return attendanceData.status === AttendanceStatus.Pending
          ? [...baseActions]
          : [];
      case MemberRole.ShiftIncharge:
        return attendanceData.shift === loginUser.shift
          ? [...ApprovelRequest]
          : [];
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...ApprovelRequest];
      default:
        return [];
    }
  }, [loginUser.role, attendanceData.status]);

  return <ActionsMenu actions={actionMenu} />;
};

export default AttendanceActionRender;
