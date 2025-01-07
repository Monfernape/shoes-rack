import React from 'react'
import { getLoggedInUser } from '@/utils/getLoggedInUser'
import { Dashboard } from './components/Dashboard';

const Page = async() => {
  const loggedUser = await getLoggedInUser();
 

  return <Dashboard loggedUser={loggedUser} />
}

export default Page;