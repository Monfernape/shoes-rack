"use client"; // Error boundaries must be Client Components
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import LogoImage from "../../public/assets/imgs/logo.png";
import { useRouter } from "next/navigation";
export default function Error() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-2 text-center flex justify-center items-center flex-col ">
        <Image
          src={LogoImage}
          width="100"
          height="100"
          alt={"logo"}
          className="border border-black rounded-full p-1 filter grayscale"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Something Went Wrong
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center items-center">
          <Button
            asChild
            className="w-36"
            onClick={() => {
              router.back();
            }}
          >
            <div>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Back
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
