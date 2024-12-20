"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Member, User } from "@/types";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getMembers } from "@/app/(app)/members/actions/getMembers";

interface SelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  loginUser ?: User
}

const MemberSelector = ({ value, onValueChange , loginUser }: SelectFieldProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers("");
        if (response.success) {
          const activeMember = response.data.filter(
            (member) => member.status === UserStatus.Active
          );
          setMembers(activeMember);
        } else {
          console.error("Error fetching members:", response.message);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, [loginUser]);

  const roleBaseMembers = useMemo(() => {
    if (loginUser?.role === MemberRole.Incharge) {
      return members;
    } else if (loginUser?.role === MemberRole.Member) {
      return members.filter((member) => loginUser?.id === member.id);
    } else {
      return members
        .filter(
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
      >
        <SelectValue data-testId="select" placeholder="Select user" />
      </SelectTrigger>
      <SelectContent>
        {loginUser?.role === MemberRole.Incharge && (
          <SelectItem value={"0"}>Select all user</SelectItem>
        )}
        {roleBaseMembers?.map((option) => (
          <SelectItem key={option.id.toString()} value={option.id.toString()}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { MemberSelector };
