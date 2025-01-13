import { type NextRequest, NextResponse } from "next/server";

import { Routes } from "./lib/routes";
import { getSession } from "./utils/supabase/getSession";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import { MemberRole } from "./constant/constant";

const restrictedPaths: Routes[] = [Routes.AttendanceReport , Routes.MarkAttendance,Routes.AddMember,Routes.AddFund , Routes.Fund , Routes.EditFund];

const restrictedPathForShiftIncharge: Routes[] = [Routes.AddFund , Routes.Fund , Routes.EditFund];

export default async function updateSession(request: NextRequest) {

  const isTokenValid = await getSession();
  
  const requestedPath = request.nextUrl.pathname as Routes;
  
  const loginUser = await getLoggedInUser();
  
  const isRestrictedPath = restrictedPaths.includes(requestedPath);
  const isRestrictedPathForShiftIncharge = restrictedPathForShiftIncharge.includes(requestedPath);
 

  // If the user has a valid token and tries to access the login page, redirect them to the Members page
  if (isTokenValid && requestedPath === Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  // If no valid token and not on the login page, redirect to login
  if (!isTokenValid && requestedPath !== Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }
  
  if(requestedPath === Routes.AttendanceReport || requestedPath === Routes.Notification) {
    return NextResponse.redirect(new URL(Routes.Members, request.url))
  }

  // Restrict paths based on user role
  if (
    isTokenValid &&
    loginUser.role === MemberRole.Member &&
    isRestrictedPath
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

  if (
    isTokenValid &&
    loginUser.role === MemberRole.ShiftIncharge &&
    isRestrictedPathForShiftIncharge
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }

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
