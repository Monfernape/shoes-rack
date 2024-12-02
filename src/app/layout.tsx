import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
