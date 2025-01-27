import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EventType, RequestActionTitles } from "@/types";

interface Action {
  title: string;
  id: number;
  icon: ReactNode;
  onClick: (e: EventType) => void;
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
          disabled={!actions.length}
          data-testid = "actionButton"
        >
          <DotsHorizontalIcon className="w-5 h-5" aria-label="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border rounded shadow-lg"
        data-testid = 'menus'
      >
        {actions.map((action) => (
          <DropdownMenuItem
            key={`${action.id}-${action.title}`}
            onClick={action.onClick}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-0 flex items-center space-x-2"
          >
            {action.icon}
            <span
              className={` ${
                action.title === RequestActionTitles.Delete ||
                action.title === RequestActionTitles.Reject
                  ? "text-status-inactive"
                  : ""
              }`}
              data-testid="menuOptions"
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
