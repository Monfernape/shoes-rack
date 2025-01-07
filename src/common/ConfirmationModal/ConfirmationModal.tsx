"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventType } from "@/types";

interface ConfirmationModalProps {
  title: string;
  description: string;
  buttonText: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  onHandleConfirm: (e: EventType) => void;
}
export const ConfirmationModal = ({
  title,
  description,
  buttonText,
  setIsModalOpen,
  isModalOpen,
  onHandleConfirm,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="rounded w-80 md:w-96">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="text-xs py-1 px-2 font-normal h-7"
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="text-xs py-1 px-2 font-normal h-7"
            onClick={onHandleConfirm}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
