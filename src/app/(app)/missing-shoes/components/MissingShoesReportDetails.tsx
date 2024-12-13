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
import { MissingShoeStatus } from "@/constant/constant";

const shoeInfo = {
  tokenNumber: "MS12345",
  timeLost: "2023-07-15T14:30:00",
  description:
    "Red Nike running shoes, size 42. Last seen in the gym locker room.",
  status: MissingShoeStatus.Found,
  ownerName: "John Doe",
  ownerPhone: "+1 (555) 123-4567",
  ownerAddress: "123 Main St, Anytown, AN 12345",
};

export const MissingShoesReportDetails = () => {
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
          <MissingShoesStatusBadge status={shoeInfo.status} />
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
              <p className="text-xs">{shoeInfo.tokenNumber}</p>
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
                </span>{" "}
                {shoeInfo.timeLost}
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
              <p className="text-xs">{shoeInfo.description}</p>
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
                <span className="font-medium text-muted-foreground">Name:</span>{" "}
                {shoeInfo.ownerName}
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
                </span>{" "}
                {shoeInfo.ownerPhone}
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
              <p className="text-xs">{shoeInfo.ownerAddress}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};
