"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";

import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FieldError } from "react-hook-form";

type DateSelectionProps = {
  value: Date;
  error?: FieldError;
  onChange: () => void;
};
export const DateSelection = ({
  value,
  error,
  onChange,
}: DateSelectionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            data-testid="ehad_start_date"
            variant={"outline"}
            className={cn(
              `justify-start text-left font-normal
          ${value} && "text-muted-foreground
          ${error && "border-red-500 border focus-visible:ring-0"}
          `
            )}
          >
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto w-3.5 h-3.5" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" data-testid="calender">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};
