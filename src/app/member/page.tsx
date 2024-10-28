import React from "react";
import { MemberList } from "./components/MemberList";
import { MemeberHeader } from "./components/MemeberHeader";

const Page = () => {
  return (
    <div>
      <MemeberHeader />
      <div className="p-2 lg:p-4">
        <MemberList />
      </div>
    </div>
  );
};

export default Page;
