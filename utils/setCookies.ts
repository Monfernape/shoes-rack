import { cookies } from "next/headers";
type Props = {
  name: string;
  values: any;
};
export const setCookies = ({ name, values }: Props) => {
  cookies().set(name, JSON.stringify(values), {
    httpOnly: true,
    secure: true,
  });
};
