import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.models';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post('/createrole')
    create(@Body() role: IRole){
    return this.rolesService.createRole(role);
    }

    @ApiOperation({summary: 'Получение роли'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:id')
    getRoleById(@Param('id') id: number){
    return this.rolesService.getRoleById(id);
    }

}
