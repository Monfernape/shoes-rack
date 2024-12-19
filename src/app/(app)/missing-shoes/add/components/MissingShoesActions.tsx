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
import { processMissingShoeStatus } from "../../actions/process-missing-shoe-status";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

export const MissingShoesActions = ({
  missingShoesId,
}: {
  missingShoesId: number;
}) => {
  const router = useRouter();
  const handleEditInfo = (id: number) => {
    router.push(`${Routes.EditMissingShoes}/${id}`);
  };

  const handleViewDetails = (id: number) => {
    router.push(`${Routes.MissingShoesDetails}/${id}`);
  };

  const handleMissingShoesStatus = async (
    id: number,
    status: MissingShoeStatus
  ) => {
    try {
      await processMissingShoeStatus({
        missingShoeId: id,
        missingShoeStatus: status,
      });
      toast({
        title: "Success",
        description: "Status updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description:
            "There was an issue updating the status. Please try again.",
        });
      }
    }
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
