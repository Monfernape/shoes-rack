"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addDays } from "date-fns";
import { Duties, ShiftTiming, UserRole, User } from "@/constant/constant";
import { onSubmit } from "../action";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar, CalendarIcon } from "lucide-react";

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
  date_of_birth: z
    .date()
    .min(
      new Date("01-01-1990"),
      "You can not suitable for this job because your are over age"
    )
    .max(
      new Date("2025-01-01"),
      "You can not suitable for this job because your are under age"
    ),
  cnic: z.string().regex(cnicValidator, "CNIC is not valid"),
  // shift: z.nativeEnum(ShiftTiming),
  address: z
    .string({ message: "Name is required" })
    .min(10, "Name should have at least 10 characters"),
  // role: z.nativeEnum(UserRole),
  ehad_start_date: z
    .date()
    .min(new Date(), "Start Date must be today or later"),
});

export const UserForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      date_of_birth: undefined,
      cnic: "",
      // shift: ShiftTiming.ShiftA,
      address: "",
      // role: UserRole.Member,
      ehad_start_date: new Date(),
    },
  });
  const handleSubmittion = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmittion)}
        className="space-y-3 p-4 mx-auto w-2/4 bg-white"
      >
        <h4 className="text-xl text-black text-bold">Personal Information </h4>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Name"
                  {...field}
                  v-model="user.search"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="0300-0000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cnic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNIC</FormLabel>
              <FormControl>
                <Input placeholder="30000-0000000-0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <div className="flex justify-between border rounded">
                <Input
                  aria-label="date_of_birth"
                  type="date"
                  {...field}
                  value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    field.onChange(new Date(e.target.value));
                  }}
                  min="1990-01-01"
                  max={format(new Date(), "yyyy-MM-dd")}
                />
                <div className="flex justify-center items-center p-2  hover:cursor-pointer">
                  <Calendar className="w-3.5 h-3.5 " />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Your Address"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h4 className="text-xl text-black text-bold">Information </h4>
        <div className="grid grid-cols-1  gap-3 ">
          <FormField
            control={form.control}
            name="ehad_start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Ehad Start Duration</FormLabel>
                <div className="flex justify-between border rounded hover:cursor-pointer">
                  <Input
                    aria-label="start_date"
                    type="month"
                    {...field}
                    value={field.value ? format(field.value, "yyyy-MM") : ""}
                    onChange={(e) => {
                      field.onChange(new Date(e.target.value));
                    }}
                    min={format(new Date(), "yyyy-MM")}
                  />
                  <div className="flex justify-center items-center mr-2 hover:cursor-pointer">
                    <Calendar className="w-3.5 h-3.5 " />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="shift"
            render={() => (
              <FormItem>
                <FormLabel>Shift </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="select shift " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {Duties.map((shift) => (
                          <SelectItem
                            aria-label="shift"
                            data-testid="shift"
                            key={shift.value}
                            value={shift.value}
                          >
                            {shift.time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            control={form.control}
            name="role"
            render={() => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {User.map((user) => (
                          <SelectItem
                            data-testid="select-option"
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
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
