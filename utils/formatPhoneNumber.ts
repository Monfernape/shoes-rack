export const formatPhoneNumber = (phoneNumber: string) => {
  const formattedPhoneNumber = phoneNumber.replace("-", "").replace("0", "92");

  console.log({ formattedPhoneNumber });

  return formattedPhoneNumber.toString();
};
