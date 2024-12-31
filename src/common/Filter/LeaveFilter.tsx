"use client";
import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState, useTransition } from "react";
import { MemberSelector } from "../MemberSelector/MemberSelector";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { MemberRole } from "@/constant/constant";
import { DataSpinner } from "../Loader/Loader";
import { User } from "@/types";

export const LeaveFilter = ({ loginUser }: { loginUser: User }) => {

  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isPending, startTransition] = useTransition();
  const handleSearchQueryChange = (value: string) => {
    startTransition(() => {
      setSearch(value);
    });
  };

  // useEffect(() => {
  //   if (loginUser?.role === MemberRole.ShiftIncharge && search === "") {
  //     setSearch(loginUser.id?.toString());
  //   }
  // }, [loginUser, search]);

  useEffect(() => {
    const shouldRedirectToLeaveRequest =
      debounceValue === "0" || debounceValue === "" && (loginUser?.role === MemberRole.Incharge || loginUser?.role === MemberRole.Member);

    const route = shouldRedirectToLeaveRequest
      ? Routes.LeaveRequest
      : `${Routes.LeaveRequest}?id=${debounceValue}`;

    router.push(route);
  }, [debounceValue, loginUser?.role, pathname, router]);

  return (
    <div className="flex justify-end">
      {isPending && <DataSpinner />}
      <div className="w-full sm:w-3/12 px-3 md:px-8 pt-4">
        <MemberSelector
          value={search}
          onValueChange={handleSearchQueryChange}
          loginUser={loginUser}
        />
      </div>
    </div>
  );
};
