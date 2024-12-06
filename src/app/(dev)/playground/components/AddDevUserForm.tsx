"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { Input } from "@/components/ui/input";
import { useMask } from "@react-input/mask";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { addDevUser } from "../actions/add-dev-user";
import { FormTitle } from "@/common/FormTitle/FormTitle";

export const DevUserSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  password: z.string().min(1, { message: "password is required" }),
});

export type DevUserType = z.infer<typeof DevUserSchema>;

const AddDevUserForm = () => {
  const phoneNumberMask = useMask({
    mask: "____-_______",
    replacement: { _: /\d/ },
  });

  const form = useForm<DevUserType>({
    resolver: zodResolver(DevUserSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: undefined,
    },
    mode: "all",
  });

  const {
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmission = async (values: DevUserType) => {
    try {
      // there is nothing in response in case of insert data
      const result = await addDevUser(values);

      if (!result) {
        form.reset();
        toast({
          title: "User created successfully",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          description: "Please try again",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        action={() => form.handleSubmit(handleSubmission)()}
        className="space-y-4"
        data-testid="form-valid"
      >
        <FormTitle title="Add Dev User" />

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
                  hasError={errors?.name && true}
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
                  hasError={errors?.phoneNumber && true}
                />
              </FormControl>
              <FormMessage data-testId="phone_error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    data-testId="password"
                    hasError={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          data-testid="submit"
          disabled={!form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddDevUserForm;
