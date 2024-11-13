"use server"
import { cookies } from "next/headers";

type Props = {
  name: string;
  values: any;
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