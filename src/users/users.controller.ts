import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { IUser } from './IUser';
import { User } from './users.models';
import { UsersService } from './users.service';

export class updateDto{
    id:number;
    email:string;
}

@ApiTags('Пользователи')
@UseGuards(RolesGuard)
@Controller('/api')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'Создание юзера'})
    @ApiResponse({status: 200, type: User})
    @Post('/createuser')
    @UsePipes(ValidationPipe)
    create(@Body() user: IUser){
    return this.usersService.createUser(user);
    }

    @Post('/update')
    @UsePipes(ValidationPipe)
    update(@Body() dto:updateDto){
        return this.usersService.updateUser(dto);
    }

    //@UseGuards(AuthGuard)
    //@Roles('admin')
    @ApiOperation({summary: 'Получить всех юзеров'})
    @ApiResponse({status: 200, type: [User]})
    @Get('/getusers')
        getUsers():Promise<User[]>{
        return this.usersService.findAll();
    }
}
