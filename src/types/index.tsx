export type UserRole = "incharge" | "member" | "shift-incharge";
export type UserStatus = "active" | "inactive";
export interface Member {
  id: number;
  name: string;
  phone: string;
  shift_id: number;
  role: UserRole;
  status: UserStatus;
}
