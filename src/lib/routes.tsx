export enum Routes {
  Login = "/login",
  Dashboard = "/dashboard",
  Notification = "/notification",
  Attendance = "/attendance",
  MarkAttendance = "/mark-attendance",
  Fund = "/fund",
  Member = "/members",
  AddMember = "/members/add",
  ShiftIncharge = "/shift-incharge",
  MissingShoes = "/missing-shoes",
  AddMissingShoes = "/add-missing-shoes",
  LeaveRequest = "/leaves",
  AddLeaveRequest = "/leaves/add",
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
