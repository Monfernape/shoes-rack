"use server";
import { Tables } from "@/lib/db";
import { Shift, MemberRole, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";

import { DevUserType } from "../components/AddDevUserForm";
import { intlNumberFormat } from "@/utils/formattedPhoneNumber";

export const addDevUser = async (values: DevUserType) => {

  const supabase = await getSupabaseClient();

  const currentData = new Date().toISOString();
  
  const formattedPhoneNumber = intlNumberFormat(values.phoneNumber);
  
  const updatedValues = {
    phoneNumber: formattedPhoneNumber,
    name: 'Testing User',
    date_of_birth: currentData,
    ehad_duration: currentData,
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
    }
  }
};