import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../roles/roles.models';
import { UsersController } from './users.controller';
import { User } from './users.models';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';


@Module({
  imports: [SequelizeModule.forFeature([User,Role]),AuthModule],
  controllers: [UsersController],
  providers: [UsersService,UsersResolver]
})
export class UsersModule {}
