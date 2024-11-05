"use server";
import { z } from "zod";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { cookies } from "next/headers";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";
import { userBuilderSchema } from "@/app/members/components/MemberFormBuilder";
import { Routes } from "@/lib/constants";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { setCookies } from "../../../../utils/setCookies";

type LoginUser = {
  phoneNumber: string;
  password: string;
};

export const createUser = async (values: z.infer<typeof userBuilderSchema>) => {
  const supabase = await getSupabaseClient();

  const rendomInviteId = Math.random().toString(36).slice(2, 10);

  const temporaryPassword = Math.random().toString(36).slice(2, 10);

  const invite_link = `${process.env.LOCALHOST}?token=${rendomInviteId}`;

  const userPhoneNumber = formatPhoneNumber(values.phoneNumber);

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
  } else {
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
    }
    redirect(Routes.AddMember);
  }
};

export const loginUser = async ({ phoneNumber, password }: LoginUser) => {
  const supabase = await getSupabaseClient();

  const phoneNum = formatPhoneNumber(phoneNumber);

  const { data: authUserData, error } = await supabase.auth.signInWithPassword({
    phone: phoneNum,
    password: password,
  });

  if (error) {
    return error;
  } else {
    const { data: loginUser, error } = await supabase
      .from(Tables.Members)
      .update({
        status: UserStatus.Active,
        invite_link: "",
      })
      .eq("phoneNumber", phoneNum)
      .select("*")
      .single();

    if (error) {
      return error;
    } else {
      const { session } = authUserData;
      setCookies({
        name: "loginUser",
        values: loginUser,
      });
      setCookies({
        name: "session",
        values: session,
      });
      redirect(Routes.Dashboard);
    }
  }
};
