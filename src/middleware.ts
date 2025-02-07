import { type NextRequest, NextResponse } from "next/server";

import { Routes } from "./lib/routes";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import { MemberRole } from "./constant/constant";
import { updateSession } from "./utils/supabase/middleware";
import { getSupabaseClient } from "./utils/supabase/supabaseClient";

const restrictedPaths: Routes[] = [
  Routes.AttendanceReport,
  Routes.Digest,
  Routes.AddMember,
  Routes.AddFund,
  Routes.EditFund,
];

const restrictedPathForShiftIncharge: Routes[] = [
  Routes.AddFund,
  Routes.EditFund,
];

export default async function middleware(request: NextRequest) {
  const supabase = await getSupabaseClient();
  const requestedPath = request.nextUrl.pathname as Routes;

  //  Fetch the session
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
  }

  const loginUser = await getLoggedInUser();
  const isRestrictedPath = restrictedPaths.includes(requestedPath);
  const isRestrictedPathForShiftIncharge =
    restrictedPathForShiftIncharge.includes(requestedPath);

  if (!session && requestedPath !== Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  if (requestedPath === Routes.Notification) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (session && loginUser?.role === MemberRole.Member && isRestrictedPath) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (session && loginUser?.role === MemberRole.Member && isRestrictedPath) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (
    session &&
    loginUser?.role === MemberRole.ShiftIncharge &&
    isRestrictedPathForShiftIncharge
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  await updateSession(request);

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

// Apply middleware to all routes except `/login`
export const config = {
  matcher: "/((?!login).*)",
};
