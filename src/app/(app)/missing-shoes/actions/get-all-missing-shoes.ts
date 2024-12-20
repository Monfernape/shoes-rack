"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

export const getAllMissingShoesReport = async ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const supabase = await getSupabaseClient();
  const columns = ["shoes_token", "owner_name", "owner_phone_number"];

  const orConditions = columns.map((col) => {
    return `${col}.ilike.%${searchQuery ?? ""}%`;
  });

  const { data: missingShoes, error } = await supabase
    .from(Tables.MissingShoes)
    .select("*")
    .or(orConditions.join(","));

  const missingShoesReports = (missingShoes || []).map((missingShoes) => ({
    id: missingShoes.id,
    shoesToken: missingShoes.shoes_token,
    description: missingShoes.description,
    status: missingShoes.status,
    ownerName: missingShoes.owner_name,
    time: new Date(missingShoes.time).toLocaleString(),
    ownerPhoneNumber: missingShoes.owner_phone_number,
    ownerAddress: missingShoes.owner_address,
    reportedBy: missingShoes.reported_by,
  }));

  return {
    missingShoesReports,
    error,
  };
};
