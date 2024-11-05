export enum Routes {
  Login = "/login",
  Dashboard = "/dashboard",
  Notification = "/notification",
  Attendance = "/attendance",
  MarkAttendance = "/mark-attendance",
  Fund = "/fund",
  Member = "/member",
  AddMember = "/member/add",
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

export enum UserRole {
  Incharge = "incharge",
  Member = "member",
  ShiftIncharge = "shift-incharge",
}

export enum UserStatus {
  Active = "active",
  Invited = "invited",
}
