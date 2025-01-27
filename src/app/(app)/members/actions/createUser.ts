"use server";
import { Tables } from "@/lib/db";
import { MemberRole, UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";

import { UserBuilder } from "../components/MemberFormBuilder";
import { headers } from "next/headers";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { Routes } from "@/lib/routes";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { ERROR_MESSAGE } from "@/constant/error";

export const createUser = async (values: UserBuilder) => {
  const supabase = await getSupabaseClient();
  const user = await getLoggedInUser();

  if (user.role === MemberRole.Member) {
    return { error: "You have not permission" };
  } else {
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
      if (error.details.includes("phoneNumber")) {
        return { error: ERROR_MESSAGE.MEMBERS.DUPLICATE_PHONENUMBER };
      } else if (error.details.includes("cnic")) {
        return { error: ERROR_MESSAGE.MEMBERS.DUPLICATE_CNIC };
      }
      return { error: ERROR_MESSAGE.GENERAL.SOMETHING_WENT_WRONG };
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
        return { error: ERROR_MESSAGE.GENERAL.SOMETHING_WENT_WRONG };
      }
    }
    redirect(Routes.Members);
  }
};
