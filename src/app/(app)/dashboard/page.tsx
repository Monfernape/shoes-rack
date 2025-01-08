import React from 'react'
import { getLoggedInUser } from '@/utils/getLoggedInUser'
import { Dashboard } from './components/Dashboard';
import { getAttendanceReportByMemberId } from '../attendance-report/actions/get-attendance-report-by-id';
const Page = async() => {
  const loggedUser = await getLoggedInUser();
  const attendanceDetails = await getAttendanceReportByMemberId(loggedUser.id);
  
 

  return <Dashboard loggedUser={loggedUser} attendanceDetails={attendanceDetails}/>
}

export default Page;