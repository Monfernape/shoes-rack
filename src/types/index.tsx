import { FundSchemaType } from "@/app/(app)/funds/components/FundFormBuilder";
import {
  AttendanceStatus,
  LeaveTypes,
  MemberRole,
  NotificationType,
  MissingShoeStatus,
  Shift,
  UserStatus,
  DigestStatus,
} from "@/constant/constant";

export type UserRole = "incharge" | "member" | "shift_incharge";

export type Notifications = {
  id: number;
  member_id: number;
  title: string;
  is_read: boolean;
  created_at: string;
  sender_id: null | number;
  system_generated: boolean;
  description: string;
  type: NotificationType;
 
};

export type Digest = {
  id: number;
  created_at: string;
  status: DigestStatus;
  presents: number[]; 
  absents: number[];  
  leaves: number[];   
};

export enum AttendanceReviewStatus {
  Pending = "pending",
  Approve = "approved",
  Reject = "rejected",
  Leave = "leave"
}

type Attendances = Omit<
  Attendance,
  "memberId" | "created_at" | "member" | "status"
>;

export interface AttendanceReviewType extends Attendances {
  status: AttendanceReviewStatus;
}


export type AttendanceResponse = {
  id: number;
  memberId: number;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
  member: {
    name: string;
    shift: Shift;
  };
};
export type AttendanceReportStatus =
  | "excellent"
  | "good"
  | "verygood"
  | "average"
  | "low";

export type Member = {
  id: number;
  created_at: string;
  name: string;
  phoneNumber: string;
  date_of_birth: string;
  cnic: string;
  address: string;
  ehad_duration: string;
  role: MemberRole;
  status: UserStatus;
  shift: Shift;
  invite_link: string;
  temporary_password: boolean;
};
export type UserInfo = {
  id: number;
  shift: string;
  name: string;
  phone: string;
  role: MemberRole;
  status: UserStatus;
};

export interface User extends UserInfo {
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface Breadcrumbs {
  href: string;
  label: string;
}

export type UserDetails = {
  id: number;
  name: string;
  phoneNumber: string;
  cnic: string;
  ehad_duration: string;
  shift: Shift;
  role: MemberRole;
  address: string;
  status: UserStatus;
  created_at: string;
  date_of_birth: string;
  invite_link: string;
  temporary_password: boolean;
};
export type MemberDetails={
  id: number;
  memberId: number;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
  name: string;
  shift: Shift;
}

export interface MembersProps {
  data: Member[];
  success: boolean;
  message: string;
}

export enum LeavesRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Reject = "rejected",
}

export type LeaveRequestsTypes = {
  id: number;
  memberId: number;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  status: LeavesRequestStatus;
  reason: string;
};

export interface LeavesDigest extends LeaveRequestsTypes {
  members:MemberDetails;
  startTime: string;
  endTime: string;
}
export enum RequestActionTitles {
  Edit = "edit",
  Delete = "delete",
  Approve = "approve",
  Reject = "reject",
  ViewDetails = "view details",
}

export type Attendance = {
  member: string;
  id: number;
  startTime: string;
  endTime: string;
  status: AttendanceStatus;
  created_at: string;
  memberId: number;
  name: string;
  shift: Shift;
}
export interface AttendnaceDigest extends Attendance {
 members : MemberDetails

}
export type MissingShoeReport = {
  id: number;
  status: MissingShoeStatus;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerAddress: string;
  time: string;
  shoesToken: string;
  description: string;
  reportedBy:number;
};

export type Fund = {
  id: number;
  name: string;
  amount: number;
  created_at: Date;
  role:MemberRole;
  member_id:number;
  members:Member[]
};
export interface FundType extends FundSchemaType {
  id: number;
  createdAt: string;
}

export type attendanceDetailsType = {
  presentCount: number;
  absentCount: number;
  totalApprovedLeaveDays: number;
};
export type EventType = React.MouseEvent<HTMLElement>
