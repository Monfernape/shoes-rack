import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import LogoImage from "../../public/assets/imgs/logo.png";
import { Routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <Image
                src={LogoImage}
                width="100"
                height="100"
                alt={"logo"}
                className="border border-black rounded-full p-1 filter grayscale"
              />
            </div>
          </div>
          <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
            404
          </h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild>
            <Link
              href={Routes.Members}
              className="flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
