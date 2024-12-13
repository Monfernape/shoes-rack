"use client";

import React, { useMemo } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  InfoIcon,
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

  const handleViewDetails = (id: number) => {return id};

  const handleMissingShoesStatus = async (
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
        id: 1,
        onClick: () => {
          handleMissingShoesStatus(missingShoesId, MissingShoeStatus.Found);
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Missing",
        id: 2,
        onClick: () => {
          handleMissingShoesStatus(missingShoesId, MissingShoeStatus.Missing);
        },
        icon: <AlertCircleIcon size={16} className="stroke-status-inactive" />,
      },
      {
        title: "View Details",
        id: 3,
        onClick: () => handleViewDetails(missingShoesId),
        icon: <InfoIcon size={16} />,
      },
      {
        title: "Edit",
        id: 4,
        onClick: () => {
          handleEditInfo(missingShoesId);
        },
        icon: <EditIcon size={16} />,
      },
    ],
    []
  );

  return <ActionsMenu actions={actionMenu} />;
};