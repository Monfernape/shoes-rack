import React from 'react'
import { DashbordView } from './components/DashbordView'
import { getLoggedInUser } from '@/utils/getLoggedInUser'

const page = async() => {
  const loggedUser = await getLoggedInUser();
  return (
    <div><DashbordView loggedUser={loggedUser}/></div>
  )
}

export default page