import React, { useMemo, useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Info as InfoIcon,
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { LeaveRequestsTypes, LeavesRequestStatus } from "@/types";
import { MemberRole } from "@/constant/constant";
import { LeaveRequestDetails } from "../modal/LeaveRequestDetails";
import { deleteLeaveRequest } from "../actions/delete-leave-request";
import { toast } from "@/hooks/use-toast";
import { processLeaveRequest } from "../actions/process-leave-request";

const loggedUser = {
  name: "John Smith",
  role: "incharge",
};

interface Props {
  leaveRequestDetails: LeaveRequestsTypes;
}

const LeaveTableActionRender = ({ leaveRequestDetails }: Props) => {
  const [isOpenViewModal, setIsOpenViewModal] = useState<boolean>(false);

  const { id: requestId } = leaveRequestDetails;
  const handleViewDetails = () => {
    setIsOpenViewModal(!isOpenViewModal);
  };

  const handleEditInfo = () => {
    return;
  };

  const handleDeleteRequest = async (requestId: number) => {
    try {
      await deleteLeaveRequest(requestId);
      toast({
        title: "Success",
        description: "Request deleted successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description:
            "There was an issue deleting the request. Please try again.",
        });
      }
    }
  };

  const handleLeaveRequestStatus = async (
    requestId: number,
    status: LeavesRequestStatus
  ) => {
    try {
      await processLeaveRequest({ requestId, requestStatus: status });
      toast({
        title: "Success",
        description: "Request updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description:
            "There was an issue updating the request. Please try again.",
        });
      }
    }
  };

  const baseActions = useMemo(
    () => [
      {
        title: "Edit",
        id: 2,
        onClick: handleEditInfo,
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: () => {
          if (requestId !== undefined) {
            handleDeleteRequest(requestId);
          } else {
            toast({
              title: "Error",
              description: "Request ID is missing.",
            });
          }
        },
        icon: <TrashIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

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

  const statusActions = useMemo(
    () => [
      {
        title: "Accept",
        id: 4,
        onClick: () => {
          if (requestId !== undefined) {
            handleLeaveRequestStatus(requestId, LeavesRequestStatus.Approved);
          } else {
            toast({
              title: "Error",
              description: "Request ID is missing.",
            });
          }
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Reject",
        id: 4,
        onClick: () => {
          if (requestId !== undefined) {
            handleLeaveRequestStatus(requestId, LeavesRequestStatus.Reject);
          } else {
            toast({
              title: "Error",
              description: "Request ID is missing.",
            });
          }
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
    ],
    []
  );

  const actionMenu = useMemo(() => {
    switch (loggedUser.role) {
      case MemberRole.Member:
        return leaveRequestDetails.status === LeavesRequestStatus.Pending
          ? [...viewInfo, ...baseActions]
          : [...viewInfo];
      case MemberRole.ShiftIncharge:
      case MemberRole.Incharge:
      case MemberRole.SuperAdmin:
        return [...viewInfo, ...statusActions];

      default:
        return [];
    }
  }, [leaveRequestDetails.status]);

  return (
    <>
      <ActionsMenu actions={actionMenu} />
      <LeaveRequestDetails
        isOpenViewModal={isOpenViewModal}
        setIsOpenViewModal={setIsOpenViewModal}
        leaveRequestDetails={leaveRequestDetails}
      />
    </>
  );
};

export default LeaveTableActionRender;
