"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllMissingShoes = async () => {
  const supabase = await getSupabaseClient();

  const { data: missingShoesData, error } = await supabase
    .from(Tables.MissingShoes)
    .select("*");

  if (error) {
    return [];
  }

  return missingShoesData.map((missingShoes) => ({
    id: missingShoes.id,
    color: missingShoes.color,
    type: missingShoes.type,
    status: missingShoes.status,
    size: missingShoes.size,
    ownerName: missingShoes.ownerName,
    time: new Date(missingShoes.time).toLocaleString(),
    ownerPhoneNumber: missingShoes.ownerPhoneNumber,
    ownerAddress: missingShoes.ownerAddress,
  }));
};
