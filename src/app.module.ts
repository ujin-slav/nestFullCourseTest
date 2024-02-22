
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.models';
import { User } from './users/users.models';
import { UserRoles } from './roles/user_roles.models';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { Post } from './posts/posts.models';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
		}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Role,UserRoles,Post],
      autoLoadModels:true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule
  ],
  providers: [AppService],
})
export class AppModule {}

