"use server";
import { Tables } from "@/lib/db";
import { Shift, MemberRole, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { DevUserType } from "../components/AddDevUserForm";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";
import { Routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export const addDevUser = async (values: DevUserType) => {
  const supabase = await getSupabaseClient();

  const currentDate = new Date();

  const dateOfBirth = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 18)
  ).toISOString();
  
  const ehadDuration = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 1)
  ).toISOString();

  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);

  const updatedValues = {
    phoneNumber: formattedPhoneNumber,
    name: values.name,
    date_of_birth: dateOfBirth,
    ehad_duration: ehadDuration,
    role: MemberRole.Member,
    cnic: "31333-3333333-3",
    address: "Testing Street 12",
    shift: Shift.ShiftA,
    invite_link: "",
    status: UserStatus.Active,
    temporary_password: false,
  };
  const { error } = await supabase.from(Tables.Members).insert({
    ...updatedValues,
  });

  if (error) {
    return error;
  } else {
    const { error } = await supabase.auth.signUp({
      phone: formattedPhoneNumber,
      password: values.password,
      options: {
        data: {
          phoneNumber: formattedPhoneNumber,
          role: updatedValues.role,
          password: values.password,
        },
      },
    });
    if (error) {
      throw error;
    } else {
      redirect(Routes.Members);
    }
  }
};
