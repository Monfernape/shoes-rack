"use client";

import { useState, useMemo, useEffect } from "react";
import { format, subMonths, startOfMonth } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export default function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const currentDate = startOfMonth(new Date());
  const lastMonth = format(subMonths(currentDate, 1), "yyyy-MM");
  // Set the initial selected date to last month in yyyy-MM format
  const [selectedDate, setSelectedDate] = useState<string>(lastMonth);

  const dateOptions = useMemo(() => {
    const options = [];

    for (let i = 1; i <= 6; i++) {
      const date = subMonths(currentDate, i);
      options.push({
        value: format(date, "yyyy-MM"),
        label: format(date, "MMMM yyyy"),
      });
    }

    return options;
  }, [selectedDate]);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    router.push(pathname + "?date=" + selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <Select value={selectedDate} onValueChange={handleDateChange}>
        <SelectTrigger id="date-select" className="w-full sm:w-[200px]">
          <SelectValue placeholder="Select month and year" />
        </SelectTrigger>
        <SelectContent>
          {dateOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
