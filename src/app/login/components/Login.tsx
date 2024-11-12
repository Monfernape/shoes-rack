"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
  Lock as LockIcon,
  Phone as PhoneIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMask } from "@react-input/mask";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { loginUser } from "@/app/members/actions/loginUser";

const userSchema = z.object({
  phoneNumber: z
    .string()
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is invalid"),
  password: z.string().min(1,{message:'password is required'}),
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
    mask: "03__-_______",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await loginUser(values);
      if (!result) {
        toast({
          title: "Login successfully",
        });
      }
    } catch (error) {
      toast({
        title: "wrong credentials",
        description: "Please try again",
      });
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Log in to your Shoes Rack account</p>
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
                          className="pl-12"
                          ref={phoneNumberMask}
                          hasError={!!errors.phoneNumber}
                        />
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                          className="pl-12"
                          data-testId="password"
                          hasError={!!errors.password}
                        />
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-800"
              data-testId="submitButton"
            >
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
