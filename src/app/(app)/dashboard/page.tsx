import React from 'react'
import { Dashbord } from './components/Dashbord'
import { getLoggedInUser } from '@/utils/getLoggedInUser'

const page = async() => {
  const loggedUser = await getLoggedInUser();
  return <Dashbord loggedUser={loggedUser}/>
}

export default page