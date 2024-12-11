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

export enum AttendancePercentage {
  Excellent = 90,
  VeryGood = 80,
  Good = 70,
  Average = 60,
}

export enum MissingShoeStatus {
  Missing = "missing",
  Found = "found",
  OwnerNotified = "owner_notified",
  OwnerReceived = "owner_received",
  OwnerNotUpdated = "owner_not_updated",
  Closed = "closed",
}
