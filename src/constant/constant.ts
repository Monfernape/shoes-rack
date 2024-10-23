export enum UserRole {
  Member = "member",
  Incharge = "incharge",
  ShiftIncharge = "shift_incharge",
  SuperIncharge = "super_admin",
}

export enum ShiftTiming {
  ShiftA = "shift_a",
  ShiftB = "shift_b",
  ShiftC = "shift_c",
  ShiftD = "shift_d",
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
}
export const User = [
  {
    role: "Member",
    value: UserRole.Member,
  },
  {
    role: "Incharge",
    value: UserRole.Incharge,
  },
  {
    role: "Shift Incharge",
    value: UserRole.ShiftIncharge,
  },
];

export const Duties = [
  {
    time: "Shift 12:00am to 00:06am",
    value: "shift_a",
  },
  {
    time: "Shift 00:06am to 00:12pm",
    value: "shift_b",
  },
  {
    time: "Shift 00:12pm to 00:06pm",
    value: "shift_c",
  },
  {
    time: "Shift 00:06pm to 00:12am",
    value: "shift_d",
  },
];
