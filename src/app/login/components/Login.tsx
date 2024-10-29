"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Phone as PhoneIcon } from "lucide-react";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

const userSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(12, "Phone number must be at most 12 characters long"),
});

type FormValues = z.infer<typeof userSchema>;

export const LoginPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Log in to your Shoes Rack account</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-6"
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
                          onChange={(e) =>
                            field.onChange(formatPhoneNumber(e.target.value))
                          }
                          className="pl-12"
                        />
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-gray-800">
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
