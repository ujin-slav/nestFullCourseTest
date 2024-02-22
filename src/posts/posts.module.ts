import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {Post} from './posts.models';

@Module({
    imports: [SequelizeModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
