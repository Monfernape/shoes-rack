"use client";
import React from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import { Info as InfoIcon, Trash2 as Trash2Icon, Edit as EditIcon, ArchiveRestore as ArchiveRestoreIcon } from "lucide-react";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { deleteMember } from "../actions/delete-member";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Member, UserDetails } from "@/types";
import { Routes } from "@/lib/routes";
import { updateMemberStatus } from "../actions/update-status";

type Props = {
  memberInfo: Member;
  loginUser: Member;
};

const MemberTableActionRender = ({ memberInfo, loginUser }: Props) => {
  const { status, id, shift, role } = memberInfo;


  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = () => {
    router.push(`${Routes.MemberDetails}/${id}`);
  };

  const handleEditInfo = () => {
    router.push(`${Routes.EditMember}/${id}`);
  };

  const handleStatus = async () => {
    try {
    
      const result =   await updateMemberStatus(id);
        if(result) {
          toast({
            variant:"destructive",
            title: result.message,
            description:"Try again",
          
          });
          return 
        }
        toast({
          title: "Update Member status successfully",
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
      icon: <EditIcon size={16} />,
    },
    {
      title: "Delete member",
      id: 3,
      onClick: handleDeleteMember,
      icon: <Trash2Icon size={16} />,
    },
  ];

  const viewInfo = [
    {
      title: "View details",
      id: 1,
      onClick: handleViewDetails,
      icon: <InfoIcon size={16} />,
    },
  ];

  const reactiveUserAction = [
    {
      title: "Update status",
      id: 1,
      onClick: handleStatus,
      icon: <ArchiveRestoreIcon size={16} />,
    },
  ];

  const checkShiftMembers = (
    loginUserShift: UserDetails,
    shift: Shift,
    role: MemberRole
  ) => {
    if (shift === loginUserShift.shift) {
      if (role === MemberRole.ShiftIncharge && id !== loginUserShift.id && status!== UserStatus.Deactivated) {
        return [...viewInfo];
      }
      if (status === UserStatus.Inactive) {
        return [...baseActions, ...viewInfo];
      } else if (status === UserStatus.Deactivated) {
        return [...reactiveUserAction];
      }
      return [...baseActions, ...viewInfo];
    }
    return [...viewInfo];
  };
  const actionMenu = React.useMemo(() => {
    switch (loginUser?.role) {
      case MemberRole.Incharge:
        return status === UserStatus.Deactivated
          ? [...reactiveUserAction]
          : [...baseActions, ...viewInfo];
      case MemberRole.ShiftIncharge:
        return role === MemberRole.Incharge
          ? [...viewInfo]
          : checkShiftMembers(loginUser, shift, role);
      case MemberRole.Member:
        return [...viewInfo];
      default:
        return [];
    }
  }, [status, loginUser?.role]);

  return <ActionsMenu actions={actionMenu} />;
};

export default MemberTableActionRender;
