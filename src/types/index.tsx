export type UserRole = "incharge" | "member" | "shift-incharge";
export type UserStatus = "active" | "inactive" | "pending";


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

export type UserDetails = {
  name: string;
  phone: string;
  age: number;
  cnic: string;
  ehadDuration: string;
  shift: string;
  role: UserRole;
  address: string;
  status: UserStatus;
};
