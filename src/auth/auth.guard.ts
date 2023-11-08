// src/auth/auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from './jwt.strategy'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtStrategy.validate(token);

      if (payload) {
        return true;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
