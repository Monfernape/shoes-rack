"use server";

import { MemberRole } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Digest } from "@/types";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { revalidatePath } from "next/cache";

type Props = {
  digestPayload: Digest;
};

export const updateAttendanceDigest = async ({ digestPayload }: Props) => {
  const supabase = await getSupabaseClient();
  const loginUser = await getLoggedInUser();

  if (
    loginUser?.role === MemberRole.Incharge ||
    loginUser?.role === MemberRole.ShiftIncharge
  ) {
    const { error } = await supabase
      .from(Tables.Digest)
      .update(digestPayload)
      .eq("id", digestPayload.id)
      .select()
      .returns<Digest[]>();

    if (error) {
      throw error;
    }
    revalidatePath('/review')
  } else {
    throw "You have not permission";
  }
};
