export enum Routes {
    dashboard = "/dashboard",
    notification = "/notification",
    attendance = "/attendance",
    mark_attendance = "/mark-attendance",
    fund = "/fund",
    member = "/member",
    add_member = "/add-member",
    shift_incharge = "/shift-incharge",
    add_shift_incharge = "/add-shift-incharge",
    missing_shoes = "/missing-shoes",
    add_missing_shoes = "/add-missing-shoes",
    leave_request = "/leave-request",
    add_leave_request = "/add-leave-request",
}

export const routes_title = [
    {
        name: "Dashboard",
        route: "/dashboard",
    },
    {
        name: "Notifications",
        route: Routes.notification,
    },
    {
        name: "Attendance",
        route: Routes.attendance,
    },
    {
        name: "Members",
        route: Routes.member,
    },
    {
        name: "Shift Incharge",
        route: Routes.shift_incharge,
    },
    {
        name: "Leave Requests",
        route: Routes.mark_attendance,
    },
    {
        name: "Missing Shoes",
        route: Routes.missing_shoes,
    },
    {
        name: "Funds",
        route: Routes.fund,
    },
    {
        name: "New Member",
        route: Routes.add_member,
    },
    {
        name: "New Shift Incharge",
        route: Routes.add_shift_incharge,
    },
    {
        name: "New Leave Request",
        route: Routes.add_leave_request,
    },
    {
        name: "New Missing Sheos",
        route: Routes.add_missing_shoes,
    },
];
