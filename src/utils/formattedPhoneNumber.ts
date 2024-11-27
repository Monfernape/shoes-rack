import { PAKISTAN_COUNTRY_CODE } from "@/constant/constant";

/**
 * Converts a phone number between local (`03...`) and international (`92...`) formats.
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number.
 */

export const intlNumberFormat = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber
    .replace("-", "")
    .replace("0", PAKISTAN_COUNTRY_CODE);
  return formattedPhoneNumber;
};

export const localNumberFormat = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber.startsWith(PAKISTAN_COUNTRY_CODE)
    ? "0" + phoneNumber.slice(2)
    : phoneNumber;
  return formattedPhoneNumber;
};