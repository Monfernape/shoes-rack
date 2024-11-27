export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "A" | "B" | "C" | "D";
export type UserStatus = "active" | "inactive" | "deactivated";
export type Member = {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
};
export type UserInfo = {
  id: number;
  shift: string;
  name: string;
  phone: string;
  role: UserRole;
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
  role: UserRole;
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
  id?: number;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  status?: LeavesRequestStatus;
  reason?: string;
  requestedBy?: string;
}

export enum RequestActionTitles {
  Edit = "edit",
  Delete = "delete",
  Approve = "approve",
  Reject = "reject",
  ViewDetails = "view details",
}

export enum Table {
  Attendance = "attendance",
  Member = "member",
  User = "user",
}
