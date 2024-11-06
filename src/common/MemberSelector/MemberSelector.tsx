import React, { useMemo } from "react";
import { Control, useController } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
  errorMessage: string | undefined;
}

const memberOptions = [
  { id: 123, name: "John Doe", role: "member", shift: "A", status: "active" },
  {
    id: 1,
    name: "Alice Johnson",
    shift: "A",
    role: "incharge",
    status: "active",
  },
  { id: 2, name: "Bob Smith", shift: "B", role: "member", status: "invited" },
  {
    id: 3,
    name: "Charlie Brown",
    shift: "C",
    role: "shift-incharge",
    status: "active",
  },
  { id: 4, name: "Diana Prince", shift: "D", role: "member", status: "active" },
  {
    id: 5,
    name: "Ethan Hunt",
    shift: "A",
    role: "incharge",
    status: "invited",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    shift: "B",
    role: "member",
    status: "active",
  },
  {
    id: 7,
    name: "George Banks",
    shift: "B",
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 8,
    name: "Hannah Baker",
    shift: "B",
    role: "member",
    status: "invited",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    shift: "C",
    role: "incharge",
    status: "active",
  },
  {
    id: 10,
    name: "Jack Sparrow",
    shift: "C",
    role: "member",
    status: "active",
  },
  {
    id: 11,
    name: "Kara Danvers",
    shift: "D",
    role: "shift-incharge",
    status: "invited",
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

const MemberSelector = ({ control, name, errorMessage }: SelectFieldProps) => {
  const { field, fieldState } = useController({
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

  const hasError = fieldState?.error?.message || errorMessage;

  return (
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
              hasError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {roleBaseMembers.map((option) => (
              <SelectItem key={option.id} value={option.id.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {hasError && <FormMessage>{hasError}</FormMessage>}
    </FormItem>
  );
};

export { MemberSelector };
