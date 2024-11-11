"use client";
import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MembersProps } from "@/types";
import { LeaveTypes } from "@/constant/constant";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";

export const leaveRequestSchema = z
  .object({
    memberId: z.string().min(1, {
      message: "Member must be selected.",
    }),
    leaveType: z.string().min(1, {
      message: "Leave Type must be selected.",
    }),
    startDate: z
      .date({
        message: "Start Date must be selected.",
      })
      .refine((date) => date >= new Date(), {
        message:
          "Start date must be greater than or equal to the current date.",
      }),
    endDate: z
      .date({
        message: "End Date must be selected.",
      })
      .refine((date) => date >= new Date(), {
        message: "End date must be greater than or equal to the current date.",
      }),
    reasonForLeave: z.string().min(10, {
      message: "Please provide a reason for leave.",
    }),
    status: z.string().min(1, {
      message: "Status must be selected.",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

export const LeaveRequestFormBuilder = ({
  members,
}: {
  members: MembersProps;
}) => {
  const { data } = members;
  const form = useForm<z.infer<typeof leaveRequestSchema>>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      memberId: "",
      leaveType: "",
      startDate: undefined,
      endDate: undefined,
      reasonForLeave: "",
      status: "Pending",
    },
    mode: "all",
  });

  const { errors, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof leaveRequestSchema>) {
    console.log(values);
  }
  return (
    <FormWrapper>
      <h1 className="text-sm text-sm font-semibold text-gray-800 my-4">
        Request Leave
      </h1>
      <Form {...form}>
        <form
          data-testid="form"
          onSubmit={form.handleSubmit(onSubmit)}
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
                      <SelectItem value={LeaveTypes.Personal}>
                        {LeaveTypes.Personal}
                      </SelectItem>
                      <SelectItem value={LeaveTypes.Sick}>
                        {LeaveTypes.Sick}
                      </SelectItem>
                      <SelectItem value={LeaveTypes.Vacation}>
                        {LeaveTypes.Vacation}
                      </SelectItem>
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
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        data-testid="calendarButton"
                        className={cn(
                          `pl-3 text-left font-normal ${
                            errors.startDate
                              ? "border-destructive"
                              : "border-input"
                          }`,
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-xs">Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        data-testid="calendar-end-date-button"
                        variant={"outline"}
                        className={cn(
                          `pl-3 text-left font-normal ${
                            errors.endDate
                              ? "border-destructive"
                              : "border-input"
                          }`,
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-xs">Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    data-testid="popover"
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      data-testid="calendar"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reasonForLeave"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Leave</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide a brief description of your leave reason."
                    data-testid="leaveReason"
                    hasError={Boolean(errors.reasonForLeave)}
                    className={`resize-none focus-visible:ring-0`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
          <Button data-testid="submitButton" type="submit" disabled={!isValid} className="text-xs">
            Submit
          </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
