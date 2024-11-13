"use server";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/constants";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { UserBuilder } from "../components/MemberFormBuilder";
import { headers } from "next/headers";

export const createUser = async (values: UserBuilder) => {
  const supabase = await getSupabaseClient();
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const randomInvitedId = Math.random().toString(36).slice(2, 10);

  const temporaryPassword = Math.random().toString(36).slice(2, 10);

  const invite_link = `${protocol}://${host}?token=${randomInvitedId}`;

  const userPhoneNumber = formatPhoneNumber(values.phoneNumber);

  const { error } = await supabase.from(Tables.Members).insert({
    ...values,
    invite_link,
    phoneNumber: userPhoneNumber,
    date_of_birth: values.date_of_birth.toISOString(),
    ehad_duration: values.ehad_duration.toISOString(),
    status: UserStatus.Inactive,
    temporary_password: true,
  });

  if (error) {
    return error;
  } else {
    const { error } = await supabase.auth.signUp({
      phone: userPhoneNumber,
      password: temporaryPassword,
      options: {
        data: {
          phoneNumber: userPhoneNumber,
          role: values.role,
          password: temporaryPassword,
        },
      },
    });
    if (error) {
      return error;
    }
    redirect(Routes.AddMember);
  }
};