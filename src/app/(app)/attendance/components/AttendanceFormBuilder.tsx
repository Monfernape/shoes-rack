"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import React, { useTransition } from "react";
import { createAttendance } from "../actions/create-attendance";
import { toast } from "@/hooks/use-toast";
import FormWrapper from "@/common/FormWrapper";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";
import { MemberRole } from "@/constant/constant";
import { updateAttendance } from "../actions/update-attendance";
import { useParams } from "next/navigation";
import { isValidParam } from "@/utils/utils";
import { User } from "@/types";
import { DataSpinner } from "@/common/Loader/Loader";

interface AttendanceFormBuilderProps {
  attendance?: AttendanceFormValues;
  loginUser?: User;
}

const attendanceSchema = z
  .object({
    memberId: z.string({
      required_error: "Please select a user",
    }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
  })
  .refine(
    (data) => {
      const startTime = new Date(`1970-01-01T${data.startTime}:00`);
      const endTime = new Date(`1970-01-01T${data.endTime}:00`);
      if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);
      const nextTwoHours = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
      return endTime <= nextTwoHours;
    },
    {
      message: "End time must be within 2 hours of start time",
      path: ["endTime"],
    }
  );
export type AttendanceFormValues = z.infer<typeof attendanceSchema>;

const AttendanceFormBuilder: React.FC<AttendanceFormBuilderProps> = ({
  attendance,
  loginUser,
}) => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const attendanceId = params?.id;
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      memberId:
        loginUser?.role === MemberRole.Member
          ? loginUser.id.toString()
          : attendance?.memberId.toString(),

      startTime: attendance?.startTime ?? "",
      endTime: attendance?.endTime || "",
    },
  });

  const onSubmit = async (values: AttendanceFormValues) => {
    if (isValidParam(attendanceId)) {
      const updatedValue = {
        id: attendanceId,
        ...values,
      };

      startTransition(async () => {
          if (attendance?.memberId) {
            const result = await updateAttendance(updatedValue);

            if (!result) {
              toast({
                title: "Attendance updated successfully",
                description: "The attendance record has been updated.",
              });
            }else{
              toast({
                title: result.error,
              });
            }
          } else {
            const error = await createAttendance(values);

            if (!error) {
              toast({
                title: "Attendance submitted successfully",
                description: "You will receive a message shortly.",
              });
            }
          }
      });
    }
    return;
  };

  return (
    <FormWrapper>
      <Form {...form}>
        <form
          action={form.handleSubmit(onSubmit) as unknown as string}
          className="max-w-lg mx-auto p-8 mt-10 bg-white shadow-md rounded-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Attendance Form
          </h1>

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
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onClick={(event) => event.currentTarget.showPicker()}
                    hasError={!!form.formState.errors.startTime}
                    data-testId="startTime"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onClick={(event) => event.currentTarget.showPicker()}
                    hasError={!!form.formState.errors.endTime}
                    data-testId="endTime"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" text-white rounded-md p-3 transition w-24 "
            disabled={isPending}
          >
            <div className="flex justify-center">
              {isPending ? (
                <DataSpinner size="xs" isInputLoader />
              ) : attendance?.memberId ? (
                "Update"
              ) : (
                "Submit"
              )}
            </div>
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
export default AttendanceFormBuilder;
