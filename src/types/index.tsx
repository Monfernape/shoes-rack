export type UserRole = "incharge" | "member" | "shift-incharge";
export type UserStatus = "active" | "invited";
export interface Member {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface Breadcrumbs {
  href: string;
  label: string;
}
