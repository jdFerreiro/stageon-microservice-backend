
interface JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId?: string;
  roleName?: string;
}
export type { JwtPayload };
