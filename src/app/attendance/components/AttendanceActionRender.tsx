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
import { Routes } from "@/lib/routes";
import { deleteAttendance } from "../actions/deleteAttendance";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useGetLoggedinUser";

interface Attendance {
  shift: string;
  status: string;
  id: number;
}

type Props = {
  attendance: Attendance;
};

const AttendanceActionRender = ({ attendance }: Props) => {
  const router = useRouter();
  const loginUser = useUser();

  const handleEditInfo = (id: number) => {
    router.push(`${Routes.EditAttendance}/${id}`);
  };

  const handleDeleteMember = async (id: number) => {
    deleteAttendance(id).then(() => {
      toast({
        title: "Attendance Deleted ",
        description: "Attendance deleted successfully",
      });
      router.refresh();
    });
  };

  const handleApproveRequest = () => {
    return;
  };
  const handleRejectRequest = () => {
    return;
  };

  const baseActions = [
    {
      title: "Edit Info",
      id: 2,
      onClick: () => handleEditInfo(attendance.id),
      icon: <EditIcon size={16} />,
    },
    {
      title: "Delete Member",
      id: 3,
      onClick: () => handleDeleteMember(attendance.id),
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
    switch (loginUser?.role) {
      case MemberRole.Member:
        return attendance.status === AttendanceStatus.Pending
          ? [...baseActions]
          : [];
      case MemberRole.ShiftIncharge:
        return attendance.shift === loginUser?.shift
          ? [...ApprovelRequest]
          : [];
      case MemberRole.Incharge:
        return [...ApprovelRequest];
      default:
        return [];
    }
  }, [loginUser?.role, attendance.status]);

  return <ActionsMenu actions={actionMenu} />;
};

export default AttendanceActionRender;
