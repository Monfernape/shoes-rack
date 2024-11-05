export type UserRole = "incharge" | "member" | "shift-incharge";

export type Shifts = "A" | "B" | "C" | "D";

export enum Routes {
  Login = "/login",
  Dashboard = "/dashboard",
  Notification = "/notification",
  Attendance = "/attendance",
  MarkAttendance = "/mark-attendance",
  Fund = "/fund",
  Member = "/members",
  AddMember = "/member/add",
  MemberDetials = "member/detials/:id",
  ShiftIncharge = "/shift-incharge",
  MissingShoes = "/missing-shoes",
  AddMissingShoes = "/add-missing-shoes",
  LeaveRequest = "/leave-request",
  AddLeaveRequest = "/add-leave-request",
}

export enum MemberRole {
  Incharge = "incharge",
  ShiftIncharge = "shift-incharge",
  Member = "member",
  SuperAdmin = "super_admin",
}

export enum UserStatus {
  Active = "active",
  Invited = "invited",
  Inactive="inactive"
}

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
