
import React from 'react';
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface Action {
  title: string;
  id: number;
  onClick: () => void;
}

interface TableActionsMenuProps {
  actions: Action[];
}

const ActionsMenu: React.FC<TableActionsMenuProps> = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus:outline-none focus-visible:ring-0 active:outline-none active:ring-0"
        >

          <DotsHorizontalIcon className="w-5 h-5" aria-label='icon' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border rounded shadow-lg"
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-0"
          >
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;