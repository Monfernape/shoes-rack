"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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
    { cookies },
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
