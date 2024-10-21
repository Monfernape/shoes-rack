export enum Routes {
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

export const RoutesTitle = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Notifications",
    route: Routes.Notification,
  },
  {
    name: "Attendance",
    route: Routes.Attendance,
  },
  {
    name: "Members",
    route: Routes.Member,
  },
  {
    name: "Shift incharge",
    route: Routes.ShiftIncharge,
  },
  {
    name: "Leave Requests",
    route: Routes.LeaveRequest,
  },
  {
    name: "Missing Shoes",
    route: Routes.MissingShoes,
  },
  {
    name: "Funds",
    route: Routes.Fund,
  },
  {
    name: "New Member",
    route: Routes.AddMember,
  },
  {
    name: "New Leave Request",
    route: Routes.AddLeaveRequest,
  },
  {
    name: "New Missing Sheos",
    route: Routes.AddMissingShoes,
  },
];
