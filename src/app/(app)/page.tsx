import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic'
export default function Home() {
  const isUserLogedIn = false;
  if (!isUserLogedIn) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      Home
    </main>
  );
}
