"use client";
import React from "react";
import { useMask } from "@react-input/mask";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MemberRole, Shift } from "@/constant/constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CNIC_VALIDATOR_REGEX, PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "../actions/createUser";
import { updateUser } from "../actions/update-user";
import { Member } from "@/types";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import FormWrapper from "@/common/FormWrapper";
import { useParams } from "next/navigation";
import { DatePicker } from "@/components/ui/datepicker";
export type UserBuilder = z.infer<typeof userBuilderSchema>;
export interface UpdateUser extends UserBuilder {
  id: number;
}
export const USER_ROLES = [
  {
    role: "Member",
    value: MemberRole.Member,
  },

  {
    role: "Shift Incharge",
    value: MemberRole.ShiftIncharge,
  },
  {
    role: "Incharge",
    value: MemberRole.Incharge,
  },
];

const SHIFT_TIMING = [
  {
    time: "Shift 12:00am to 00:06am",
    value: Shift.ShiftA,
  },
  {
    time: "Shift 00:06am to 00:12pm",
    value: Shift.ShiftB,
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    value: Shift.ShiftC,
  },
  {
    time: "Shift 00:06pm to 00:12am",
    value: Shift.ShiftD,
  },
];

export const userBuilderSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  date_of_birth: z
    .date()
    .max(
      new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000),
      "Member must be at least 16 years old"
    ),
  cnic: z.string().regex(CNIC_VALIDATOR_REGEX, "CNIC is not valid"),
  shift: z.enum([Shift.ShiftA, Shift.ShiftB, Shift.ShiftC, Shift.ShiftD], {
    errorMap: () => {
      return { message: "Select shift" };
    },
  }),
  address: z.string({ message: "Address is required" }),
  role: z.enum(
    [MemberRole.Member, MemberRole.ShiftIncharge, MemberRole.Incharge],
    {
      errorMap: () => {
        return { message: "Select user role" };
      },
    }
  ),
  ehad_duration: z.date().refine(
    (date) => {
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() - 30);
      return date <= minDate;
    },
    {
      message: "Ehad Duration must be more than 30 days ago",
    }
  ),
});

type MemberFormBuilder = {
  member?: Member;
};
export const MemberFormBuilder = ({ member }: MemberFormBuilder) => {
  const { toast } = useToast();
  const params = useParams();

  const phoneNumberMask = useMask({
    mask: "___________",
    replacement: { _: /\d/ },
  });
  const cnicMask = useMask({
    mask: "3____-_______-_",
    replacement: { _: /\d/ },
  });

  const form = useForm<UserBuilder>({
    resolver: zodResolver(userBuilderSchema),
    defaultValues: {
      name: member?.name ?? "",
      phoneNumber: member?.phoneNumber ?? "",
      date_of_birth: member ? new Date(member?.date_of_birth) : undefined,
      cnic: member?.cnic ?? "",
      shift: member?.shift ?? Shift.ShiftA,
      address: member?.address ?? "",
      role: member?.role ?? MemberRole.Member,
      ehad_duration: member ? new Date(member?.ehad_duration) : new Date(),
    },
    mode: "all",
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmission = async (values: UserBuilder | UpdateUser) => {
    try {
      const result = member
        ? await updateUser({ ...values, id: member?.id })
        : await createUser(values);

      if (!result) {
        toast({
          title: member?.id
            ? "User updated successfully"
            : "User created successfully",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "User already exist",
          description: "Please use other phone number",
        });
      }
    }
  };

  return (
    <FormWrapper>
      <Form {...form}>
        <form
          action={() => form.handleSubmit(handleSubmission)()}
          className="space-y-4"
          data-testid="form"
        >
          <FormTitle title="Information" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Name</Label>
                <FormControl>
                  <Input
                    placeholder="Enter Name"
                    {...field}
                    data-testid="name"
                    name="name"
                    hasError={errors?.name && true}
                  />
                </FormControl>
                <FormMessage data-testid="name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Phone number</Label>
                <FormControl>
                  <Input
                    placeholder="0300-0000000"
                    {...field}
                    data-testid="phone"
                    ref={phoneNumberMask}
                    hasError={errors?.phoneNumber && true}
                  />
                </FormControl>
                <FormMessage data-testId="phone_error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnic"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>CNIC</Label>
                <FormControl>
                  <Input
                    placeholder="30000-0000000-0"
                    {...field}
                    data-testid="cnic"
                    ref={cnicMask}
                    hasError={errors?.cnic && true}
                  />
                </FormControl>
                <FormMessage data-testId="cnic_error" />
              </FormItem>
            )}
          />

          <DatePicker
            control={form.control}
            name="date_of_birth"
            label="Date of Birth"
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Address</Label>
                <FormControl>
                  <Textarea
                    placeholder="Enter Address"
                    {...field}
                    hasError={errors?.address && true}
                    className={`resize-none `}
                    data-testid="address"
                  />
                </FormControl>
                <FormMessage data-testId="address_error" />
              </FormItem>
            )}
          />
          <DatePicker
            control={form.control}
            name="ehad_duration"
            label="Ehad duration"
          />

          <FormField
            control={form.control}
            name="shift"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Shift </Label>
                <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="flex-1" data-testid="shift">
                      <SelectValue placeholder={"select shift"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SHIFT_TIMING.map((shift) => (
                          <SelectItem key={shift.value} value={shift.value}>
                            {shift.time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage data-testId="shift_error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Role</Label>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="flex-1" data-testid="role">
                      <SelectValue placeholder="select role" />
                    </SelectTrigger>
                    <SelectContent data-testid="role">
                      <SelectGroup data-testid="select">
                        {USER_ROLES.map((user) => (
                          <SelectItem
                            data-testid="role-option"
                            className="flex-1"
                            key={user.value}
                            value={user.value}
                          >
                            {user.role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage data-testid="role_error" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            data-testid="submit"
            disabled={!member && !form.formState.isValid}
          >
            {params?.id ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
