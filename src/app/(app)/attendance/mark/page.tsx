import React from 'react'
import { CurrentAttendance } from '../components/CurrentAttendance'
import { getLoggedInUser } from '@/utils/getLoggedInUser'

const Page = async() => {
  const loginUser = await getLoggedInUser();
  return (
    <div>
       <CurrentAttendance loginUser={loginUser} />
    </div>
  )
}

export default Page