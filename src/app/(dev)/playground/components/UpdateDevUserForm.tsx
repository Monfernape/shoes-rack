"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MemberRole } from "@/constant/constant";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateDevUserRole } from "../actions/update-dev-user-role";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PHONENUMBER_VALIDATOR_REGEX } from "@/lib/regex";
import { Input } from "@/components/ui/input";
import { useMask } from "@react-input/mask";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import { USER_ROLES } from "@/app/(app)/members/components/MemberFormBuilder";
import { Card } from "@/components/ui/card";

export const UpdateDevUserSchema = z.object({
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .regex(PHONENUMBER_VALIDATOR_REGEX, "Phone number is not valid"),
  role: z.enum(
    [MemberRole.Member, MemberRole.ShiftIncharge, MemberRole.Incharge],
    {
      errorMap: () => {
        return { message: "Update user role" };
      },
    }
  ),
});

export type UpdateDevUserRoleType = z.infer<typeof UpdateDevUserSchema>;

const UpdateDevUserFrom = () => {
  const phoneNumberMask = useMask({
    mask: "____-_______",
    replacement: { _: /\d/ },
  });

  const form = useForm<UpdateDevUserRoleType>({
    resolver: zodResolver(UpdateDevUserSchema),
    defaultValues: {
      phoneNumber: "",
      role: undefined,
    },
    mode: "all",
  });

  const {
    formState: { errors },
  } = form;

  const handleSubmission = async (values: UpdateDevUserRoleType) => {
    try {
      // there is nothing in response in case of insert data
      const result = await updateDevUserRole(values);

      if (result) {
        form.reset();
        toast({
          title: "Role update successfully",
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
    <div className=" pb-6">
    <Card className="p-6 max-w-xlg mx-auto">
    <Form {...form}>
      <form
        action={() => form.handleSubmit(handleSubmission)()}
        className="space-y-4 mt-8"
        data-testid="form-valid"
      >
        <FormTitle title="Update Dev User" />

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
                      {USER_ROLES.map((user) => (
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

        <Button
          type="submit"
          data-testid="submit"
          disabled={!form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
    </Card>
    </div>
  );
};

export default UpdateDevUserFrom;
