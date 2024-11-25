"use client";

import React, { useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

type FieldValues = {
  from: Date | undefined;
  to: Date | undefined;
};
interface Props {
  onChange: (dates: DateRange | undefined) => void;
  value: FieldValues;
}

export function DatePickerWithRange({ onChange, value }: Props) {
  const today = new Date();
  const isDisabled = (date: Date) => {
    return date < today;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-xs font-normal text-left",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value?.from ? (
            value?.to ? (
              <>
                {format(value?.from, "LLL dd, y")} -{" "}
                {format(value?.to, "LLL dd, y")}
              </>
            ) : (
              format(value?.from, "LLL dd, y")
            )
          ) : (
            <span className="test-xs">Pick start date and end date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={isDisabled}
        />
      </PopoverContent>
    </Popover>
  );
}
