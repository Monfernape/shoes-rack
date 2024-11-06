"use server";
import { z } from "zod";
import { Tables } from "@/lib/db";
import { getSupabaseClient } from "../../../../utils/supabase/supabaseClient";
import { UserStatus } from "@/constant/constant";
import { redirect } from "next/navigation";
import { Routes } from "@/lib/constants";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { addCookies } from "../../../../utils/cookiesManager";
import { UserBuilder } from "../components/MemberFormBuilder";

type LoginUser = {
  phoneNumber: string;
  password: string;
};

export const createUser = async (values: UserBuilder) => {
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
      addCookies({
        name: "loginUser",
        values: loginUser,
      });
      addCookies({
        name: "session",
        values: session,
      });
      redirect(Routes.Dashboard);
    }
  }
};
