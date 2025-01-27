"use server";

import { MissingShoeStatus } from "@/constant/constant";
import { Tables } from "@/lib/db";
import { Routes } from "@/lib/routes";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { permanentRedirect } from "next/navigation";

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

  if (missingShoe.status === MissingShoeStatus.Found) {
    permanentRedirect(Routes.MissingShoes); 
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
