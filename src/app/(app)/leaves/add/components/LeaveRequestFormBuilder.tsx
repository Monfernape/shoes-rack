"use client";

import React, { useTransition } from "react";
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
import { Routes } from "@/lib/routes";
import { LeaveRequestsTypes, User } from "@/types";
import { DataSpinner } from "@/common/Loader/Loader";

export const leaveRequestSchema = z.object({
  memberId: z.string().min(1, {
    message: "Member must be selected.",
  }),
  leaveType: z.enum([
    LeaveTypes.Personal,
    LeaveTypes.Sick,
    LeaveTypes.Vacation,
  ]),
  date: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.to) {
          return data.from <= data.to;
        }
        return true;
      },
      {
        message: "The start date must be less than or equal to the end date.",
      }
    ),
  reason: z
    .string()
    .min(1, {
      message: "Please provide a reason for leave.",
    })
    .min(10, {
      message: "Reason must be at least 10 characters long.",
    })
    .max(200,{
      message: "Reason must be under 200 characters"
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
  const [isPending, startTransition] = useTransition();
  const form = useForm<leaveRequestSchemaType>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      memberId:
        loginUser?.role !== "member"
          ? leaves?.memberId?.toString() ?? ""
          : loginUser.id?.toString(),
      leaveType: leaves?.leaveType ?? LeaveTypes.Personal,
      date: {
        from: leaves?.startDate ? new Date(leaves?.startDate) : new Date(),
        to: leaves?.endDate ? new Date(leaves?.endDate) : new Date(),
      },
      reason: leaves?.reason ?? "",
    },
    mode: "all",
  });

  const {
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof leaveRequestSchema>) {
    startTransition(async () => {
        if (!leaveId) {
          const result = await createLeaveRequest(values);
          if(result?.error){
            toast({
              title: result.error,
              description: "Try again",
            });
          }else{
            toast({
              title: "Success",
              description: "Leave request created successfully",
            });
          }
        } else {
          const result = await updateLeaveRequest(Number(leaveId), values,loginUser);
          if(result?.error){
            toast({
              variant:'destructive',
              title: result.error,
            });
          }else{
            toast({
              title: "Success",
              description: "Leave request updated successfully",
            });
            router.push(Routes.LeaveRequest);
          }
        }
    });
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
                    className={`focus-visible:ring-0`}
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
              disabled={isPending}
              className="text-xs w-24"
            >
              <div className="flex justify-center">
                {isPending ? (
                  <DataSpinner size="xs" isInputLoader />
                ) : leaveId ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
