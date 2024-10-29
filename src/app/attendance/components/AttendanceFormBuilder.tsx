import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { User } from "@/types";
import { MemberRole, UserStatus } from "@/lib/routes";
const attendanceSchema = z
  .object({
    memberId: z.number({
      required_error: 'Please select user name',
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
      message: "End time must be later than start time",
      path: ["endTime"],
    }
  );

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

const loginUser: User = {
  id: 1,
  name: "Alice Johnson",
  shift: "A",
  role: "incharge",
  status: "active",
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      memberId: loginUser.role === MemberRole.Member ? loginUser.id : undefined,
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.showPicker();
  };

  const roleBaseMembers = useMemo(() => {
    return members
      .filter(
        (member) =>
          member.status === UserStatus.Active &&
          (loginUser.role === MemberRole.Incharge ||
            member.shift === loginUser.shift)
      )
      .map(({ id, name }) => ({
        id,
        name,
      }));
  }, []);

  const onSubmit = (values: AttendanceFormValues) => {
    console.log({ values });
    const payload = {
      ...values,
      // status: "pending", // we will add this status pending in the sever action
    };
  };

  const handleUserSelect = (value: string) => {
    const userId = Number(value);
    setValue("memberId", userId, { shouldValidate: true });
  };
  const getSelectedUserName = () => {
    if (loginUser.role === MemberRole.Member) {
      return loginUser.name;
    }
    const selectedMemberId = getValues("memberId");
    const selectedMember = roleBaseMembers.find(
      (member) => member.id === selectedMemberId
    );
    return selectedMember?.name;
  };

  return (
    <div className="max-w-lg mx-auto p-8 mt-10 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Attendance Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="user" className="text-sm font-medium">
            User name
          </label>
          <Select
            value={getValues("memberId")?.toString() || ""}
            onValueChange={handleUserSelect}
          >
            <SelectTrigger
              className={`mt-1 border rounded-md p-2 ${
                errors.memberId ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loginUser.role === "member"}
            >
              <SelectValue placeholder={"select a user"}>
                {getSelectedUserName()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {roleBaseMembers.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.memberId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.memberId.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-sm font-medium">
            Start Time
          </label>
          <Input
            type="time"
            id="startTime"
            {...register("startTime")}
            className={`mt-1 border rounded-md p-2 ${
              errors.startTime ? "border-red-500" : "border-gray-300"
            }`}
            onClick={handleClick}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-sm font-medium">
            End Time
          </label>
          <Input
            type="time"
            id="endTime"
            {...register("endTime")}
            className={`mt-1 border rounded-md p-2 ${
              errors.endTime ? "border-red-500" : "border-gray-300"
            }`}
            onClick={handleClick}
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endTime.message}
            </p>
          )}
        </div>

        <Button type="submit" className="text-white rounded-md p-3 transition">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AttendanceFormBuilder;
