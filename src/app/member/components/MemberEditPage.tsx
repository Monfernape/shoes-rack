"use client";
import React from "react";
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
import { z } from "zod";
import { addDays, format } from "date-fns";
import { User, UserRole } from "@/constant/constant";
import { onSubmit } from "./memberActions";
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

const phoneValidator =
  /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{2})((-?)|( ?))([0-9]{7})$/gm;
const cnicValidator =
  /^(3)([0-9]{1})([0-9]{3})((-?)|( ?))([0-9]{7})((-?)|( ?))([0-9]{1})$/gm;

export const formSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, "Name should have at least 3 characters"),
  phone: z
    .string({ message: "Phone is required" })
    .regex(phoneValidator, "phone number is not valid"),
  date_of_birth: z.coerce
    .date()
    .min(
      new Date("01-01-1990"),
      "You can not suitable for this job because your are over age"
    )
    .max(
      new Date(),
      "You can not suitable for this job because your are under age"
    ),
  cnic: z.string().regex(cnicValidator, "CNIC is not valid"),
  // shift: z.nativeEnum(ShiftTiming, {
  //   errorMap: () => {
  //     return { message: "Please select your user type" };
  //   },
  // }),
  // address: z
  //   .string({ message: "Address is required" })
  //   .min(10, "Name should have at least 10 characters"),
  role: z.nativeEnum(UserRole, {
    errorMap: () => {
      return { message: "Please select your user type" };
    },
  }),
  // ehad_start_date: z
  //   .date()
  //   .min(addDays(new Date(), 30), "Minmum Ehad Duration is one Month"),
});

export const MemberEditPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      date_of_birth: new Date(),
      cnic: "",
      // shift: undefined,
      // address: "",
      role: undefined,
      // ehad_start_date: new Date(),
    },
    mode: "onBlur",
  });
  const handleSubmittion = async (values: z.infer<typeof formSchema>) => {
    // const data = await onSubmit(values);
    // if (data) {
    //   console.log("Data received", data);
    // }
    console.log("values", values);
    formSchema.parse(values);
    form.reset();
  };
  const {
    formState: { errors },
  } = form;
  return (
    <FormWrapper>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmittion(form.getValues());
          }}
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

                <Input
                  placeholder="Enter Your Name"
                  {...field}
                  data-testid="name"
                  name="name"
                  className={
                    errors?.name &&
                    "border-red-500 border focus-visible:ring-0 "
                  }
                />

                <FormMessage data-testid="name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Phone number</Label>
                <FormControl>
                  <Input
                    placeholder="0300-0000000"
                    {...field}
                    data-testid="phone"
                    className={
                      errors?.phone &&
                      "border-red-500 border focus-visible:ring-0 "
                    }
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
                    className={
                      errors?.cnic &&
                      "border-red-500 border focus-visible:ring-0 "
                    }
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      data-testid="date_of_birth"
                      variant={"outline"}
                      className={cn(
                        `justify-start text-left font-normal
                        ${!field.value} && "text-muted-foreground
                        ${
                          errors?.date_of_birth &&
                          "border-red-500 border focus-visible:ring-0"
                        } 
                        `
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto w-3.5 h-3.5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      data-testid="calender"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage data-testId="date_of_birth_error" />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Address</Label>
                <FormControl>
                  <Textarea
                    placeholder="Enter Your Address"
                    {...field}
                    className={`resize-none ${
                      errors?.address &&
                      "border-red-500 border focus-visible:ring-0"
                    } `}
                    data-testid="address"
                  />
                </FormControl>
                <FormMessage data-testId="address_error" />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="ehad_start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <Label>Ehad duration</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      data-testid="ehad_start_date"
                      variant={"outline"}
                      className={cn(
                        `justify-start text-left font-normal
                        ${!field.value} && "text-muted-foreground
                        ${
                          errors?.ehad_start_date &&
                          "border-red-500 border focus-visible:ring-0"
                        } 
                        `
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto w-3.5 h-3.5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage data-testId="ehad_duration_error" />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="shift"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label>Shift </Label>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    data-testid="shift"
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {Duties.map((shift) => (
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
          /> */}

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
                        <SelectLabel>Role</SelectLabel>
                        {User.map((user) => (
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

          <Button type="submit" data-testId="submit">
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
