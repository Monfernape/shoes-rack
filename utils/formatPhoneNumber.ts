export const formatPhoneNumber = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber.replace("-", "").replace("0", "92");
  return formattedPhoneNumber;
};
