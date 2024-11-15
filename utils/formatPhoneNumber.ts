import { PAKISTAN_COUNTRY_CODE } from "@/constant/constant";

/**
 * @phoneNumbe is local format starts with `03` covering into international format starts with `92`
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber
    .replace("-", "")
    .replace("0", PAKISTAN_COUNTRY_CODE);
  return formattedPhoneNumber;
};
