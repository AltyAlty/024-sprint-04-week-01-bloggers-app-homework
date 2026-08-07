import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { BlogsService } from '../../application/blogs/blogs.service';
import { BlogsQueryService } from '../../application/blogs/blogs.query-service';
import { CreateBlogInputDTO } from './input-dto/create-blog.input-dto';
import { GetBlogListQueryInputDTO } from './input-dto/query/get-blog-list-query.input-dto';
import { UpdateBlogInputDTO } from './input-dto/update-blog.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { BlogOutputDTO } from './output-dto/blog.output-dto';
import { SETTINGS } from '../../../../core/settings/settings';

/*Контроллер для блогов.*/
@Controller(SETTINGS.BLOGS_PREFIX)
export class BlogsController {
  constructor(
    private blogsQueryService: BlogsQueryService,
    private blogsService: BlogsService
  ) {}

  /*001. POST-запрос по созданию блога.*/
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() body: CreateBlogInputDTO): Promise<BlogOutputDTO> {
    /*Просим сервис "blogsService" создать блог.*/
    const blogId: string = await this.blogsService.create(body);
    /*Просим сервис "blogsService" найти созданный блог по ID.*/
    return await this.blogsService.findById(blogId);
  }

  /*002. GET-запрос по поиску блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Get(SETTINGS.GET_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.OK)
  async getBlogById(@Param('id') id: string): Promise<BlogOutputDTO> {
    /*Просим query-сервис "blogsQueryService" найти блог по ID.*/
    return await this.blogsQueryService.findById(id);
  }

  /*003. GET-запрос по поиску блогов с пагинацией, используя query-параметры.*/
  @Get()
  async getBlogList(@Query() query: GetBlogListQueryInputDTO): Promise<PaginationMetaDataOutputDTO<BlogOutputDTO[]>> {
    /*Просим query-сервис "blogsQueryService" найти блоги.*/
    return await this.blogsQueryService.findAll(query);
  }

  /*004. PUT-запрос по изменению блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Put(SETTINGS.UPDATE_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBlogById(@Param('id') id: string, @Body() body: UpdateBlogInputDTO): Promise<void> {
    /*Просим сервис "blogsService" изменить блог по ID.*/
    await this.blogsService.update(id, body);
  }

  /*005. DELETE-запрос по удалению блога по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Delete(SETTINGS.DELETE_BLOG_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlogById(@Param('id') id: string): Promise<void> {
    /*Просим сервис "blogsService" удалить блог по ID.*/
    await this.blogsService.delete(id);
  }
}
