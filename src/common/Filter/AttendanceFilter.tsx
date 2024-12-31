"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { MemberSelector } from "../MemberSelector/MemberSelector";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MemberRole } from "@/constant/constant";
import { User } from "@/types";

export const AttendanceFilter = ({ loginUser }: { loginUser: User }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const handleSearchQueryChange = (value: string) => {
      setSearch(value);
  };

  useEffect(() => {
    if (loginUser?.role === MemberRole.ShiftIncharge && search === "") {
      setSearch(loginUser.id?.toString());
    }
  }, [loginUser, search]);

  useEffect(() => {
    const shouldRedirectToAttendance =
      debounceValue === "0" ||
      (debounceValue === "" &&
        (loginUser?.role === MemberRole.Incharge ||
          loginUser?.role === MemberRole.Member));

    const route = shouldRedirectToAttendance
      ? Routes.Attendance
      : `${Routes.Attendance}?id=${debounceValue}`;

    router.push(route);
  }, [debounceValue, loginUser?.role, pathname, router]);
  return (
    <div className="flex justify-end">
      <div className="w-full sm:w-3/12 px-3  md:px-8 pt-4">
        <MemberSelector
          value={search}
          onValueChange={handleSearchQueryChange}
          loginUser={loginUser}
        />
      </div>
    </div>
  );
};
