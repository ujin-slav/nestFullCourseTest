import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
      
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Нет авторизации');
            }
            const authToken = authorization.replace(/bearer/gim, '').trim();
            const resp = await this.jwtService.verify(authToken);
            request.decodedData = resp;
            return true;
        } catch (error) {
            console.log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'Сессия истекла');
        }
    }
}