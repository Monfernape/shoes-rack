export type UserRole = "incharge" | "member" | "shift-incharge";
export type UserStatus = "active" | "inactive" ;

export interface BreadcrumbLinkType {
  href: string;
  label: string;
}

export type UserInfo = {
  id: number;
  shift: string;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface User extends UserInfo  {
    address: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

