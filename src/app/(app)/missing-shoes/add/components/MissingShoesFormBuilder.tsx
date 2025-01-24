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
import { useMask } from "@react-input/mask";
import { DateTimePicker } from "@/common/DateTimePicker/DateTimePicker";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { reportMissingShoe } from "../../actions/create-missing-shoes-report";
import { MissingShoeReport } from "@/types";
import { updateMissingShoeReport } from "../../actions/update-missing-shoe-details";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { DataSpinner } from "@/common/Loader/Loader";
import { MissingShoeStatus } from "@/constant/constant";

export const MissingShoesSchema = z.object({
  shoesToken: z.string().min(1, {
    message: "Shoes Token must be required.",
  }),
  description: z
    .string()
    .min(1, {
      message: "Shoes description must be required.",
    })
    .min(10, {
      message: "Shoes description must be at least 10 characters long.",
    })
    .max(200, {
      message: "Shoes description must be under 200 characters",
    }),
  time: z.date().refine((val) => val.getTime() <= new Date().getTime(), {
    message: "The time cannot be in the future.",
  }),
  ownerName: z.string().min(1, {
    message: "Owner's name is required.",
  }),
  ownerPhoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  ownerAddress: z
    .string()
    .min(1, {
      message: "The owner address  must be required.",
    })
    .min(10, {
      message: "The owner address must be at least 10 characters long.",
    })
    .max(200, {
      message: "The owner address must be under 200 characters",
    }),
});

export type MissingSchemaType = z.infer<typeof MissingShoesSchema>;

interface Props {
  missingShoe?: MissingShoeReport | null;
}
export const MissingShoesFormBuilder = ({ missingShoe }: Props) => {
    const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const phoneNumberMask = useMask({
    mask: "___________",
    replacement: { _: /\d/ },
  });

  if (missingShoe === null) {
    router.back();
  }

  const form = useForm<MissingSchemaType>({
    resolver: zodResolver(MissingShoesSchema),
    defaultValues: {
      shoesToken: missingShoe?.shoesToken ?? "",
      description: missingShoe?.description ?? "",
      time: missingShoe?.time ? new Date(missingShoe.time) : new Date(),
      ownerName: missingShoe?.ownerName ?? "",
      ownerPhoneNumber: missingShoe?.ownerPhoneNumber ?? "",
      ownerAddress: missingShoe?.ownerAddress ?? "",
    },
    mode: "all",
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof MissingShoesSchema>) => {
    startTransition(async () => {
      try {
        if (!missingShoe?.id) {
          await reportMissingShoe(values);
          toast({
            title: "Report submitted successfully",
          });
        } else {
          if (missingShoe?.status === MissingShoeStatus.Missing) {
            await updateMissingShoeReport(missingShoe.id, values);
            toast({
              title: "Report updated successfully",
            });
          } else {
            toast({
              title: "Missing Shoe Report cannot be updated!",
            });
          }
        }
        router.push(Routes.MissingShoes);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Report is not submitted successfully",
            description: error.message,
          });
        }
      }
    });
  };

  return (
    <FormWrapper>
      <FormTitle title="Report Missing Shoe" />
      <Form {...form}>
        <form
          data-testid="leaveRequestForm"
          action={() => form.handleSubmit(onSubmit)()}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name={"shoesToken"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shoes Token</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 101, 110, 120" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Shoes Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Shoes Description"
                    hasError={Boolean(errors.description)}
                    className={`resize-none focus-visible:ring-0`}
                    {...field}
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
                <FormMessage />
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
              disabled={
                isPending || missingShoe?.status === MissingShoeStatus.Found
              }
              className="text-xs w-24"
            >
              <div className="flex justify-center">
                {isPending ? (
                  <DataSpinner size="xs" isInputLoader />
                ) : missingShoe?.id ? (
                  "Update"
                ) : (
                  " Submit"
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
