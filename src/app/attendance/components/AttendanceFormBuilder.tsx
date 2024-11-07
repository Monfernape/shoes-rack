"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createAttendance } from "../actions/create-attendance";
import { MemberRole, User, UserStatus } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import FormWrapper from "@/common/FormWrapper";

const attendanceSchema = z
  .object({
    memberId: z.number({
      required_error: "Please select a user",
    }),
    startTime: z.string().min(1,{ message: "Start time is required" }),
    endTime: z.string().min(1,{ message: "End time is required" }),
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

const members = [
  { id: 123, name: "John Doe", role: "member", shift: "A", status: "active" },
  {
    id: 1,
    name: "Alice Johnson",
    shift: "A",
    role: "incharge",
    status: "active",
  },
  { id: 2, name: "Bob Smith", shift: "B", role: "member", status: "invited" },
  {
    id: 3,
    name: "Charlie Brown",
    shift: "C",
    role: "shift-incharge",
    status: "active",
  },
  { id: 4, name: "Diana Prince", shift: "D", role: "member", status: "active" },
  {
    id: 5,
    name: "Ethan Hunt",
    shift: "A",
    role: "incharge",
    status: "invited",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    shift: "B",
    role: "member",
    status: "active",
  },
  {
    id: 7,
    name: "George Banks",
    shift: "B",
    role: "shift-incharge",
    status: "active",
  },
  {
    id: 8,
    name: "Hannah Baker",
    shift: "B",
    role: "member",
    status: "invited",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    shift: "C",
    role: "incharge",
    status: "active",
  },
  {
    id: 10,
    name: "Jack Sparrow",
    shift: "C",
    role: "member",
    status: "active",
  },
  {
    id: 11,
    name: "Kara Danvers",
    shift: "D",
    role: "shift-incharge",
    status: "invited",
  },
];

const AttendanceFormBuilder = () => {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      memberId: loginUser.role === MemberRole.Member ? loginUser.id : undefined,
      startTime: "",
      endTime: "",
    },
  });

  // Create a list of users based on their roles:
  // Incharge can make attendance for every user.
  // Shift incharge can mark attendance for it's shift's users.
  // Members can only mark their attdencane

  const roleBaseMembers = useMemo(() => {
    return members
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          (loginUser.role === MemberRole.Incharge || member.shift === loginUser.shift)
      )
      .map(({ id, name }) => ({
        id: id.toString(), 
        name,
      }));
  }, [members]);

  const handleUserSelect = (memberId:string) => {
    form.setValue("memberId", Number(memberId), { shouldValidate: true });
  };

  const onSubmit = async (values: AttendanceFormValues) => {
    const payload = {
      ...values,
      memberId: Number(values.memberId), 
    };
    try {
      const result = await createAttendance(payload);
      if (!result) {
        toast({
          title: "Attendance submit successfully",
          description: "You will receive message shortly",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Attendance could not be marked",
      });
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

          <FormField
            control={form.control}
            name="memberId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString() || ""}
                    onValueChange={handleUserSelect}
                    disabled={loginUser.role === "member"}
                  >
                    <SelectTrigger
                      data-testId="memberId"
                      className={`border rounded-md p-2 ${
                        form.formState.errors.memberId
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <SelectValue data-testId="select" placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleBaseMembers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
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
          >
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default AttendanceFormBuilder;
