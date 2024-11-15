"use server";
import { cookies } from "next/headers";

type Props = {
  name: string;
  values: unknown;
};
export const addCookies = ({ name, values }: Props) => {
  cookies().set(name, JSON.stringify(values), {
    httpOnly: true,
    secure: true,
  });
};

export const clearCookies = (values: string[]) => {
  values.map((name) => {
    cookies().delete(name);
  });
};

export const getCookies = (name: string) => {
  const cookie = cookies().get(name);
  if (cookie) {
    const values = JSON.parse(cookie.value);
    return values;
  } else {
    return null;
  }
};
