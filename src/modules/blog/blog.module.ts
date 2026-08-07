import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './api/blogs/blogs.controller';
import { BlogsService } from './application/blogs/blogs.service';
import { BlogsQueryService } from './application/blogs/blogs.query-service';
import { BlogsRepository } from './infrastructure/blogs/blogs.repository';
import { BlogsQueryRepository } from './infrastructure/blogs/blogs.query-repository';
import { Blog, BlogSchema } from './domain/blogs/blog.entity';

/*Модуль для блогов, постов и комментариев.*/
@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsQueryService, BlogsRepository, BlogsQueryRepository],
  exports: [],
})
export class BlogModule {}
