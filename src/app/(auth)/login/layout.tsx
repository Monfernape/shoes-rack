export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-4 mx-auto w-full sm:w-3/4 bg-white rounded h-screen">{children}</div>;
}
