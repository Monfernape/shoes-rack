"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
const createFetch =
  (options: Pick<RequestInit, "next" | "cache">) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    });
  };
export async function getSupabaseClient() {
  return createServerComponentClient(
    {
      cookies: function (): ReadonlyRequestCookies {
        throw new Error("Function not implemented.");
      }
    }, // Empty object for configuration
    {
      options: {
        global: {
          fetch: createFetch({
            cache: "no-store",
          }),
        },
      },
    }
  );
}
