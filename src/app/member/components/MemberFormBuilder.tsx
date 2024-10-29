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
import { addDays, format } from "date-fns";
import { SHIFT, UserRole } from "@/constant/constant";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import FormWrapper from "../../../common/FormWrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CNIC_VALIDATOR_REGEX,
  PHONENUMBER_VALIDATOR_REGEX,
} from "../../../../regex";
import { createUser } from "../actions/createUserAction";
import { UserFormSchema } from "@/types";

const USER_ROLES = [
  {
    role: "Member",
    value: UserRole.Member,
  },
  {
    role: "Incharge",
    value: UserRole.Incharge,
  },
  {
    role: "Shift Incharge",
    value: UserRole.ShiftIncharge,
  },
];

const DUTIES = [
  {
    time: "Shift 12:00am to 00:06am",
    value: SHIFT.ShiftA,
  },
  {
    time: "Shift 00:06am to 00:12pm",
    value: SHIFT.ShiftB,
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    value: SHIFT.ShiftC,
  },
  {
    time: "Shift 00:06pm to 00:12am",
    value: SHIFT.ShiftD,
  },
];

export const userBuilderSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z
    .string({ message: "Phone is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  date_of_birth: z.coerce
    .date()
    .max(new Date(Date.now() - 16 * 365 * 24 * 60 * 60 * 1000), "under age"),
  cnic: z.string().regex(CNIC_VALIDATOR_REGEX, "CNIC is not valid"),
  shift: z.enum(["shift_a", "shift_b", "shift_c", "shift_d"], {
    errorMap: () => {
      return { message: "Select shift timing " };
    },
  }),
  address: z
    .string({ message: "Address is required" })
    .min(10, "Address should have at least 10 characters"),
  role: z.enum(["member", "incharge", "shift_incharge"], {
    errorMap: () => {
      return { message: "Select user role" };
    },
  }),
  ehad_start_date: z
    .date()
    .min(addDays(new Date(), 30), "Minmum Ehad Duration is one Month"),
});

export const MemberFormBuilder = () => {
  const form = useForm<z.infer<typeof userBuilderSchema>>({
    resolver: zodResolver(userBuilderSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      date_of_birth: new Date(),
      cnic: "",
      shift: undefined,
      address: "",
      role: undefined,
      ehad_start_date: new Date(),
    },
    mode: "onBlur",
  });

  const phoneNumberMask = useMask({
    mask: "03__-_______",
    replacement: { _: /\d/ },
  });
  const cnicMask = useMask({
    mask: "3____-_______-_",
    replacement: { _: /\d/ },
  });

  const handleSubmittion = async (
    values: z.infer<typeof userBuilderSchema>
  ) => {
    createUser(values);
  };
  const {
    formState: { errors },
  } = form;
  return (
    <FormWrapper>
      <Form {...form}>
        <form
          action={form.handleSubmit(handleSubmittion)}
          // onSubmit={form.handleSubmit(handleSubmittion)}
          className="space-y-4"
          data-testid="form-valid"
        >
          <h4 className="text-xl text-black text-bold">Information</h4>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Name</Label>

                <Input
                  placeholder="Enter Name"
                  {...field}
                  data-testid="name"
                  name="name"
                  className={
                    errors?.name &&
                    "border-red-500 border focus-visible:ring-0 "
                  }
                />

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
                    className={
                      errors?.phoneNumber &&
                      "border-red-500 border focus-visible:ring-0 "
                    }
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
                    className={
                      errors?.cnic &&
                      "border-red-500 border focus-visible:ring-0 "
                    }
                  />
                </FormControl>
                <FormMessage data-testId="cnic_error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Date of birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      data-testid="date_of_birth"
                      variant={"outline"}
                      className={cn(
                        `justify-start text-left font-normal
                        ${!field.value} && "text-muted-foreground
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
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      data-testid="calender"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage data-testId="date_of_birth_error" />
              </FormItem>
            )}
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
                    className={`resize-none ${
                      errors?.address &&
                      "border-red-500 border focus-visible:ring-0"
                    } `}
                    data-testid="address"
                  />
                </FormControl>
                <FormMessage data-testId="address_error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ehad_start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <Label>Ehad duration</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      data-testid="ehad_start_date"
                      variant={"outline"}
                      className={cn(
                        `justify-start text-left font-normal
                        ${!field.value} && "text-muted-foreground
                        ${
                          errors?.ehad_start_date &&
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
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage data-testId="ehad_duration_error" />
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
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    data-testid="shift"
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {DUTIES.map((shift) => (
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
                        <SelectLabel>Role</SelectLabel>
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

          <Button type="submit" data-testId="submit">
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
