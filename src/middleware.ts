import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "../utils/supabase/getSession";
import { Routes } from "./lib/routes";

export default async function updateSession(request: NextRequest) {
  const isTokenValid = await getSession();
  const requestedPath = request.nextUrl.pathname;

  if (!isTokenValid && requestedPath !== Routes.Login) {
    return NextResponse.redirect(new URL(Routes.Login, request.url));
  }
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = { matcher: "/((?!.*\\.).*)" };
