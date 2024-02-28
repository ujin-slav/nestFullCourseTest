import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUser } from '../users/IUser';
import { User } from '../users/users.models';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Логин'})
    @ApiResponse({status: 200, type: User})
    @Post('/login')
    login(@Body() user: IUser){
    return this.authService.login(user)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: User})
    @Post('/registration')
    registration(@Body() user: IUser){
    return this.authService.registration(user)
    }

}
