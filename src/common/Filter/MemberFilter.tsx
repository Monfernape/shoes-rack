"use client";
import React, { useEffect, useState, useTransition } from "react";
import { MemberSelector } from "../MemberSelector/MemberSelector";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MemberRole } from "@/constant/constant";
import { User } from "@/types";
import { DataSpinner } from "../Loader/Loader";

export const MemberFilter = ({
  loginUser,
  route,
}: {
  loginUser: User;
  route: string;
}) => {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const handleSearchQueryChange = (value: string) => {
    setSearch(value);
    startTransition(() => {
      const shouldRedirectToLeaveRequest =
        value === "" && loginUser?.role === MemberRole.Incharge;
      const params = new URLSearchParams(searchparams);

      if (value === "0") {
        params.delete("id");
      } else if (value) {
        if (shouldRedirectToLeaveRequest) {
          replace(route);
        } else {
          params.set("id", value);
        }
      } else {
        params.delete("id");
      }
      replace(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    if (loginUser?.role === MemberRole.ShiftIncharge && search === "") {
      handleSearchQueryChange(loginUser.id?.toString());
    }
  }, []);

  if (loginUser?.role === MemberRole.Member) {
    return null;
  }

  return (
    <div className="flex justify-end">
      {isPending && <DataSpinner />}
      <div className="w-full sm:w-3/12 px-2 md:px-8 pt-4">
        <MemberSelector
          value={searchparams.get("id")?.toString() || ""}
          onValueChange={handleSearchQueryChange}
          loginUser={loginUser}
        />
      </div>
    </div>
  );
};
