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
import { useEffect } from "react";
import { createAttendance } from "../actions/create-attendance";
import { toast } from "@/hooks/use-toast";
import FormWrapper from "@/common/FormWrapper";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";
import { User } from "@/types";
import { MemberRole, UserStatus } from "@/constant/constant";
import { getAttendanceById } from "../actions/getAttendanceById";
import { useParams } from "next/navigation";
import { updateAttendance } from "../actions/updateAttendance";

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
  
  const params = useParams();
  const attendanceId = params?.id;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (attendanceId) {
          const response = await getAttendanceById(Number(attendanceId));

          if (response) {
            const { memberId, startTime, endTime } = response.data;
            form.reset({
              memberId: memberId.toString(),
              startTime,
              endTime,
            });
          } else {
            toast({
              title: "Attendance not found",
              description: "No data found for this ID",
            });
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error fetching attendance",
            description: "No data found for this ID",
          });
        }
      }
    };

    fetchAttendance();
  }, [attendanceId, form]);

  const onSubmit = async (values: AttendanceFormValues) => {
    const updatedValue = {...values ,attendanceId }
    try {
      if (attendanceId) {
        const updatedResult = await updateAttendance( updatedValue);

        if (updatedResult) {
          toast({
            title: "Attendance updated successfully",
            description: "The attendance record has been updated.",
          });
        }
      } else {
        const result = await createAttendance(values);
        if (result) {
          toast({
            title: "Attendance submitted successfully",
            description: "You will receive a message shortly.",
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Attendance could not be marked",
        });
      }

      return;
    }
  };
  return (
    <FormWrapper>
      <Form {...form}>
        <form
          action={() => form.handleSubmit(onSubmit)()}
          className="max-w-lg mx-auto p-8 mt-10 bg-white shadow-md rounded-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Attendance Form
          </h1>

          {/* This selector is used to select members based on the role of the logged-in user. */}
          <MemberSelector control={form.control} name="memberId" />

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
            className="w-full text-white rounded-md p-3 transition"
            disabled={!form.formState.isValid}
          >
            {attendanceId ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
export default AttendanceFormBuilder;
