import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RequestActionTitles } from "@/types";

interface Action {
  title: string;
  id: number;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

interface Props {
  actions: Action[];
}

const ActionsMenu = ({ actions }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
        >
          <DotsHorizontalIcon className="w-5 h-5" aria-label="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border rounded shadow-lg"
      >
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.id}
            onClick={action.onClick}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-0 flex items-center space-x-2"
          >
            {action.icon}
            <span
              className={`capitalize ${
                action.title === RequestActionTitles.Delete || action.title === RequestActionTitles.Reject
                  ? "text-status-inactive"
                  : ""
              }`}
            >
              {action.title}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
