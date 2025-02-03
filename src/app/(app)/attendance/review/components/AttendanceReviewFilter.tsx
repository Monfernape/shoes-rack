"use client";

import { useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { addDays } from "date-fns";

export default function AttendanceReviewFilter() {
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
    <DatePicker defaultDate={date || new Date()} onSetDate={handleDateChange} />
  );
}
