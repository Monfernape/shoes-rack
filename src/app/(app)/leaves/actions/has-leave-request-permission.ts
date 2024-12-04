import {
  LeaveRequestStatus,
  MemberRole,
} from "@/constant/constant";
import { getLoggedInUser } from "@/utils/getLoggedInUser";
import { getLeaveRequestById } from "./get-leave-request-by-id";

export const hasLeaveRequestPermission = async (id: number): Promise<boolean> => {
    const loginUser = await getLoggedInUser();
    const leaveRequest = await getLeaveRequestById(id);
  
    if (!loginUser || !leaveRequest) {
      return false;
    }
  
    const { role, id: userId } = loginUser;
    const { status, memberId } = leaveRequest;
  
    if (role === MemberRole.Member && status !== LeaveRequestStatus.Pending) {
      return false;
    }
  
    if (role === MemberRole.ShiftIncharge && memberId === userId && status !== LeaveRequestStatus.Pending) {
      return false;
    }
  
    if (role === MemberRole.Incharge) {
      return false;
    }

    return true;
  };
