"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
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
} from "./select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  startYear?: number;
  endYear?: number;
  label: string;
  control: Control<T>;
  name: FieldPath<T>;
  defaultDate: Date;
}

export function DatePicker<T extends FieldValues>({
  label,
  control,
  name,
  defaultDate
}: DatePickerProps<T>) {

  const datex = new Date(defaultDate);
  datex.setUTCDate(datex.getUTCDate() + 1);
  
  const nextDay = datex.toISOString();
  const nextDayDate = new Date(nextDay);
  
  const startYear = getYear(new Date()) - 60;
  const endYear = getYear(new Date());

  const [date, setDate] = React.useState<Date>(nextDayDate);
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

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleMonthChange = (month: string) => {
          const newDate = setMonth(date, months.indexOf(month));
          setDate(newDate);
          field.onChange(newDate);
        };

        const handleYearChange = (year: string) => {
          const newDate = setYear(date, parseInt(year));
          setDate(newDate);
          field.onChange(newDate);
        };

        const handleSelect =(selectedDate: Date | undefined) => {
          if (selectedDate) {
            field.onChange(selectedDate);
            setDate(selectedDate);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      fieldState.error &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="flex justify-between p-2">
                    <Select
                      onValueChange={handleMonthChange}
                      value={months[getMonth(date)]}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Months" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={handleYearChange}
                      value={getYear(date).toString()}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Years" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    month={date}
                    onMonthChange={(newMonth) =>
                      setDate(setMonth(date, getMonth(newMonth)))
                    }
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
