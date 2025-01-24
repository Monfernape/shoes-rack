import { Plus as PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  buttonText: string;
  path: string;
};
export const NavigationButton = ({ buttonText, path }: Props) => {
  return (
    <Link
      href={path}
      data-testid="addMemberButton"
      className="flex items-center h-7 justify-center gap-2 rounded-sm bg-primary p-2 border border-bg-primary text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      <PlusIcon className="h-3 w-3" />
      <span className="hidden md:inline leading-3">{buttonText}</span>
    </Link>
  );
};

export default NavigationButton;
