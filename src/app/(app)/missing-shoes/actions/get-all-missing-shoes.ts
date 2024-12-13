"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllMissingShoesReport = async () => {
  const supabase = await getSupabaseClient();

  const { data:missingShoes, error } = await supabase.from(Tables.MissingShoes).select("*");
  
  const missingShoesReports = (missingShoes || []).map((missingShoes) => ({
    id: missingShoes.id,
    shoesToken: missingShoes.shoes_token,
    description: missingShoes.description,
    status: missingShoes.status,
    ownerName: missingShoes.owner_name,
    time: new Date(missingShoes.time).toLocaleString(),
    ownerPhoneNumber: missingShoes.owner_phone_number,
    ownerAddress: missingShoes.owner_address,
  }));

  return {
    missingShoesReports,
    error,
  }
};
