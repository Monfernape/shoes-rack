import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/common/Avatar/UserAvatar";
import { UserStatusBadge } from "@/common/StatusBadge/UserStatusBadge";
import {
  Briefcase as BriefcaseIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Shield as ShieldIcon,
  User as UserIcon,
} from "lucide-react";
import { Member, UserDetails } from "@/types";
import { MemberRole } from "@/constant/constant";
import { getAge } from "@/utils/ageFormater";
import { dateformatter } from "@/utils/dateFormatter";
import { localNumberFormat } from "@/utils/formattedPhoneNumber";
import { formatRole } from "@/utils/formatRole";
import { NoDataFound } from "@/common/NoDataFound";

export const MemberDetails = ({
  userInfo,
  user,
}: {
  userInfo: UserDetails;
  user: Member;
}) => {
  const showPersonalInfo = useMemo(() => {
    if (userInfo.id) {
      if (user.role === MemberRole.Member && user.id === userInfo.id) {
        return true;
      } else if (
        user.role === MemberRole.ShiftIncharge &&
        user.shift === userInfo.shift &&
        (userInfo.role === MemberRole.Member || userInfo.id === user.id)
      ) {
        return true;
      } else if (user.role === MemberRole.Incharge) {
        return true;
      } else {
        return false;
      }
    }
  }, []);
  const dateFormat = dateformatter(new Date(userInfo.ehad_duration));

  return userInfo.id ? (
    <Card>
      <CardContent className="text-left space-y-6 mt-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <UserAvatar userName={userInfo.name} />
            <h2 data-testid="user-name" className="text-base text-gray-800 ">
              {userInfo.name}
            </h2>
          </div>
          <div className=" ml-[54px]">
            <UserStatusBadge status={userInfo.status} />
          </div>
        </div>

        {showPersonalInfo && (
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <ShieldIcon className="w-4 h-4 text-gray-700" />
            </div>
            <span className="text-sm font-medium">CNIC: {userInfo.cnic}</span>
          </div>
        )}

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <UserIcon className="w-4 h-4" />
              </div>
              <span>Personal Information</span>
            </h3>
            <div className="pl-12 space-y-2 ">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">Age:</span>{" "}
                {getAge(userInfo.date_of_birth)} years
              </p>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">Role:</span>{" "}
                {formatRole(userInfo.role)}
              </p>
            </div>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  Shift:
                </span>
                {userInfo.shift}
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <span>Contact number</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  Phone:
                </span>
                {localNumberFormat(userInfo.phoneNumber)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <BriefcaseIcon className="w-4 h-4" />
              </div>
              <span>Ehad duration</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">{dateFormat}</p>
            </div>
          </div>
        </div>

        {showPersonalInfo && (
          <div className="text-gray-700">
            <div className="space-y-1">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <span>Address</span>
              </h3>
              <div className="pl-12 space-y-2">
                <p className="text-xs">{userInfo.address}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  ) : (
    <NoDataFound />
  );
};
