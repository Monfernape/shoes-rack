"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getMembers } from "@/app/members/actions/getMembers";
import { Member } from "@/types";
import { MemberRole, UserStatus } from "@/constant/constant";
import { useUser } from "@/hooks/useGetLoggedinUser";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

const MemberSelector = <T extends FieldValues>({
  control,
  name,
}: SelectFieldProps<T>) => {
  const { fieldState } = useController({
    control,
    name,
  });

  const [members, setMembers] = useState<Member[]>([]);
  const loginUser = useUser();
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembers();
        if (response.success) {
          setMembers(response.data);
        } else {
          console.error("Error fetching members:", response.message);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  // Memoized calculation of active members based on user role and shift
  const roleBaseMembers = useMemo(() => {
    return members
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          (loginUser?.role === MemberRole.Incharge ||
            member.shift === loginUser?.shift)
      )
      .map(({ id, name }) => ({
        id: id.toString(),
        name,
      }));
  }, [members]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>User Name</FormLabel>
          <FormControl>
            <Select
              {...field}
              value={loginUser?.role === MemberRole.Member  ? loginUser?.name : field.value}
              onValueChange={field.onChange}
              disabled={loginUser?.role === MemberRole.Member}
            >
              <SelectTrigger
                data-testid="memberId"
                className={`border rounded-md p-2 ${
                  fieldState?.error?.message
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue data-testId="select" placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {roleBaseMembers?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { MemberSelector };
