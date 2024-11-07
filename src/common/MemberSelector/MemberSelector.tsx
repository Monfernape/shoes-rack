import React, { useMemo } from "react";
import { Control, useController } from "react-hook-form";
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
import { UserStatus } from "@/constant/constant";
import { MemberRole, User } from "@/lib/constants";

interface SelectFieldProps {
  control: Control<any>;
  name: string;
}

const memberOptions = [
  {
    id: "1",
    name: "Alice Johnson",
    shift: "A",
    role: "incharge",
    status: "active",
  },
  { id: "2", name: "Bob Smith", shift: "B", role: "member", status: "invited" },
  {
    id: "3",
    name: "Charlie Brown",
    shift: "C",
    role: "shift-incharge",
    status: "active",
  },
  {
    id: "4",
    name: "Diana Prince",
    shift: "D",
    role: "member",
    status: "active",
  },
];

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

const MemberSelector = ({ control, name }: SelectFieldProps) => {
  const { fieldState } = useController({
    control,
    name,
  });

  // Create a list of users based on their roles:
  // Incharge can make attendance for every user.
  // Shift incharge can mark attendance for it's shift's users.
  // Members can only mark their attdencane

  const roleBaseMembers = useMemo(() => {
    return memberOptions
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          (loginUser.role === MemberRole.Incharge ||
            member.shift === loginUser.shift)
      )
      .map(({ id, name }) => ({
        id,
        name,
      }));
  }, [memberOptions]);

  return (
    <FormField
      control={control}
      name="endTime"
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
                className={`border rounded-md p-2 ${
                  fieldState?.error?.message
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {roleBaseMembers.map((option) => (
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
