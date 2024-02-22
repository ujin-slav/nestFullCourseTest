import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.models';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { Role } from 'src/roles/roles.models';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [SequelizeModule.forFeature([User,Role]),JwtModule.register({
    secret: '123456',
    signOptions: {
      expiresIn: '24h'
    }
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
