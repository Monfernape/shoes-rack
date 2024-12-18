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
import { FormTitle } from "@/common/FormTitle/FormTitle";
import { Input } from "@/components/ui/input";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";

export const FundSchema = z.object({
  memberId: z.string().min(1, {
    message: "Name is required.",
  }),
  amount: z
    .string()
    .min(1, {
      message: "Amount is required.",
    })
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Amount must be a valid positive number.",
    }),
});

export type FundSchemaType = z.infer<typeof FundSchema>;

export const FundFormBuilder = () => {
  const form = useForm<FundSchemaType>({
    resolver: zodResolver(FundSchema),
    defaultValues: {
      memberId: "",
      amount: "",
    },
    mode: "all",
  });

  const { isValid } = form.formState;

  function onSubmit(values: z.infer<typeof FundSchema>) {
    return values;
  }
  return (
    <FormWrapper>
      <FormTitle title="Funds" />
      <Form {...form}>
        <form
          action={() => form.handleSubmit(onSubmit)()}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!isValid} className="text-xs">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
