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
import { MemberRole, UserStatus } from "@/constant/constant";
import { getMembers } from "@/app/members/actions/getMembers";
import { Member, User } from "@/types";

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

const loginUser: User = {
  id: 1,
  name: "Alice Johnson",
  shift: "A",
  role: "incharge",
  status: UserStatus.Active,
  phone: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  deleted_at: null,
};

const MemberSelector = <T extends FieldValues>({
  control,
  name,
}: SelectFieldProps<T>) => {
  const { fieldState } = useController({
    control,
    name,
  });

  const [members, setMembers] = useState<Member[]>([]);

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
          (loginUser.role === MemberRole.Incharge ||
            member.shift === loginUser.shift)
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
              value={field.value}
              onValueChange={field.onChange}
              disabled={loginUser.role === "member"}
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
