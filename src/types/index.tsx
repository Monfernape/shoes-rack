export type UserRole = "incharge" | "member" | "shift-incharge";
export type UserStatus = "active" | "invited";
export type LeaveType = 'sick' | 'vacation' | 'personal'
export type RequestStatus = 'pending' | 'approval' | 'rejected'
export interface Member {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface BreadcrumbLinkType {
  href: string;
  label: string;
}

export type Leave  = {
  id:number;
  leaveType : LeaveType 
  startDate: string;
  EndDate: string;
  reasonForLeave: string;
  status : RequestStatus
  requestedBy: string;
  requestedTo : string;
  phoneNumber: string
}