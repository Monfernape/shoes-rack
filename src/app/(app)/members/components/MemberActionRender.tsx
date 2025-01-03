"use client";
import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Info, Trash2, Edit } from "lucide-react";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { deleteMember } from "../actions/delete-member";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Member } from "@/types";
import { Routes } from "@/lib/routes";

type Props = {
  memberInfo: Member;
  loginUser: Member;
};

const MemberTableActionRender = ({ memberInfo, loginUser }: Props) => {
  const { status, id, shift } = memberInfo;

  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = () => {
    router.push(`${Routes.MemberDetails}/${id}`);
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
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };

  const baseActions = [
    {
      title: "Edit info",
      id: 2,
      onClick: handleEditInfo,
      icon: <Edit size={16} />,
    },
    {
      title: "Delete member",
      id: 3,
      onClick: handleDeleteMember,
      icon: <Trash2 size={16} />,
    },
  ];

  const viewInfo = [
    {
      title: "View details",
      id: 1,
      onClick: handleViewDetails,
      icon: <Info size={16} />,
    },
  ];



  const checkShiftMembers = (loginUserShift: string, shift: Shift) => {
    if (loginUserShift === shift) {
      if (status === UserStatus.Inactive) {
        return [...baseActions, ...viewInfo];
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
  }, [status, loginUser?.role]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender;
