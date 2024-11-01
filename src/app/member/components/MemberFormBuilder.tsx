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
import { nullable, z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { DateSelection } from "../../../common/DateSelection";
import { useRouter } from "next/navigation";

export type UserBuilder = z.infer<typeof userBuilderSchema>;

const USER_ROLES = [
  {
    role: "Member",
    value: UserRole.Member,
  },

  {
    role: "Shift Incharge",
    value: UserRole.ShiftIncharge,
  },
  {
    role: "Incharge",
    value: UserRole.Incharge,
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
  date_of_birth: z.date().max(new Date(Date.now()), "under age"),
  cnic: z.string().regex(CNIC_VALIDATOR_REGEX, "CNIC is not valid"),
  shift: z.enum(["A", "B", "C", "D"], {
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
  const { toast } = useToast();
  const router = useRouter();
  const phoneNumberMask = useMask({
    mask: "03__-_______",
    replacement: { _: /\d/ },
  });
  const cnicMask = useMask({
    mask: "3____-_______-_",
    replacement: { _: /\d/ },
  });

  const form = useForm<UserBuilder>({
    resolver: zodResolver(userBuilderSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      date_of_birth: undefined,
      cnic: "",
      shift: "A",
      address: "",
      role: "member",
      ehad_start_date: new Date(),
    },
    mode: "onBlur",
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmition = async (values: z.infer<typeof userBuilderSchema>) => {
    const result = await createUser(values);
    toast({
      title: result.title,
      description: result.message,
    });
    form.reset();

    router.refresh();
    console.log("User", form.getValues());
  };

  return (
    <FormWrapper>
      <Form {...form}>
        <form
          action={() => form.handleSubmit(handleSubmition)()}
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
                <FormControl>
                  <Input
                    placeholder="Enter Name"
                    {...field}
                    data-testid="name"
                    name="name"
                    inputError={errors?.name && true}
                  />
                </FormControl>
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
                    inputError={errors?.phoneNumber && true}
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
                    inputError={errors?.cnic && true}
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
                <DateSelection
                  onChange={field.onChange}
                  value={field.value}
                  error={errors.date_of_birth}
                />
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
                    inputError={errors?.address && true}
                    className={`resize-none `}
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
                <DateSelection
                  onChange={field.onChange}
                  value={field.value}
                  error={errors.ehad_start_date}
                />
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
                    onValueChange={field.onChange}
                    {...field}
                    form="form-valid"
                  >
                    <SelectTrigger className="flex-1" data-testid="shift">
                      <SelectValue
                        placeholder={
                          field.value === undefined ? "select shift" : null
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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

          <Button type="submit" data-testid="submit">
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
