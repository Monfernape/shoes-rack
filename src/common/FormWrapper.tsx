import React from "react";

type Props = {
  children: React.ReactNode;
};
const FormWrapper = ({ children }: Props) => {
  return (
    <div className=" px-2 md:p-8 mx-auto sm:w-3/4 w-full bg-white rounded h-full">
      {children}
    </div>
  );
};

export default FormWrapper;
