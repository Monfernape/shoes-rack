import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
export const dynamic = 'force-dynamic'
// Define metadata as a named export
export const metadata: Metadata = {
  title: "Shoes Rack",
  description: "ERP Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
