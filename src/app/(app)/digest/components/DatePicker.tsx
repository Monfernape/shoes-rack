"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  defaultDate: Date;
  onSetDate: (date: Date) => void;
}

export function DatePicker({
  defaultDate,
  onSetDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(defaultDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the date 6 months ago from the current date and year
  const sixMonthsAgo = subMonths(new Date(), 6);
  const currentDate = new Date();
  const currentYear = getYear(currentDate);

  const isLastSixMonthsInCurrentYear =
  getYear(sixMonthsAgo) === currentYear;

// Determine which years to display based on the last 6 months
const years = isLastSixMonthsInCurrentYear
  ? [currentYear]
  : [currentYear, currentYear - 1];

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
    onSetDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
    onSetDate(newDate);
  };


  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onSetDate(selectedDate);
    }
  };

  // Disable months older than 6 months
  const isMonthDisabled = (monthIndex: number, year: number) => {
    const selectedDate = new Date(year, monthIndex, 1);
    return selectedDate < sixMonthsAgo || selectedDate > currentDate;
  };

  // Disable years before 6 months ago
  const isYearDisabled = (year: number) => {
    return year < getYear(sixMonthsAgo);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex justify-between p-2">
            {/* Month Selector */}
            <Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => {
                  const isDisabled = isMonthDisabled(index, getYear(date));
                  return (
                    <SelectItem key={month} value={month} disabled={isDisabled}>
                      {month}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Year Selector */}
            <Select onValueChange={handleYearChange} value={getYear(date).toString()}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => {
                  const isDisabled = isYearDisabled(year);
                  return (
                    <SelectItem key={year} value={year.toString()} disabled={isDisabled}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            month={date}
            disabled={(selectedDate) => selectedDate < sixMonthsAgo || selectedDate > currentDate}
            onMonthChange={(newMonth) =>
              setDate(setMonth(date, getMonth(newMonth)))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
