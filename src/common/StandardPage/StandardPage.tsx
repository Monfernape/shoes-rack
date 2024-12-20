import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface StandardPageProps {
  title: string;
  description: string;
  actionButton: boolean;
  onAction?: () => void;
  hasContent?: boolean;
  buttonIcon?: ReactNode;
  icon?: ReactNode;
  labelForActionButton?: string;
  children?: ReactNode;
}

export const StandardPage = ({
  title,
  description,
  actionButton = false,
  onAction,
  hasContent = false,
  labelForActionButton,
  children,
  buttonIcon,
  icon,
}: StandardPageProps) => {
  if (hasContent) return <>{children}</>;

  return (
    <div
      className="flex w-full h-full items-center justify-center"
      data-testid="standardPage"
    >
      <div className="flex flex-col items-start justify-center h-full max-w-lg gap-2">
        <span className="bg-button-background p-2 rounded">

           {icon}
        </span>
        <h1 className="text-sm font-semibold text-gray-800">{title || ""}</h1>
        <span className="flex text-gray-700 text-sm" data-testid="description">
          {description || ""}
        </span>
        {actionButton && (
          <Button className=" h-7 " onClick={onAction} data-testid="button">
            {buttonIcon}
            {labelForActionButton}
          </Button>
        )}
      </div>
    </div>
  );
};
