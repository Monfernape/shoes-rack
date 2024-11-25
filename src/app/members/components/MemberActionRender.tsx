import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Info, Trash2, Edit, Send } from "lucide-react";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { useRouter } from "next/navigation";
import { User, UserDetails } from "@/types";
import { Routes } from "@/lib/routes";

interface MemberInfo {
  id: number;
  name?: string;
  phone?: string;
  role?: MemberRole;
  status: UserStatus;
  shift: Shift;
}
type Props = {
  memberInfo: MemberInfo;
  loginUser: UserDetails | undefined;
};

const MemberTableActionRender = ({ memberInfo, loginUser }: Props) => {
  const router = useRouter();

  console.log("memberActionRender", loginUser);
  const { role, status, id, shift } = memberInfo;
  const handleViewDetails = () => {
    return;
  };

  const handleEditInfo = () => {
    router.push(`${Routes.EditMember}/${id}`);
  };

  const handleDeleteMember = () => {
    return;
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
  }, [role, status]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender;
