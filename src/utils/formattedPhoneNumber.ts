import { PAKISTAN_COUNTRY_CODE } from "@/constant/constant";

/**
 * Converts a phone number between local (`03...`) and international (`92...`) formats.
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number.
 */

export const formattedPhoneNumber = (phoneNumber: string): string => {
  const isIntlNumber = phoneNumber.startsWith(PAKISTAN_COUNTRY_CODE);
  if (isIntlNumber) {
    return "0" + phoneNumber.slice(PAKISTAN_COUNTRY_CODE.length);
  } else if (phoneNumber.startsWith("0")) {
    return phoneNumber.replace("0", PAKISTAN_COUNTRY_CODE);
  }
  return phoneNumber;
};
