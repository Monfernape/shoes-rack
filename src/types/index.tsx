export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "shift_a" | "shift_b" | "shift_c" | "shift_d";
export type UserStatus = "active" | "invited";
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

export type UserFormSchema = {
  name: string;
  phoneNumber: string;
  cnic: string;
  date_of_birth: Date;
  address: string;
  ehad_start_date: Date;
  role: UserRole;
  shift: Shifts;
};
