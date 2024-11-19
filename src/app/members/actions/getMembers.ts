"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../utils/supabase/supabaseClient";

export const getMembers = async (query: string) => {
  const supabase = await getSupabaseClient();

  // Verifying if the search query contains a number or a string in order to add a search column to the member table.
  const searchColumn = !Number(query) ? "name" : "phoneNumber";

  const { data, error } = await supabase
    .from(Tables.Members)
    .select()
    .ilike(searchColumn, `%${query}%`);

  if (error) {
    return {
      success: false,
      message: "There are no members available at this time.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Members loaded successfully.",
    data: data || [],
  };
};
