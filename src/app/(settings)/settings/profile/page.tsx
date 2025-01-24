import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import {Profile} from "./components/Profile";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  return (
   <Profile loginUser={loginUser}/>
  );
};

export default Page;
