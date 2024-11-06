export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "A" | "B" | "C" | "D";
export type UserStatus = "active" | "inactive";
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