import { Role } from 'src/auth/role.enum';

export type UserDetails = {
  email: string;
  displayName: string;
  role: Role;
};
