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
import { MemberRole, User, UserStatus } from "@/lib/constants";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";

const attendanceSchema = z
  .object({
    memberId: z.string({
      required_error: "Please select a user",
    }),
    startTime: z.string().nonempty({ message: "Start time is required" }),
    endTime: z.string().nonempty({ message: "End time is required" }),
  })
  .refine(
    (data) => {
      const startTime = new Date(`1970-01-01T${data.startTime}:00`);
      let endTime = new Date(`1970-01-01T${data.endTime}:00`);
      if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);
      const nextTwoHours = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
      return endTime <= nextTwoHours;
    },
    {
      message: "End time must be after then start time",
      path: ["endTime"],
    }
  );

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

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

const AttendanceFormBuilder = () => {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      memberId:
        loginUser.role === MemberRole.Member
          ? loginUser.id.toString()
          : undefined,
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit = (values: AttendanceFormValues) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-8 mt-10 bg-white shadow-md rounded-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Attendance Form</h1>
        
        {/* This selector is used to select members based on the role of the logged-in user. */}
        <MemberSelector
          control={form.control}
          name="memberId"
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
                  className={`border rounded-md p-2 ${
                    form.formState.errors.startTime
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                  className={`border rounded-md p-2 ${
                    form.formState.errors.endTime
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-white rounded-md p-3 transition"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AttendanceFormBuilder;
