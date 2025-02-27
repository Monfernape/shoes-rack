"use client";

import React, { useTransition } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { MemberSelector } from "@/common/MemberSelector/MemberSelector";
import { addFunds } from "../actions/add-funds";
import { updateFundDetails } from "../actions/update-fund-details";
import { FundType, User } from "@/types";
import { DataSpinner } from "@/common/Loader/Loader";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

export const FundSchema = z.object({
  memberId: z.string().min(1, {
    message: "Name is required.",
  }),
  amount: z
    .string()
    .min(1, {
      message: "Amount is required.",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Please enter a number.",
    })
    .refine((value) => Number(value) > 0, {
      message: "Amount must be greater than the zero",
    }),
});

export type FundSchemaType = z.infer<typeof FundSchema>;

interface Props {
  funds?: FundType;
  loginUser: User;
}

export const FundFormBuilder = ({ funds, loginUser }: Props) => {
  const [isPending, startTransition] = useTransition();
 
  const form = useForm<FundSchemaType>({
    resolver: zodResolver(FundSchema),
    defaultValues: {
      memberId: funds?.memberId.toString() ?? "",
      amount: funds?.amount ?? "",
    },
    mode: "all",
  });

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: FundSchemaType) => {
    startTransition(async () => {
      if (!funds?.id) {
        const result = await addFunds(values);
        if (result.error) {
          toast({
            variant:'destructive',
            title: result.error,
            description: "Try again",
          });
        } else {
          toast({
            title: "Success",
            description: "Fund added successfully",
          });
        }
      } else {
        const result = await updateFundDetails(funds?.id, values);
        if (result?.error) {
          toast({
            title: result.error,
          });
        } else {
          toast({
            title: "Success",
            description: "Fund updated successfully",
          });
          router.push(Routes.Fund);
        }
      }
    });
  };
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
                    value={field.value.toString()}
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
            name={"amount"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Amount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="text-xs w-24">
              <div className="flex justify-center">
                {isPending ? (
                  <DataSpinner size="xs" isInputLoader />
                ) : funds?.id ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
