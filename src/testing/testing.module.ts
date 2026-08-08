import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingController } from './api/testing.controller';
import { TestingService } from './application/testing.service';
import { Blog, BlogSchema } from '../modules/blog/domain/blogs/blog.entity';
import { Comment, CommentSchema } from '../modules/blog/domain/comments/comment.entity';
import { CommentLikeData, CommentLikeDataSchema } from '../modules/blog/domain/comments/comment-like-data.entity';
import { Post, PostSchema } from '../modules/blog/domain/posts/post.entity';
import { PostLikeData, PostLikeDataSchema } from '../modules/blog/domain/posts/post-like-data.entity';
import { User, UserSchema } from '../modules/user/domain/users/user.entity';

/*Модуль для тестирования приложения.*/
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: PostLikeData.name, schema: PostLikeDataSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: CommentLikeData.name, schema: CommentLikeDataSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
