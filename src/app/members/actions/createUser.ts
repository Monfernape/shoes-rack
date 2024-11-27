"use server";
import { Tables } from "@/lib/db";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";

import { UserBuilder } from "../components/MemberFormBuilder";
import { headers } from "next/headers";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Routes } from "@/lib/routes";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";

export const createUser = async (values: UserBuilder) => {
  const supabase = await getSupabaseClient();
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const randomInvitedId = Math.random().toString(36).slice(2, 10);

  const temporaryPassword = Math.random().toString(36).slice(2, 10);

  const invite_link = `${protocol}://${host}?token=${randomInvitedId}`;

  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    invite_link,
    phoneNumber: formattedPhoneNumber,
    date_of_birth: values.date_of_birth.toISOString(),
    ehad_duration: values.ehad_duration.toISOString(),
    status: UserStatus.Inactive,
    temporary_password: true,
  });

  if (error) {
    throw error;
  } else {
    const { error } = await supabase.auth.signUp({
      phone: formattedPhoneNumber,
      password: temporaryPassword,
      options: {
        data: {
          phoneNumber: formattedPhoneNumber,
          role: values.role,
          password: temporaryPassword,
        },
      },
    });
    if (error) {
      throw error;
    }
    redirect(Routes.AddMember);
  }
};
