import { AttendanceStatus, MemberRole, Shift, UserStatus } from "@/constant/constant";



export type UserRole = "incharge" | "member" | "shift_incharge";

export type AttendanceReportStatus =
  | "excellent"
  | "good"
  | "verygood"
  | "average"
  | "low";

export type Member = {
  id: number;
  created_at: string;
  name: string;
  phoneNumber: string;
  date_of_birth: string;
  cnic: string;
  address: string;
  ehad_duration: string;
  role: MemberRole;
  status: UserStatus;
  shift: Shift;
  invite_link: string;
  temporary_password: boolean;
};
export type UserInfo = {
  id: number;
  shift: string;
  name: string;
  phone: string;
  role: MemberRole;
  status: UserStatus;
};

export interface User extends UserInfo {
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface Breadcrumbs {
  href: string;
  label: string;
}

export type UserDetails = {
  id: number;
  name: string;
  phoneNumber: string;
  cnic: string;
  ehad_duration: string;
  shift: string;
  role: MemberRole
  address: string;
  status: UserStatus;
  created_at: string;
  date_of_birth: string;
  invite_link: string;
  temporary_password: boolean;
};

export interface MembersProps {
  data: Member[];
  success: boolean;
  message: string;
}

export enum LeavesRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Reject = "rejected",
}

export interface LeaveRequestsTypes {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: LeavesRequestStatus;
  reason: string;
  requestedBy: string;
}

export enum RequestActionTitles {
  Edit = "edit",
  Delete = "delete",
  Approve = "approve",
  Reject = "reject",
  ViewDetails = "view details",
}

export interface Attendance {
  member: string;
  id: number;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
  created_at: string;
  memberId: number;
  name: string;
  shift: Shift;
}
