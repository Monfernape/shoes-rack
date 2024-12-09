import React from 'react'
import { getLoggedInUser } from '@/utils/getLoggedInUser'
import { AttendanceReview } from '../components/CurrentAttendance';

const Page = async() => {
  const loginUser = await getLoggedInUser();
  return (
    <div>
       <AttendanceReview loginUser={loginUser} />
    </div>
  )
}

export default Page