import type { TUserRole } from "./common.type";

export type TProfile = {
  _id: string;
  email: string;
  role: TUserRole;
  name: string | null;
  profileImage: string | null;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}