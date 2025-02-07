"use client";

import { useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { addDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberRole, SHIFT_TIMING } from "@/constant/constant";
import { User } from "@/types";

export default function DigestReviewsFilter({
  loginUser,
  shift,
  onSetShift,
}: {
  loginUser: User;
  shift: string;
  onSetShift: (value: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    if (newDate) {
      const updatedDate = addDays(newDate, 1);
      setDate(updatedDate);
    }
  };

  useEffect(() => {
    const formattedDate =
      moment(date).utc().format("YYYY-MM-DD") + " 00:00:00.000000+00";
    const encodedDate = encodeURIComponent(formattedDate);
    router.push(pathname + "?date=" + encodedDate);
  }, [date]);

  return (
    <div className="flex flex-col gap-2 justify-start sm:flex-row sm:justify-end items-center sm:gap-4">
      {loginUser.role === MemberRole.Incharge && (
        <Select value={shift} onValueChange={(value) => onSetShift(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            {SHIFT_TIMING.map((shift) => (
              <SelectItem key={shift.shift} value={shift.shift}>
                Shift {shift.shift}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <DatePicker
        defaultDate={date || new Date()}
        onSetDate={handleDateChange}
      />
    </div>
  );
}
