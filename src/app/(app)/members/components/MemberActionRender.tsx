"use client";
import React, { useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as Trash2Icon,
  Edit as EditIcon,
  UserPlus as UserPlusIcon,
} from "lucide-react";
import { MemberRole, Shift, UserStatus } from "@/constant/constant";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Member, UserDetails } from "@/types";
import { EventType } from "@/types";
import { Routes } from "@/lib/routes";
import { updateMemberStatus } from "../actions/update-status";
import { ConfirmationModal } from "@/common/ConfirmationModal/ConfirmationModal";

type Props = {
  memberInfo: Member;
  loginUser: Member;
};

const MemberTableActionRender = ({ memberInfo, loginUser }: Props) => {
  const { status, id, shift, role } = memberInfo;
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = (e: EventType) => {
    e.stopPropagation();
    router.push(`${Routes.MemberDetails}/${id}`);
  };

  const handleEditInfo = (e: EventType) => {
    e.stopPropagation();
    router.push(`${Routes.EditMember}/${id}`);
  };

  const handleStatus = async (e: EventType) => {
    e.stopPropagation();
    try {
      const result = await updateMemberStatus(id, UserStatus.Active);
      if (result) {
        toast({
          variant: "destructive",
          title: result.message,
          description: "Try again",
        });
        return;
      }
      toast({
        title: "Update Member status successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };
  const handleModalOpen = (e: EventType) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (e: EventType) => {
    e.stopPropagation();
    try {
      await updateMemberStatus(id, UserStatus.Deactivated);
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
      onClick: (e: EventType) => {
        e.stopPropagation();
        handleModalOpen(e);
      },
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
      title: "Restore member",
      id: 1,
      onClick: (e: EventType) => {
        e.stopPropagation();
        handleModalOpen(e);
      },
      icon: <UserPlusIcon size={16} />,
    },
  ];

  const checkShiftMembers = (
    loginUserShift: UserDetails,
    shift: Shift,
    role: MemberRole
  ) => {
    if (shift === loginUserShift.shift) {
      if (
        role === MemberRole.ShiftIncharge &&
        id !== loginUserShift.id &&
        status !== UserStatus.Deactivated
      ) {
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
        return (role ===  MemberRole.ShiftIncharge) || (role ===MemberRole.Incharge )
          ? [...viewInfo]
          : checkShiftMembers(loginUser, shift, role);
      case MemberRole.Member:
        return [...viewInfo];
      default:
        return [];
    }
  }, [status, loginUser?.role]);

  return (
    <>
      <ConfirmationModal
        title={
          status === UserStatus.Deactivated ? "Restore Member" : "Delete Member"
        }
        description={
          status === UserStatus.Deactivated
            ? "Are you sure you want to restore this member?"
            : "Are you sure you want to delete this member?"
        }
        buttonText={
          status === UserStatus.Deactivated ? "Restore Member" : "Delete"
        }
        setIsModalOpen={setIsModalOpen}
        onHandleConfirm={
          status === UserStatus.Deactivated ? handleStatus : handleDeleteMember
        }
        isModalOpen={modalOpen}
      />
      <ActionsMenu actions={actionMenu} />
    </>
  );
};

export default MemberTableActionRender;
