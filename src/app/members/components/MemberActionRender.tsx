import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Info, Trash2, Edit, Send } from "lucide-react";
import { MemberRole } from "@/constant/constant";
import { deleteMember } from "../actions/delete-user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
interface MemberInfo {
  id: number;
  name?: string;
  phone?: string;
  role?: string;
  status: string;
}
type Props = {
  memberInfo: MemberInfo;
};

const MemberTableActionRender = ({ memberInfo }: Props) => {
  const { role, status, id } = memberInfo;
  const router = useRouter();
  const { toast } = useToast();
  const handleViewDetails = () => {
    return;
  };

  const handleEditInfo = () => {
    return;
  };

  const handleDeleteMember = async () => {
    const result = await deleteMember(id);
    if (result.status === 204) {
      toast({
        title: "Member deleted successfully",
      });
      return router.refresh();
    } else {
      toast({
        title: "Error occured during member deletion process",
      });
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
    status === "active"
      ? [
          {
            title: "Resend Invite",
            id: 4,
            onClick: handleResendInvite,
            icon: <Send size={16} />,
          },
        ]
      : [];

  const actionMenu = React.useMemo(() => {
    switch (role) {
      case MemberRole.Member:
        return status === "inactive"
          ? [...viewInfo, ...resendInvite]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...viewInfo, ...baseActions, ...resendInvite];

      default:
        return [];
    }
  }, [role, status]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender;
