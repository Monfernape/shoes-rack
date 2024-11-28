"use server";

import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../utils/supabase/supabaseClient";

export const getMembers = async (query: string | null) => {
  const supabase = await getSupabaseClient();

    const columns = ['name', 'address', 'phoneNumber', 'cnic'];
    
    const orConditions = columns.map(col => {
      return `${col}.ilike.%${query ?? ""}%`; 
    });

    const { data, error } = await supabase
    .from(Tables.Members) 
    .select()
    .or(orConditions.join(','));

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