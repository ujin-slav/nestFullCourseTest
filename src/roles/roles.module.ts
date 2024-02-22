import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.models';
import { RolesController } from './roles.controller';
import { Role } from './roles.models';
import { RolesService } from './roles.service';
import { UserRoles } from './user_roles.models';

@Module({
    imports: [SequelizeModule.forFeature([Role,User,UserRoles])],
    controllers: [RolesController],
    providers: [RolesService],
  })
export class RolesModule {}
