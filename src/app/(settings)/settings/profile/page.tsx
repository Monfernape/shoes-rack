import React from "react";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import Prfoile from "./components/Profile";

const Page = async () => {
  const loginUser = await getLoggedInUser();
  return (
   <Prfoile loginUser={loginUser}/>
  );
};

export default Page;
