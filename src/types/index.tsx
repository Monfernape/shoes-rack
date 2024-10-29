export type UserRole = "incharge" | "member" | "shift-incharge";
export type Shifts = "A" | "B" | "C" | "D";
export type UserStatus = "active" | "inactive";
export interface Member {
  shift: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
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
