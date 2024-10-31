import React from 'react'
import { MemberDetials } from '../../components/MemberDetials'
import { UserDetails } from '@/types';

const userInfo: UserDetails = {
  name: "Ahmed Khan",
  phone: "+92 300 1234567",
  age: 35,
  cnic: "35202-1234567-1",
  ehadDuration: "2 years",
  shift: "A",
  role: "incharge",
  address: "123 Main St, Lahore, Punjab, Pakistan",
  status: "active",
};

const page = () => {
  return (
    <div className="p-8">
      <MemberDetials userInfo={userInfo} />
    </div>
  )
}

export default page