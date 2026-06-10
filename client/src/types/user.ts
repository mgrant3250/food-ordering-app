export type UserRole = "user" | "admin";

export type User = {
  _id: string;
  email: string;
  role: UserRole;
};

export type AuthUser = {
  email: string;
  role: UserRole
}