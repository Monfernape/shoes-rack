import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Info, Trash2, Edit, Send } from "lucide-react";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { deleteMember } from "../actions/delete-member";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Member } from "@/types";
import { Attendance } from "@/app/attendance/components/AttendanceList";
import { Routes } from "@/lib/routes";
import { useUser } from "@/hooks/useGetLoggedinUser";

type Props = {
  memberInfo: Member | Attendance;
};

const MemberTableActionRender = ({ memberInfo }: Props) => {
  const { status, id, shift } = memberInfo;
  const loginUser = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const handleViewDetails = () => {
    return;
  };

  const handleEditInfo = () => {
    router.push(`${Routes.EditMember}/${id}`);
  };

  const handleDeleteMember = async () => {
    try {
      await deleteMember(id);
      toast({
        title: "Member deleted successfully",
      });
      return router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };

  const handleResendInvite = () => {
    return;
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

  const viewInfo = [
    {
      title: "View Details",
      id: 1,
      onClick: handleViewDetails,
      icon: <Info size={16} />,
    },
  ];

  const resendInvite =
    status === UserStatus.Inactive
      ? [
          {
            title: "Resend Invite",
            id: 4,
            onClick: handleResendInvite,
            icon: <Send size={16} />,
          },
        ]
      : [];

  const checkShiftMembers = (loginUserShift: string, shift: Shift) => {
    if (loginUserShift === shift) {
      if (status === UserStatus.Inactive) {
        return [...baseActions, ...viewInfo, ...resendInvite];
      }
      return [...baseActions, ...viewInfo];
    }
    return [...viewInfo];
  };
  const actionMenu = React.useMemo(() => {
    switch (loginUser?.role) {
      case MemberRole.Incharge:
        return [...baseActions, ...viewInfo];
      case MemberRole.ShiftIncharge:
        return checkShiftMembers(loginUser?.shift, shift);
      case MemberRole.Member:
        return [...viewInfo];
      default:
        return [];
    }
  }, [status, loginUser?.role ]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender;
