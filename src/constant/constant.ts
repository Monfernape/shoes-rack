export enum MemberRole {
  Incharge = "incharge",
  ShiftIncharge = "shift-incharge",
  Member = "member",
  SuperAdmin = "super_admin",
}

export enum UserRole {
  Member = "member",
  Incharge = "incharge",
  ShiftIncharge = "shift_incharge",
  SuperAdmin = "super_admin",
}

export enum Shift {
  ShiftA = "A",
  ShiftB = "B",
  ShiftC = "C",
  ShiftD = "D",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Invited = "invited",
}

export const PAKISTAN_COUNTRY_CODE = "92";

export enum LeaveTypes {
  Sick = "sick",
  Vacation = "vacation",
  Personal = "personal",
}

export enum LeaveRequestStatus {
  Pending = "pending",
  Accept = "accepted",
  Reject = "rejected",
}

export enum AttendanceStatus {
  Pending = "pending",
  Accept = "accept",
  Reject = "reject",
}

export enum Cookies {
  LoginUser = "loginUser",
  Session = "session"

}
