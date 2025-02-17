import { type NextRequest, NextResponse } from "next/server";

import { Routes } from "./lib/routes";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import { MemberRole } from "./constant/constant";
import { updateSession } from "./utils/supabase/middleware";
import { getSupabaseClient } from "./utils/supabase/supabaseClient";
import { cookies } from "next/headers";

const restrictedPaths: Routes[] = [
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

  // Fetch the session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);

    /**
     * we experience a 400 status code when the session is invalid or expired and Refresh Token is not available. The page keeps loading infinitely. To avoid this, we sign out the user and redirect them to the login page.
     */
    if (sessionError.status === 400) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL(Routes.Login, request.url));
    }
  }

  const loginUser = await getLoggedInUser();
  const isRestrictedPath = restrictedPaths.includes(requestedPath);
  const isRestrictedPathForShiftIncharge =
    restrictedPathForShiftIncharge.includes(requestedPath);
  const cookieStore = await cookies();
  if (!session) {
    // we were facing issue on login , loggedin user was not deleting from cookies in case session expire
    cookieStore.delete;
  }
  if (!session && requestedPath !== Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }

  if (
    (session && requestedPath === Routes.Login) ||
    (session && requestedPath === Routes.Root)
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }
  if (
    (requestedPath === Routes.AttendanceReport ||
      requestedPath === Routes.Notification) &&
    loginUser.role === MemberRole.Member
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (session && loginUser.role === MemberRole.Member && isRestrictedPath) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (
    session &&
    loginUser.role === MemberRole.ShiftIncharge &&
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

// The matcher pattern determines which routes the middleware should apply to.
// Pattern explanation:
// - "/((?!.*\\.).*)" ensures the middleware applies to all routes
// - This excludes requests for static files like CSS, or images (e.g., "/styles.css" or "/logo.png").
// - Examples of routes where the middleware will NOT apply:
//   - "/styles/main.css"
//   - "/images/logo.png"
export const config = { matcher: "/((?!.*\\.).*)" };
