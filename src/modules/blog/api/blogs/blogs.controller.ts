import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { BlogsService } from '../../application/blogs/blogs.service';
import { PostsService } from '../../application/posts/posts.service';
import { BlogsQueryService } from '../../application/blogs/blogs.query-service';
import { PostsQueryService } from '../../application/posts/posts.query-service';
import { CreateBlogInputDTO } from './input-dto/create-blog.input-dto';
import { CreatePostForBlogInputDTO } from './input-dto/create-post-for-blog.input-dto';
import { GetBlogListQueryInputDTO } from './input-dto/query/get-blog-list-query.input-dto';
import { GetPostListByBlogIdQueryInputDTO } from './input-dto/query/get-post-list-by-blog-id-query.input-dto';
import { UpdateBlogInputDTO } from './input-dto/update-blog.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { PostOutputDTO } from '../posts/output-dto/post.output-dto';
import { PostListOutputDTO } from '../posts/output-dto/post-list.output-dto';
import { BlogOutputDTO } from './output-dto/blog.output-dto';
import { BlogListOutputDTO } from './output-dto/blog-list.output-dto';
import { SETTINGS } from '../../../../core/settings/settings';

/*Контроллер для блогов.*/
@Controller(SETTINGS.BLOGS_PREFIX)
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly blogsQueryService: BlogsQueryService,
    private readonly postsService: PostsService,
    private readonly postsQueryService: PostsQueryService
  ) {}

  /*001. POST-запрос по созданию блога.*/
  @Post(SETTINGS.CREATE_BLOG_PATH)
  @HttpCode(HttpStatus.CREATED)
  public async createBlog(@Body() body: CreateBlogInputDTO): Promise<BlogOutputDTO> {
    /*Просим сервис "blogsService" создать блог.*/
    const blogId: string = await this.blogsService.create(body);
    /*Просим сервис "blogsService" найти созданный блог по ID.*/
    return await this.blogsService.findById(blogId);
  }

  /*002. POST-запрос по созданию поста в блоге.*/
  @ApiParam({ name: 'blogId' })
  @Post(SETTINGS.CREATE_POST_FOR_BLOG_PATH)
  @HttpCode(HttpStatus.CREATED)
  public async createPostForBlog(
    @Param('blogId') id: string,
    @Body() body: CreatePostForBlogInputDTO
  ): Promise<PostOutputDTO> {
    /*Просим сервис "postsService" создать пост в блоге.*/
    const postId: string = await this.postsService.createForBlog(body, id);
    /*Просим сервис "postsService" найти созданный пост по ID.*/
    return await this.postsService.findById(postId);
  }

  /*003. GET-запрос по поиску блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Get(SETTINGS.GET_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.OK)
  public async getBlogById(@Param('id') id: string): Promise<BlogOutputDTO> {
    /*Просим query-сервис "blogsQueryService" найти блог по ID.*/
    return await this.blogsQueryService.findById(id);
  }

  /*004. GET-запрос по поиску блогов с пагинацией, используя query-параметры.*/
  @Get(SETTINGS.GET_BLOG_LIST_PATH)
  public async getBlogList(
    @Query() query: GetBlogListQueryInputDTO
  ): Promise<PaginationMetaDataOutputDTO<BlogListOutputDTO>> {
    /*Просим query-сервис "blogsQueryService" найти блоги.*/
    return await this.blogsQueryService.findAll(query);
  }

  /*005. GET-запрос по поиску постов с пагинацией по ID блога, используя query-параметры.*/
  @ApiParam({ name: 'blogId' })
  @Get(SETTINGS.GET_POST_LIST_BY_BLOG_ID_PATH)
  public async getPostListByBlogId(
    @Param('blogId') id: string,
    @Query() query: GetPostListByBlogIdQueryInputDTO
  ): Promise<PaginationMetaDataOutputDTO<PostListOutputDTO>> {
    /*Просим query-сервис "postsQueryService" найти посты по ID блога.*/
    return await this.postsQueryService.findAll(query, id);
  }

  /*006. PUT-запрос по изменению блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Put(SETTINGS.UPDATE_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateBlogById(@Param('id') id: string, @Body() body: UpdateBlogInputDTO): Promise<void> {
    /*Просим сервис "blogsService" изменить блог по ID.*/
    await this.blogsService.update(id, body);
  }

  /*007. DELETE-запрос по удалению блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Delete(SETTINGS.DELETE_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteBlogById(@Param('id') id: string): Promise<void> {
    /*Просим сервис "blogsService" удалить блог по ID.*/
    await this.blogsService.delete(id);
  }
}
