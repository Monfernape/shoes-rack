export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "A" | "B" | "C" | "D";
export type UserStatus = "active" | "inactive";
export type AttendanceStatus = "pending" | "approved"

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

export interface Member {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export type UserFormSchema = {
  name: string;
  phoneNumber: string;
  cnic: string;
  date_of_birth: Date;
  address: string;
  ehad_start_date: Date;
  role: UserRole;
  shift: Shifts;
};

export interface LeaveRequestData {
  memberId: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reasonForLeave: string;
  status: string;
}
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
  reasonForLeave?: string;
  requestedBy?: string;
}

export enum LeavesRequestStatus {
  Pending = "pending",
  Accept = "accept",
  Reject = "reject",
}

export enum Table {
  Attendance = "attendance",
  Member = "member",
  User = "user",
}
