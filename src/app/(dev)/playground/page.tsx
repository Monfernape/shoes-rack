import React from "react";
import FormWrapper from "@/common/FormWrapper";
import AddDevUserForm from "./components/AddDevUserForm";
import UpdateDevUserFrom from "./components/UpdateDevUserForm";

const Page = () => {
  return (
    <FormWrapper>
    <h1 className="text-xl font-bold my-6">Play Ground</h1>
      <AddDevUserForm />
      <UpdateDevUserFrom />
    </FormWrapper>
  );
};

export default Page;
