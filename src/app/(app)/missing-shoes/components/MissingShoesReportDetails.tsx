import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FootprintsIcon,
  ClockIcon,
  FileTextIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import { MissingShoesStatusBadge } from "@/common/StatusBadge/MissingShoesStatusBadge";
import { MissingShoeReport } from "@/types";
interface Props {
    missingShoe:MissingShoeReport
}
export const MissingShoesReportDetails = ({missingShoe}:Props) => {
  return (
    <div className="flex justify-center m-8">
    <Card className="w-full max-w-xl">
      <CardContent className="text-left space-y-6 mt-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <h2 data-testid="shoe-token" className="text-base text-gray-800">
              Missing Shoes Report
            </h2>
          </div>
          <MissingShoesStatusBadge status={missingShoe.status} />
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <FootprintsIcon className="w-4 h-4" />
              </div>
              <span>Shoes Token</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">{missingShoe.shoesToken}</p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <ClockIcon className="w-4 h-4" />
              </div>
              <span>Time Information</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  Time Lost:
                </span>
                {missingShoe.time}
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <FileTextIcon className="w-4 h-4" />
              </div>
              <span>Shoe Description</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">{missingShoe.description}</p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <UserIcon className="w-4 h-4" />
              </div>
              <span>Owner Information</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">Name:</span>
                {missingShoe.ownerName}
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
              <span>Contact Information</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">
                <span className="font-medium text-muted-foreground">
                  Phone:
                </span>
                {missingShoe.ownerPhoneNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="text-gray-700">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <MapPinIcon className="w-4 h-4" />
              </div>
              <span>Address</span>
            </h3>
            <div className="pl-12 space-y-2">
              <p className="text-xs">{missingShoe.ownerAddress}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};
