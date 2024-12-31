"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoImage from "../../../../../public/assets/imgs/logo.png"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMask } from "@react-input/mask";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import Image from "next/image";
import { loginUser } from "@/app/(auth)/login/actions/loginUser";

const userSchema = z.object({
  phoneNumber: z
    .string()
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is required"),
  password: z.string().min(1, { message: "password is required" }),
});

type FormValues = z.infer<typeof userSchema>;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
    mode: "all",
  });

  const phoneNumberMask = useMask({
    mask: "____-_______",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await loginUser(values);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          description: "Please try again",
        });
      }
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <div className="h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md w-full">
      <div className="flex justify-center item-center pt-8 ">
        <Image
          src={LogoImage}
          width="65"
          height="65"
          alt={"logo"}
          className="border border-black rounded-full p-1"
        />
      </div>
      <div className="p-8 pb-0 text-center flex gap-1 flex-col">
        <h2 className="text-sm font-bold text-gray-700">Login Shoes Rack</h2>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-8 space-y-6"
            data-testId="form"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="phoneNumber"
                          type="text"
                          placeholder="0300-0000000"
                          {...field}
                          value={field.value}
                          data-testId="phoneNumber"
                          ref={phoneNumberMask}
                          hasError={!!errors.phoneNumber}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
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
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800"
              data-testId="submitButton"
              // disabled={!form.formState.isValid}
            >
              Login
            </Button>
            {/* <div className="flex items-center justify-center">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-800 "
              >
                Forgot password?
              </Link>
            </div> */}
          </form>
        </Form>
      </div>
    </div>
  );
};
