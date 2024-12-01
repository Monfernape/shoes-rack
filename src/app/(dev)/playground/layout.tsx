import { notFound } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Redirect to 404 if not in development mode
    if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <div>{children}</div>;
}