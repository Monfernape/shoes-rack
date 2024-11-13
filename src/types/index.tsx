export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "A" | "B" | "C" | "D";
export type UserStatus = "active" | "inactive";
export interface Member {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

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
  name: string;
  phone: string;
  age: number;
  cnic: string;
  ehadDuration: string;
  shift: string;
  role: UserRole;
  address: string;
  status: UserStatus;
};

export interface MembersProps {
  data: Member[];
  success: boolean;
  message: string;
}

export interface LeaveRequestsTypes {
  id?: number;
  leaveType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  reason?: string;
  requestedBy?: string;
}

export enum LeavesRequestStatus {
  Pending = "pending",
  Accept = "accepted",
  Reject = "rejected",
}

export enum AttendanceStatus {
  Pending = "pending",
  Accept = "accept",
  Reject = "reject",
}

export enum Table {
  Attendance = "attendance",
  Member = "member",
  User = "user",
}
