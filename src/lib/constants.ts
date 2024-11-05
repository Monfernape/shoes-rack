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
}
