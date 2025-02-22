export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LIST = [ROLES.USER, ROLES.ADMIN] as const;
