"use client";
import React from "react";
import { FormTitle } from "@/common/FormTitle/FormTitle";
import FormWrapper from "@/common/FormWrapper";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { Label } from "@/components/ui/label";
import { UserDetails } from "@/types";

import { localNumberFormat } from "@/utils/formattedPhoneNumber";
import { dateformatter } from "@/utils/dateFormatter";

interface SettingsProps {
  loginUser: UserDetails;
}

export const Settings = ({ loginUser }: SettingsProps) => {
  return (
    <FormWrapper>
      <div className="space-y-4 pb-10">
        <FormTitle title="Profile Settings" />
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
          <div className="border rounded-md p-2 bg-gray-50 text-xs">
            {loginUser.address}
          </div>
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
