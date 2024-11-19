import React from "react";
import { UserDetails } from "@/types";
import { MemberDetails } from "../../components/MemberDetails";

const userInfo: UserDetails = {
  id: 151,
  created_at: "2024-11-18T09:41:48.878344+00:00",
  name: "User0.4921083480408823",
  phoneNumber: "923444444444",
  date_of_birth: "2024-11-18",
  cnic: "31303-2943130-9",
  address: "Testing Street 12",
  ehad_duration: "2024-11-18",
  role: "incharge",
  status: "active",
  shift: "A",
  invite_link: "",
  temporary_password: false,
};

const page = () => {
  return (
    <div className="p-8">
      <MemberDetails userInfo={userInfo} />
    </div>
  );
};

export default page;
