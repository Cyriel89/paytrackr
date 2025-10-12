import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './RolesDecorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<Array<string>>(ROLES_KEY, [
      ctx.getHandler(), ctx.getClass(),
    ]);
    if (!allowed || allowed.length === 0) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user; // injecté par JwtStrategy
    return user && allowed.includes(user.role);
  }
}
