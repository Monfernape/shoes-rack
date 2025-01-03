"use client";
import React, { useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useSWR from 'swr'
import { User } from "@/types";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getMembers } from "@/app/(app)/members/actions/getMembers";
import { DataSpinner } from "../Loader/Loader";

interface SelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  loginUser?: User;
}

const fetchMembers = async () => {
  const response = await getMembers("");
  if (!response.success) {
    console.error("Error fetching members:", response.message);
  }
  return response.data.filter((member) => member.status === UserStatus.Active);
};

const MemberSelector = ({ value, onValueChange , loginUser }: SelectFieldProps) => {
  const { data: members,isLoading } = useSWR("members", fetchMembers);

  const roleBaseMembers = useMemo(() => {
    if(members){
    if (loginUser?.role === MemberRole.Incharge) {
      return members;
    } else if (loginUser?.role === MemberRole.Member) {
      return members?.filter((member) => loginUser?.id === member.id);
    } else {
      return members?.filter(
          (member) =>
            loginUser?.id === member.id ||
            (member?.role === MemberRole.Member &&
              loginUser?.shift === member.shift)
        )
        .map(({ id, name }) => ({
          id: id,
          name,
        }));
    }
  }
  }, [members]);
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onValueChange(value);
      }}
      disabled={loginUser?.role === MemberRole.Member}
    >
      <SelectTrigger
        data-testid="memberId"
        className={`border rounded-md p-2 border-gray-300`}
      >{!isLoading ? (
        <SelectValue  placeholder="Select user" />
        ):(
          <DataSpinner isInputLoader size="xs" />
        )}
      </SelectTrigger>
      <SelectContent>
        {loginUser?.role === MemberRole.Incharge && (
          <SelectItem value={"0"}>{!isLoading ? 'Select all user' : ""}</SelectItem>
        )}
        {!isLoading ? (
          roleBaseMembers?.map((option) => (
            <SelectItem key={option.id.toString()} value={option.id.toString()}>
              {option.name}
            </SelectItem>
          ))
        ) : (
          <DataSpinner size="xs" />
        )}
      </SelectContent>
    </Select>
  );
};

export { MemberSelector };
