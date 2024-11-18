"use server";
import { Tables } from "@/lib/db";
import { Shift, UserRole, UserStatus } from "@/constant/constant";
import { getSupabaseClient } from "@/utils/supabase/supabaseClient";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { DevUserType } from "../components/AddDevUserForm";

export const addDevUser = async (values: DevUserType) => {

  const supabase = await getSupabaseClient();

  const currentData = new Date().toISOString();
  const userPhoneNumber = formatPhoneNumber(values.phoneNumber);
  
  const updatedValues = {
    phoneNumber: userPhoneNumber,
    name: `Testing User`,
    date_of_birth: currentData,
    ehad_duration: currentData,
    role: UserRole.Member,
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
      phone: userPhoneNumber,
      password: values.password,
      options: {
        data: {
          phoneNumber: userPhoneNumber,
          role: updatedValues.role,
          password: values.password,
        },
      },
    });
    if (error) {
      return error;
    }
  }
};