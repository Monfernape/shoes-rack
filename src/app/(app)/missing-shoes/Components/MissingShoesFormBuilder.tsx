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
import { FormTitle } from "@/common/FormTitle/FormTitle";
import { Input } from "@/components/ui/input";
import { useMask } from "@react-input/mask";
import { DateTimePicker } from "@/common/DateTimePicker/DateTimePicker";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { ShoesTyes } from "@/constant/constant";
import { Textarea } from "@/components/ui/textarea";

export const missingShoesSchema = z.object({
  color: z.string().min(1, {
    message: "Color must be required.",
  }),
  type: z.enum([
    ShoesTyes.Boots,
    ShoesTyes.DressShoes,
    ShoesTyes.Sandals,
    ShoesTyes.Sneakers,
    ShoesTyes.Formal,
    ShoesTyes.Other,
  ]),
  size: z.string().refine(
    (val) => {
      const sizeNumber = parseFloat(val);
      return !isNaN(sizeNumber) && sizeNumber >= 1 && sizeNumber <= 50;
    },
    {
      message: "Size must be a number between 1 and 50.",
    }
  ),
  time: z.date().refine((val) => val.getTime() <= new Date().getTime(), {
    message: "The time cannot be in the future.",
  }),
  ownerName: z.string().min(1, {
    message: "Owner's name is required.",
  }),
  ownerPhoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  ownerAddress: z.string().min(1, {
    message: "The owner address  must be required.",
  }),
});

export type MissingSchemaType = z.infer<typeof missingShoesSchema>;

export const MissingShoesFormBuilder = () => {
  const phoneNumberMask = useMask({
    mask: "___________",
    replacement: { _: /\d/ },
  });

  const form = useForm<MissingSchemaType>({
    resolver: zodResolver(missingShoesSchema),
    defaultValues: {
      color: "",
      type: ShoesTyes.Formal,
      size: "",
      time: undefined,
      ownerName: "",
      ownerPhoneNumber: "",
      ownerAddress: "",
    },
    mode: "all",
  });

  const SHOES_TYPES = [
    ShoesTyes.Boots,
    ShoesTyes.DressShoes,
    ShoesTyes.Sandals,
    ShoesTyes.Sneakers,
    ShoesTyes.Formal,
    ShoesTyes.Other,
  ];

  const {
    formState: { errors, isValid },
  } = form;

  function onSubmit(values: z.infer<typeof missingShoesSchema>) {
    return values;
  }
  return (
    <FormWrapper>
      <FormTitle
        title="Report Missing Shoe"
      />
      <Form {...form}>
        <form
          data-testid="leaveRequestForm"
          action={() => form.handleSubmit(onSubmit)()}
          className="space-y-4"
        >
            <FormField
              control={form.control}
              name={"color"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Red, Blue, Black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shoes Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger data-testid="leave-type" id="type">
                        <SelectValue placeholder="Select shoe type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SHOES_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
              name={"size"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 42, 8.5, 9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"time"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Lost</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      time={field.value}
                      onChangeTime={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Name"
                    {...field}
                    data-testid="name"
                    name="name"
                    hasError={errors?.ownerName && true}
                  />
                </FormControl>
                <FormMessage data-testid="name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerPhoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Owner Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0300-0000000"
                    {...field}
                    ref={phoneNumberMask}
                    hasError={errors?.ownerPhoneNumber && true}
                  />
                </FormControl>
                <FormMessage data-testid="phone_error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Owner Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Address"
                    data-testid="leaveReason"
                    hasError={Boolean(errors.ownerAddress)}
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
              disabled={!isValid}
              className="text-xs"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
