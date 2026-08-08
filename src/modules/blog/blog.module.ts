import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './api/blogs/blogs.controller';
import { PostsController } from './api/posts/posts.controller';
import { BlogsService } from './application/blogs/blogs.service';
import { PostsService } from './application/posts/posts.service';
import { BlogsQueryService } from './application/blogs/blogs.query-service';
import { PostsQueryService } from './application/posts/posts.query-service';
import { BlogsRepository } from './infrastructure/blogs/blogs.repository';
import { PostsRepository } from './infrastructure/posts/posts.repository';
import { BlogsQueryRepository } from './infrastructure/blogs/blogs.query-repository';
import { PostsQueryRepository } from './infrastructure/posts/posts.query-repository';
import { Blog, BlogSchema } from './domain/blogs/blog.entity';
import { Post, PostSchema } from './domain/posts/post.entity';
import { PostLikeData, PostLikeDataSchema } from './domain/posts/post-like-data.entity';

/*Модуль для блогов, постов и комментариев.*/
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: PostLikeData.name, schema: PostLikeDataSchema },
    ]),
  ],
  controllers: [BlogsController, PostsController],
  providers: [
    BlogsService,
    BlogsQueryService,
    BlogsRepository,
    BlogsQueryRepository,
    PostsService,
    PostsQueryService,
    PostsRepository,
    PostsQueryRepository,
  ],
  exports: [],
})
export class BlogModule {}
