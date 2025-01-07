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

interface ConfirmationModalProps {
  title: string;
  description: string;
  buttonText: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  onHandleConfirm: () => void;
}
export const ConfirmationModal = ({
  title,
  description,
  buttonText,
  setIsModalOpen,
  isModalOpen,
  onHandleConfirm,
}: ConfirmationModalProps) => {

  const handleCancelButton = ()=>{
    setIsModalOpen(false)
  }
  
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
            onClick={handleCancelButton}
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
