import React from "react";
import { MemberFormBuilder } from "../../components/MemberFormBuilder";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Tables } from "@/lib/db";

type Parameters = {
  params: {
    id: string;
  };
};
const page = async ({ params }: Parameters) => {
  const { id } = params;
  const supabase = await getSupabaseClient();
  const { data: member } = await supabase
    .from(Tables.Members)
    .select()
    .eq("id", Number(id))
    .single();
  return <MemberFormBuilder member={member} />;
};

export default page;
