"use server";

import { MemberRole } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Digest } from "@/types";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

type Props = {
  digest: Digest;
};

export const updateAttendanceDigest = async ({ digest }: Props) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();

  if (
    loginUser?.role === MemberRole.Incharge ||
    loginUser?.role === MemberRole.ShiftIncharge
  ) {
    const { data, error } = await supabase
      .from(Tables.Digest)
      .upsert(digest)
      .select()
      .returns<Digest[]>();

    if (error) {
      return { error: error.message };
    }
    return data;
  } else {
    return { error: "You have not permission" };
  }
};
