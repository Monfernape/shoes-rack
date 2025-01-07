import React, { useMemo, useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { AttendanceModelActions, AttendanceStatus, MemberRole } from "@/constant/constant";
import { toast } from "@/hooks/use-toast";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { updateAttendanceStatus } from "../actions/update-attendance-status";
import { deleteAttendance } from "../actions/deleteAttendance";
import { AttendanceDetails } from "../modal/AttendanceDetails";
import { Attendance, UserDetails } from "@/types";
import { ConfirmationModal } from "@/common/ConfirmationModal/ConfirmationModal";

export type AttendanceActionRenderProps = {
  attendance: Attendance;
  loginUser: UserDetails;
};

const AttendanceActionRender = ({
  attendance,
  loginUser,
}: AttendanceActionRenderProps) => {
  const router = useRouter();

  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<AttendanceModelActions>();
  const { id: requestId } = attendance;

  const handleViewDetails = () => {
    setIsOpenViewModal(!isOpenViewModal);
  };

  const handleEditInfo = (requestId: number) => {
    router.push(`${Routes.EditAttendance}/${requestId}`);
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      await deleteAttendance(requestId);
      toast({
        title: "Success",
        description: "Request deleted successfully.",
      });
      router.refresh(); // Trigger a page refresh or data fetch
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        });
      }
    }
  };

  const attendanceConfirmation = async (
    id: number,
    status: AttendanceStatus
  ) => {
    try {
      await updateAttendanceStatus({
        attendanceId: id,
        attendanceStatus: status,
      });
      toast({
        title: "Success",
        description: "Status updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          description:
            "Please try again.",
        });
      }
    }
  };

  const handleApproveAttendance = () => {
    attendanceConfirmation(requestId, AttendanceStatus.Approve);
    setIsModalOpen(false);
  };

  const handleRejectAttendance = () => {
    attendanceConfirmation(requestId, AttendanceStatus.Reject);
    setIsModalOpen(false);
  };

  const handleDeleteAttendance = () => {
    handleDeleteRequest(requestId);
    setIsModalOpen(false);
  };

  const openConfirmationModal = (action: AttendanceModelActions) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handlePostiveAction = useMemo(() => {
    switch (modalAction) {
      case AttendanceModelActions.Delete:
        return handleDeleteAttendance;
      case AttendanceModelActions.Approve:
        return handleApproveAttendance;
      case AttendanceModelActions.Reject:
        return handleRejectAttendance;
      default:
        return () => {};
    }
  }, [modalAction]);

  const baseActions = useMemo(() => {
    if (
      attendance.status === AttendanceStatus.Approve ||
      attendance.status === AttendanceStatus.Reject
    ) {
      return [];
    }

    return [
      {
        title: "Edit",
        id: 2,
        onClick: () => {
          handleEditInfo(requestId);
        },
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: () => {
          openConfirmationModal(AttendanceModelActions.Delete);
        },
        icon: <TrashIcon size={16} className="stroke-status-inactive" />,
      },
    ];
  }, [attendance.status, requestId]);

  const viewInfo = useMemo(
    () => [
      {
        title: "View Details",
        id: 1,
        onClick: handleViewDetails,
        icon: <InfoIcon size={16} />,
      },
    ],
    []
  );

  const statusActions = useMemo(() => {
    const actions = [];
    if (
      attendance.status === AttendanceStatus.Pending ||
      attendance.status === AttendanceStatus.Reject
    ) {
      actions.push({
        title: "Approve",
        id: 4,
        onClick: () => {
          openConfirmationModal(AttendanceModelActions.Approve);
        },
        icon: <CheckCircleIcon size={16} />,
      });
    }
    if (
      attendance.status === AttendanceStatus.Pending ||
      attendance.status === AttendanceStatus.Approve
    ) {
      actions.push({
        title: "Reject",
        id: 5,
        onClick: () => {
          openConfirmationModal(AttendanceModelActions.Reject);
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      });
    }
    return actions;
  }, [attendance.status]);

  const shiftInchargeActionMenu = useMemo(() => {
    if (attendance.memberId === loginUser?.id) {
      return [...viewInfo, ...baseActions];
    }
    return [...viewInfo, ...baseActions, ...statusActions];
  }, [attendance.memberId, loginUser, viewInfo, baseActions, statusActions]);

  const actionMenu = useMemo(() => {
    switch (loginUser?.role) {
      case MemberRole.Member:
        return attendance.status === AttendanceStatus.Pending
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
        return shiftInchargeActionMenu;
      case MemberRole.Incharge:
        return [...viewInfo, ...baseActions, ...statusActions];
      default:
        return [];
    }
  }, [attendance.status, loginUser, shiftInchargeActionMenu]);

  return (
    <>
      <ActionsMenu actions={actionMenu} />

      <ConfirmationModal
        title="Confirm Action"
        description={`Are you sure you want to ${
          attendance.status === AttendanceStatus.Approve ? "reject" : "approve"
        } this attendance request?`}
        buttonText={
          attendance.status === AttendanceStatus.Approve ? "Reject" : "Approve"
        }
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        onHandleConfirm={handlePostiveAction}
      />
      <AttendanceDetails
        isOpenViewModal={isOpenViewModal}
        setIsOpenViewModal={setIsOpenViewModal}
        attendanceDetails={attendance}
      />
    </>
  );
};

export default AttendanceActionRender;
