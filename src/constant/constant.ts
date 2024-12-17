export enum MemberRole {
  Incharge = "incharge",
  ShiftIncharge = "shift_incharge",
  Member = "member",
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
  Deactivated = "deactivated",
}

export const PAKISTAN_COUNTRY_CODE = "92";

export enum LeaveTypes {
  Sick = "sick",
  Vacation = "vacation",
  Personal = "personal",
}

export enum LeaveRequestStatus {
  Pending = "pending",
  Approve = "approved",
  Reject = "rejected",
}

export enum AttendanceStatus {
  Pending = "pending",
  Approve = "approve",
  Reject = "reject",
}

export enum Cookies {
  LoginUser = "loginUser",
  Session = "session",
}

export enum AttendanceProgress {
  Excellent = "excellent",
  VeryGood = "verygood",
  Good = "good",
  Average = "average",
  low = "low",
}

export enum NotificationType {
  Attendance = "attendance",
  Leave = "leave",
  MissingShoes = "missing_shoes",
  MonthlyReport = "monthly_report",
  Fund = "fund",
}
export enum AttendancePercentage {
  Excellent = 90,
  VeryGood = 80,
  Good = 70,
  Average = 60,
}

export enum ShoesTyes {
  Sneakers = "sneakers",
  Boots = "boots",
  Sandals = "sandals",
  DressShoes = "dress-shoes",
  Formal = "formal",
  Other = "other",
}

export enum MissingShoeStatus {
  Missing = "missing",
  Found = "found",
}
