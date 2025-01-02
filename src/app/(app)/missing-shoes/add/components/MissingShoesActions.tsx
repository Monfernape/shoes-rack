"use client";

import React, { useMemo, useState } from "react";
import ActionsMenu from "@/common/ActionMenu/ActionsMenu";
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  InfoIcon,
} from "lucide-react";
import { MissingShoeStatus } from "@/constant/constant";
import { processMissingShoeStatus } from "../../actions/process-missing-shoe-status";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MissingShoeReport } from "@/types";
import { ConfirmationModal } from "@/common/ConfirmationModal/ConfirmationModal";

export const MissingShoesActions = ({
  missingShoeReport,
}: {
  missingShoeReport: MissingShoeReport;
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id: missingShoesId, status: missingShoeStatus } = missingShoeReport;
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

  const onHandleConfirm = () => {
    handleMissingShoesStatus(missingShoesId, MissingShoeStatus.Found);
  };

  const actionMenu = useMemo(
    () => [
      {
        title: "Found",
        id: 1,
        onClick: () => {
          setIsModalOpen(true);
        },
        icon: <CheckCircleIcon size={16} />,
      },
      {
        title: "Edit",
        id: 3,
        onClick: () => {
          handleEditInfo(missingShoesId);
        },
        icon: <EditIcon size={16} />,
      },
    ],
    []
  );

  const viewMenu = useMemo(
    () => [
      {
        title: "View Details",
        id: 2,
        onClick: () => handleViewDetails(missingShoesId),
        icon: <InfoIcon size={16} />,
      },
    ],
    []
  );

  return (
    <>
      <ActionsMenu
        actions={
          missingShoeStatus === MissingShoeStatus.Found
            ? viewMenu
            : [...viewMenu, ...actionMenu]
        }
      />
      <ConfirmationModal
        title={"Confirm Found Shoes"}
        description={"Are you sure the missing shoes have been found?"}
        buttonText={"Found"}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        onHandleConfirm={onHandleConfirm}
      />
    </>
  );
};
