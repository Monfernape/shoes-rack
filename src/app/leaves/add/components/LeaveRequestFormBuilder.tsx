"use client";
import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LeaveTypes, UserRole, UserStatus } from "@/constant/constant";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/common/DateRangePicker/DateRangePicker";
import { User } from "@/types";
import { createLeaveRequest } from "../../actions/createLeaveRequest";
import { FormTitle } from "@/common/FormTitle/FormTitle";

export const leaveRequestSchema = z.object({
  memberId: z.string().min(1, {
    message: "Member must be selected.",
  }),
  leaveType: z.enum([
    LeaveTypes.Personal,
    LeaveTypes.Sick,
    LeaveTypes.Vacation,
  ]),
  startDate: z
    .date({
      message: "Date must be selected.",
    })
    .refine((date) => date >= startOfDay(new Date()), {
      message: "Start Date must be today or in the future.",
    }),
  endDate: z.date({
    message: "End Date must be selected.",
  }),
  reason: z.string().min(10, {
    message: "Please provide a reason for leave.",
  }),
});

export type leaveRequestSchemaType = z.infer<typeof leaveRequestSchema>;

const LEAVE_REQUEST_TYPES = [
  LeaveTypes.Personal,
  LeaveTypes.Sick,
  LeaveTypes.Vacation,
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

export const LeaveRequestFormBuilder = () => {
  const form = useForm<leaveRequestSchemaType>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      memberId:
        loginUser.role === UserRole.Member ? loginUser.id.toString() : "",
      leaveType: LeaveTypes.Personal,
      startDate: undefined,
      endDate: undefined,
      reason: "",
    },
    mode: "all",
  });

  const {
    formState: { errors, isValid },
    trigger,
    setValue,
  } = form;

  function onSubmit(values: z.infer<typeof leaveRequestSchema>) {
    createLeaveRequest(values);
  }

  const handleDateChange = (dateRange: DateRange | undefined) => {
    if (dateRange?.from && dateRange?.to) {
      setValue("startDate", dateRange.from);
      setValue("endDate", dateRange.to);
    }
    trigger();
  };
  return (
    <FormWrapper>
      <FormTitle title="Request Leave" />
      <Form {...form}>
        <form
          data-testid="leaveRequestForm"
          action={() => form.handleSubmit(onSubmit)()}
          className="space-y-4"
        >
          <MemberSelector control={form.control} name="memberId" />

          <FormField
            control={form.control}
            name="leaveType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave Type</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger data-testid="leave-type" id="leaveType">
                      <SelectValue placeholder="Select a leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEAVE_REQUEST_TYPES.map((leaveType) => (
                        <SelectItem key={leaveType} value={leaveType}>
                          {leaveType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={() => (
              <>
                <FormLabel>Date Range</FormLabel>
                <DatePickerWithRange handleChange={handleDateChange} />
                <FormMessage />
              </>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Leave</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide a brief description of your leave reason."
                    data-testid="leaveReason"
                    hasError={Boolean(errors.reason)}
                    className={`resize-none focus-visible:ring-0`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              data-testid="submitButton"
              type="submit"
              disabled={!isValid}
              className="text-xs"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
