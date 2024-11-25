import { PAKISTAN_COUNTRY_CODE } from "@/constant/constant";

/**
 * @phoneNumbe is local format starts with `03` covering into international format starts with `92`
 */
export const intlNumberFormat = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber
    .replace("-", "")
    .replace("0", PAKISTAN_COUNTRY_CODE);
  return formattedPhoneNumber;
};

export const localNumberFormat = (phoneNumber: string) => {
  const number = phoneNumber.startsWith(PAKISTAN_COUNTRY_CODE)
    ? "0" + phoneNumber.slice(2)
    : phoneNumber;
  return number;
};
