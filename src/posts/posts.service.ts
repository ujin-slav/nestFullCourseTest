import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.models';

@Injectable()
export class PostsService {
    
    constructor(
        @InjectModel(Post)
        private postModel: typeof Post,
    ) {}

    async createPost(post: IPost): Promise<Post>{
        return this.postModel.create(post);
    }

    async getUserPost(id: number): Promise<Post[]>{
        return this.postModel.findAll({where:{userId:id}});
    }
}
