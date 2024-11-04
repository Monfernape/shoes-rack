import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ScrollText as ScrollTextIcon } from "lucide-react";

interface StandardPageProps {
  title: string;
  description: string;
  onAction?: () => void;
  showContent?: boolean;
  buttonIcon?: ReactNode;
  labelForActionButton?: string;
  children?: ReactNode;
}

export const StandardPage = ({
  title,
  description,
  onAction,
  showContent = false,
  labelForActionButton,
  children,
  buttonIcon,
}: StandardPageProps) => {
  return showContent ? (
    <>{children}</>
  ) : (
    <div
      className="flex w-full h-full items-center justify-center"
      data-testid="standardPage"
    >
      <div className="flex flex-col items-start justify-center h-full max-w-lg gap-2">
        <span className="bg-button-background p-2 rounded">
          <ScrollTextIcon className="stroke-gray-500" size={20} />
        </span>
        <h1 className="text-sm font-semibold text-gray-800">{title || ""}</h1>
        <span className="flex text-gray-700 text-sm">{description || ""}</span>
        {onAction && (
          <Button
            className="w-32 h-7 mt-3"
            onClick={onAction}
            data-testid="button"
          >
            {buttonIcon}
            {labelForActionButton}
          </Button>
        )}
      </div>
    </div>
  );
};
