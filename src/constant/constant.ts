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
export const SHIFT_TIMING = [
  {
    time: "Shift 12:00am to 00:06am",
    shift: Shift.ShiftA,
  },
  {
    time: "Shift 00:06am to 00:12pm",
    shift: Shift.ShiftB,
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    shift: Shift.ShiftC,
  },
  {
    time: "Shift 00:06pm to 00:12am",
    shift: Shift.ShiftD,
  },
];
