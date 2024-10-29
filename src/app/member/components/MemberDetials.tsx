import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { StatusBadge } from "@/common/StatusBadge/StatusBadge";
import { Briefcase, MapPin, Phone, Shield, User } from "lucide-react";
import { UserDetails } from "../details/[...slug]/page";

export const MemberDetials = ({
    userInfo
}:{userInfo:UserDetails}) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-row items-center space-x-4">
            <UserAvatar user_name={userInfo.name} />
            <div className="flex flex-col space-y-1">
              <h2 className="text-sm font-semibold text-gray-700">
                {userInfo.name}
              </h2>
              <StatusBadge status="active" />
            </div>
          </div>
          {userInfo?.role === "incharge" && (
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-gray-700">
              <Shield className="w-5 h-5" />
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
                <User className="w-5 h-5" />
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
                <Phone className="w-5 h-5" />
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
                <Briefcase className="w-5 h-5" />
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
          {userInfo?.role === "incharge" && (
            <div className="space-y-6 text-gray-700">
              <div className="space-y-3">
                <h3 className="flex items-center space-x-2 text-sm font-semibold ">
                  <MapPin className="w-5 h-5" />
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
