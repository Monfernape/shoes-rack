"use client";
import { Cookies, UserRole } from "@/constant/constant";
import { UserDetails } from "@/types";
import { getCookies } from "@/utils/cookiesManager";
import { useState, useEffect } from "react";

export const useUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserDetails>();
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await getCookies(Cookies.LoginUser);

        setLoggedInUser(response);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);
  return loggedInUser;
};
