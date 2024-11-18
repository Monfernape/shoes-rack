"use client";
import { Cookies } from "@/constant/constant";
import { getCookies } from "@/utils/cookiesManager";
import { useState, useEffect } from "react";


export const useGetLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState();

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
