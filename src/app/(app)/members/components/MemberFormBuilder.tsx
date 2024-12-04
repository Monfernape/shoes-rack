"use client";
import React, { useEffect } from "react";
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
import { addDays, format } from "date-fns";
import { MemberRole, Shift } from "@/constant/constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CNIC_VALIDATOR_REGEX, PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "../actions/createUser";
import { updateUser } from "../actions/update-user";
import { Member } from "@/types";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import FormWrapper from "@/common/FormWrapper";
import { localNumberFormat } from "@/utils/formattedPhoneNumber";
import { useUser } from "@/hooks/useGetLoggedinUser";

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
    shift: Shift.ShiftA,
  },
  {
    time: "Shift 00:06am to 00:12pm",
    shift: Shift.ShiftB,
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    shift: Shift.ShiftC,
  },
  {
    time: "Shift 00:06pm to 00:12am",
    shift: Shift.ShiftD,
  },
];

export const userBuilderSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  date_of_birth: z.date().max(new Date(Date.now()), "under age"),
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
  ehad_duration: z
    .date()
    .min(addDays(new Date(), 30), "Minmum Ehad Duration is one Month"),
});
type MemberFormBuilder = {
  member?: Member;
  user : Member
};
export const MemberFormBuilder = ({ member,user }: MemberFormBuilder) => {
  const { toast } = useToast();

  const phoneNumberMask = useMask({
    mask: "___________",
    replacement: { _: /\d/ },
  });
  const cnicMask = useMask({
    mask: "3____-_______-_",
    replacement: { _: /\d/ },
  });
  const showShiftTime = (user: Member) => {
   
    if (member) return member.shift;
    if (user?.role === MemberRole.ShiftIncharge) {
      const shift = SHIFT_TIMING.find((member) => {

        return member.shift === user?.shift;
      });
      return shift?.shift;
    }
    if(user?.role === MemberRole.Incharge) {
      return Shift.ShiftA
    }
  };

  const shiftTiming = showShiftTime(user);

  const formattedPhoneNumber = localNumberFormat(member?.phoneNumber);
  const form = useForm<UserBuilder>({
    resolver: zodResolver(userBuilderSchema),
    defaultValues: {
      name: member?.name ?? "",
      phoneNumber: formattedPhoneNumber ?? "",
      date_of_birth: member ? new Date(member?.date_of_birth) : undefined,
      cnic: member?.cnic ?? "",
      shift: shiftTiming ,
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
                <FormMessage data-testid="phone_error" />
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
                <FormMessage data-testid="cnic_error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <Label>Date of birth</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          data-testid="date_of_birth"
                          variant={"outline"}
                          className={cn(
                            `justify-start text-left font-normal
                        ${field.value} && "text-muted-foreground
                        ${
                          errors?.date_of_birth &&
                          "border-red-500 border focus-visible:ring-0"
                        }
                          `
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto w-3.5 h-3.5" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      data-testid="calender"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage data-testid="date_of_birth_error" />
                </FormItem>
              );
            }}
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
                <FormMessage data-testid="address_error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ehad_duration"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <Label>Ehad duration</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        data-testid="ehad_duration"
                        variant={"outline"}
                        className={cn(
                          `justify-start text-left font-normal text-xs
                          ${field.value} && "text-muted-foreground
                          ${
                            errors?.ehad_duration &&
                            "border-red-500 border focus-visible:ring-0"
                          }
                           `
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto w-3.5 h-3.5" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    data-testid="ehad_calender"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage data-testid="ehad_duration_error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shift"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Shift </Label>
                <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger
                      className="flex-1"
                      data-testid="shift"
                      disabled={user?.role === MemberRole.ShiftIncharge && true}
                    >
                      <SelectValue placeholder={"select shift"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SHIFT_TIMING.map((shift) => (
                          <SelectItem key={shift.shift} value={shift.shift}>
                            {shift.time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage data-testid="shift_error" />
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
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
