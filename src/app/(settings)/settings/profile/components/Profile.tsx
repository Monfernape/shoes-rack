"use client";
import React from "react";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import FormWrapper from "@/common/FormWrapper";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { Label } from "@/components/ui/label";
import { UserDetails } from "@/types";

import { localNumberFormat } from "@/utils/formattedPhoneNumber";
import { dateformatter } from "@/utils/dateFormatter";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SettingsProps {
  loginUser: UserDetails;
}

export const Profile = ({ loginUser }: SettingsProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    return router.back();
  };

  return (
    <FormWrapper>
      <div className="space-y-4 pb-10">
        <div className="flex items-center space-x-2 pr-2 -ml-1 mt-2">
          <ArrowLeft
            onClick={handleNavigation}
            className="cursor-pointer text-gray-700 "
          />
          <div className="flex justify-center items-start ">
            <h4>Profile Settings</h4>
          </div>
        </div>

        <UserAvatar userName={loginUser.name} size="large" />

        <div className="space-y-2">
          <Label>Name</Label>
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {loginUser.name}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Phone Number</Label>

          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {localNumberFormat(loginUser.phoneNumber)}
          </div>
        </div>

        <div className="space-y-2">
          <Label>CNIC</Label>
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {loginUser.cnic}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <address className="border rounded-md p-2 bg-gray-50 text-xs not-italic">
            {loginUser.address}
          </address>
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {loginUser.role}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Shift</Label>
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {loginUser.shift}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ehad Duration</Label>
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {dateformatter(new Date(loginUser.ehad_duration))}
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
