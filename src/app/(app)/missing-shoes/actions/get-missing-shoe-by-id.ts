"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMissingShoeById = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const { data: missingShoe, error } = await supabase
    .from(Tables.MissingShoes)
    .select(`* , members(name)`)
    .match({ id: requestId })
    .single();

  if (error || !missingShoe) {
    return null
  }

  return {
    id: missingShoe.id,
    status: missingShoe.status,
    ownerName: missingShoe.owner_name,
    time: new Date(missingShoe.time).toLocaleString(),
    ownerPhoneNumber: missingShoe.owner_phone_number,
    ownerAddress: missingShoe.owner_address,
    description: missingShoe.description,
    shoesToken: missingShoe.shoes_token,
    reportedBy: missingShoe.members.name,
  };
};
