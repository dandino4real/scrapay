import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const userPermissions = req?.user?.permissions || [];

    const requiredPermissions =
      this.reflector.get('permissions', context.getHandler()) || [];
    const hasAllRequiredPermissuons = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
    if (requiredPermissions.length === 0 || hasAllRequiredPermissuons) {
      return true;
    }

    throw new ForbiddenException('Insufficient Permission');
  }
}
