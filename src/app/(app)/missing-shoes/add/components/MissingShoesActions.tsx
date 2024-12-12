"use client";

import React, { useMemo } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Trash2 as TrashIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";
import { MissingShoeStatus } from "@/constant/constant";

export const MissingShoesActions = ({
  missingShoesId,
}: {
  missingShoesId: number;
}) => {
  const handleEditInfo = (id: number) => {
    return id;
  };

  const handleDeleteRequest = async (id: number) => {
    return id;
  };

  const handleLeaveRequestStatus = async (
    id: number,
    status: MissingShoeStatus
  ) => {
    return {
      id,
      status,
    };
  };

  const actionMenu = useMemo(
    () => [
      {
        title: "Found",
        id: 4,
        onClick: () => {
          handleLeaveRequestStatus(missingShoesId, MissingShoeStatus.Found);
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Missing",
        id: 4,
        onClick: () => {
          handleLeaveRequestStatus(missingShoesId, MissingShoeStatus.Missing);
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive"/>,
      },
      {
        title: "Edit",
        id: 2,
        onClick: () => {
          handleEditInfo(missingShoesId);
        },
        icon: <EditIcon size={16} />,
      },
      {
        title: "Delete",
        id: 3,
        onClick: () => {
          handleDeleteRequest(missingShoesId);
        },
        icon: <TrashIcon size={16} className="stroke-status-inactive"/>,
      },
    ],
    []
  );

  return <ActionsMenu actions={actionMenu} />;
};
