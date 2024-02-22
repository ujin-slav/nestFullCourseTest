import { Body, Controller, Get, Param,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Post as dtoPost} from './posts.models';
import { PostsService } from './posts.service';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({summary: 'Создание поста'})
    @ApiResponse({status: 200, type: dtoPost})
    @Post('/createpost')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: 'public/img',
            filename: (req, file, cb) => {
              cb(null, file.originalname);
            },
          }),
        }),
    )
    create(@UploadedFile() file: Express.Multer.File){
        return {
            statusCode: 200,
            data: file.path,
          };
        //return this.postsService.createPost(post);
    }

    @ApiOperation({summary: 'Получение поста'})
    @ApiResponse({status: 200, type: dtoPost})
    @Get('/:id')
    getUserPost(@Param('id') id: number){
    return this.postsService.getUserPost(id);
    }
}

