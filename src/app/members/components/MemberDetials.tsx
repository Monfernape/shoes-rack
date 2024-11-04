import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import { 
  Briefcase as BriefcaseIcon, 
  MapPin as MapPinIcon, 
  Phone as PhoneIcon, 
  Shield as ShieldIcon,
  User as UserIcon } from "lucide-react";
import { MemberRole } from "@/lib/constants";
import { UserDetails } from "@/types";

export const MemberDetials = ({
    userInfo
}:{userInfo:UserDetails}) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-row items-center space-x-4">
            <UserAvatar userName={userInfo.name} />
            <div className="flex flex-col space-y-1">
              <h2 data-testid="user-name" className="text-sm font-semibold text-gray-700">
                {userInfo.name}
              </h2>
              <UserStatusBadge status={userInfo.status} />
            </div>
          </div>
          {userInfo?.role === MemberRole.Incharge && (
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-700">
              <ShieldIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">
                CNIC: {userInfo.cnic}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-8">
          <div className="space-y-6 text-gray-700">
            <div className="space-y-3">
              <h3 className="flex items-center space-x-2 text-sm font-semibold ">
                <UserIcon className="w-5 h-5" />
                <span>Personal Information</span>
              </h3>
              <div className="pl-7 space-y-2">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground"> Age: </span> {userInfo.age} years
                </p>
              </div>
              <div className="pl-7 space-y-2">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground"> Role: </span> {userInfo.role}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-gray-700">
            <div className="space-y-3">
              <h3 className="flex items-center space-x-2 text-sm font-semibold ">
                <PhoneIcon className="w-5 h-5" />
                <span>Contact Information</span>
              </h3>
              <div className="pl-7 space-y-2">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground"> Phone:  </span> {userInfo.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-gray-700">
            <div className="space-y-3">
              <h3 className="flex items-center space-x-2 text-sm font-semibold ">
                <BriefcaseIcon className="w-5 h-5" />
                <span>Work Information</span>
              </h3>
              <div className="pl-7 space-y-2">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground">Ehad Duration:  </span> {userInfo.ehadDuration} years
                </p>
              </div>
              <div className="pl-7 space-y-2">
                <p className="text-xs">
                  <span className="font-medium text-muted-foreground"> Shift: </span> {userInfo.shift}
                </p>
              </div>
            </div>
          </div>
          {userInfo?.role === MemberRole.Incharge && (
            <div className="space-y-6 text-gray-700">
              <div className="space-y-3">
                <h3 className="flex items-center space-x-2 text-sm font-semibold ">
                  <MapPinIcon className="w-5 h-5" />
                  <span>Address</span>
                </h3>
                <div className="pl-7 space-y-2">
                  <p className="text-xs">{userInfo.address}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
