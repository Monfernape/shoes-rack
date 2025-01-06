"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/constant/constant";
import React from "react";

export const MemberStatusSelector = ({
    setMemberStatus,
    membersStatus
} : {
    setMemberStatus : (value:UserStatus )=>void,
    membersStatus:string 
}) => {
  return (
      <Select
        onValueChange={(e : UserStatus) => {
            setMemberStatus(e)
        }}
        defaultValue={membersStatus?? UserStatus.Active}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue    />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={UserStatus.Active}>Active</SelectItem>
            <SelectItem value={UserStatus.Deactivated}>
              Archived
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  );
};
