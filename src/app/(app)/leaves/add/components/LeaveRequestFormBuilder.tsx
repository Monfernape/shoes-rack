"use client";

import React from "react";
import FormWrapper from "@/common/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { LeaveTypes } from "@/constant/constant";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";
import { DatePickerWithRange } from "@/common/DateRangePicker/DateRangePicker";
import { createLeaveRequest } from "../../actions/createLeaveRequest";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { updateLeaveRequest } from "../../actions/updated-leave-request";
import { startOfDay } from "date-fns";
import { Routes } from "@/lib/routes";
import { LeaveRequestsTypes, User } from "@/types";

export const leaveRequestSchema = z.object({
  memberId: z.string().min(1, {
    message: "Member must be selected.",
  }),
  leaveType: z.enum([
    LeaveTypes.Personal,
    LeaveTypes.Sick,
    LeaveTypes.Vacation,
  ]),
  date: z.object({
    from: z
      .date({
        message: "Date range must be selected.",
      })
      .refine((date) => date >= startOfDay(new Date()), {
        message: "Start Date must be today or in the future.",
      }),
    to: z.date({
      message: "End Date must be selected.",
    }),
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

interface LeaveRequest extends LeaveRequestsTypes {
  created_at: string;
}
interface LeaveRequestFormBuilderProps {
  leaves?: LeaveRequest;
  loginUser?: User;
}

export const LeaveRequestFormBuilder = ({
  leaves,
  loginUser,
}: LeaveRequestFormBuilderProps) => {
  const { id: leaveId } = useParams<{ id: string }>();
  const router = useRouter();
  const form = useForm<leaveRequestSchemaType>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      memberId:
        loginUser?.role !== "member"
          ? leaves?.memberId?.toString() ?? ""
          : loginUser.id?.toString(),
      leaveType: leaves?.leaveType ?? LeaveTypes.Personal,
      date: {
        from: leaves?.startDate ? new Date(leaves?.startDate) : undefined,
        to: leaves?.endDate ? new Date(leaves?.endDate) : undefined,
      },
      reason: leaves?.reason ?? "",
    },
    mode: "all",
  });

  const {
    formState: { errors, isValid },
  } = form;

  function onSubmit(values: z.infer<typeof leaveRequestSchema>) {
    try {
      if (!leaveId) {
        createLeaveRequest(values);
        toast({
          title: "Success",
          description: "Leave request created successfully",
        });
      } else {
        updateLeaveRequest(Number(leaveId), values);
        toast({
          title: "Success",
          description: "Leave request updated successfully",
        });
      }
      router.push(Routes.LeaveRequest);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: "Something went wrong! Please try again.",
        });
      }
    }
  }
  return (
    <FormWrapper>
      <FormTitle title="Request Leave" />
      <Form {...form}>
        <form
          data-testid="leaveRequestForm"
          action={form.handleSubmit(onSubmit) as unknown as string}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name={"memberId"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <MemberSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    loginUser={loginUser}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name={"date"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
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
              // disabled={!isValid}
              className="text-xs"
            >
              {leaveId ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
