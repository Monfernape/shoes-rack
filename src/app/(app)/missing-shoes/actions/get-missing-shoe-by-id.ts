"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getMissingShoeById = async (requestId: number) => {
  const supabase = await getSupabaseClient();
  const { data: missingShoe, error } = await supabase
    .from(Tables.MissingShoes)
    .select()
    .eq("id", requestId)
    .single();

  if (error) {
    throw error.message;
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
    reportedBy: missingShoe.reported_by,
  };
};
