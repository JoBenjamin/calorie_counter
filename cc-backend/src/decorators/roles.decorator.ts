import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from 'src/user/user.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRolesEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
