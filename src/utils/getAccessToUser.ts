import { LeaveRequestStatus, MemberRole } from "@/constant/constant";
import { UserRole } from "@/types";

interface Props {
  loggedUserId: number;
  loggedUserRole: UserRole;
  status: string;
  memberId: number;
}

export const getAccessToUser = ({
  loggedUserId,
  loggedUserRole,
  status,
  memberId,
}: Props) => {

  // Validate All Props
  if (!loggedUserId || !memberId || !loggedUserRole || !status) {
    return false;
  }

  // Member can only view pending leave requests or attendance
  if (
    loggedUserRole === MemberRole.Member &&
    status !== LeaveRequestStatus.Pending
  ) {
    return false;
  }

  // Shift Incharge can manage their own leave request or attendance only if status is 'Pending'
  if (
    loggedUserRole === MemberRole.ShiftIncharge &&
    loggedUserId === memberId &&
    status !== LeaveRequestStatus.Pending
  ) {
    return false;
  }

  // If none of the above conditions were met, grant access
  return true;
};
