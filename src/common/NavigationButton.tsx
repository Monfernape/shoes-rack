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
      className="flex items-center gap-2 rounded-md bg-primary px-5 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      <PlusIcon className="h-3.5 w-3.5" />
      <span className="hidden md:inline">{buttonText}</span>
    </Link>
  );
};

export default NavigationButton;
