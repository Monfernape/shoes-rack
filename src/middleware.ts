import { type NextRequest, NextResponse } from "next/server";

import { Routes } from "./lib/routes";
import { getSession } from "./utils/supabase/getSession";
import { getLoggedInUser } from "./utils/getLoggedInUser";
import { MemberRole } from "./constant/constant";

const restrictedPaths: Routes[] = [Routes.AttendanceReport];

export default async function updateSession(request: NextRequest) {
  const isTokenValid = await getSession();
  const requestedPath = request.nextUrl.pathname as Routes;
  const loginUser = await getLoggedInUser();

  const isRestrictedPath = restrictedPaths.includes(requestedPath);

  if (!isTokenValid && requestedPath !== Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }
  if (
    isTokenValid &&
    loginUser.role === MemberRole.Member &&
    isRestrictedPath
  ) {
    return NextResponse.redirect(new URL(Routes.Members, request.url));
  }
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = { matcher: "/" };
