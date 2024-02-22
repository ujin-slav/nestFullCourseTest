import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async  canActivate(context: ExecutionContext): Promise<boolean> {
    try {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
          return true;
        }
        const request = context.switchToHttp().getRequest();
        const { authorization }: any = request.headers;
        if (!authorization || authorization.trim() === '') {
            throw new UnauthorizedException('Нет авторизации');
        }
        const authToken = authorization.replace(/bearer/gim, '').trim();
        const user = this.jwtService.verify(authToken)
        if (user.id===12) {
            return true
        }
    } catch (error) {
        throw new UnauthorizedException('Нет авторизации');
    }
    return false;
  }
}