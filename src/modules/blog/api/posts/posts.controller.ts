import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { PostsService } from '../../application/posts/posts.service';
import { CommentsQueryService } from '../../application/comments/comments.query-service';
import { PostsQueryService } from '../../application/posts/posts.query-service';
import { CreatePostInputDTO } from './input-dto/create-post.input-dto';
import { GetCommentListByPostIdQueryInputDTO } from './input-dto/query/get-comment-list-by-post-id-query.input-dto';
import { GetPostListQueryInputDTO } from './input-dto/query/get-post-list-query.input-dto';
import { UpdatePostInputDTO } from './input-dto/update-post.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { CommentListOutputDTO } from '../comments/output-dto/comment-list.output-dto';
import { PostOutputDTO } from './output-dto/post.output-dto';
import { PostListOutputDTO } from './output-dto/post-list.output-dto';
import { SETTINGS } from '../../../../core/settings/settings';

/*Контроллер для постов.*/
@Controller(SETTINGS.POSTS_PREFIX)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsQueryService: PostsQueryService,
    private readonly commentsQueryService: CommentsQueryService
  ) {}

  /*001. POST-запрос по созданию поста.*/
  @Post(SETTINGS.CREATE_POST_PATH)
  @HttpCode(HttpStatus.CREATED)
  public async createPost(@Body() body: CreatePostInputDTO): Promise<PostOutputDTO> {
    /*Просим сервис "postsService" создать пост.*/
    const postId: string = await this.postsService.create(body);
    /*Просим сервис "postsService" найти созданный пост по ID.*/
    return await this.postsService.findById(postId);
  }

  /*002. GET-запрос по поиску поста по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Get(SETTINGS.GET_POST_BY_ID_PATH)
  @HttpCode(HttpStatus.OK)
  public async getPostById(@Param('id') id: string): Promise<PostOutputDTO> {
    /*Просим query-сервис "postsQueryService" найти пост по ID.*/
    return await this.postsQueryService.findById(id);
  }

  /*003. GET-запрос по поиску постов с пагинацией, используя query-параметры.*/
  @Get(SETTINGS.GET_POST_LIST_PATH)
  public async getPostList(
    @Query() query: GetPostListQueryInputDTO
  ): Promise<PaginationMetaDataOutputDTO<PostListOutputDTO>> {
    /*Просим query-сервис "postsQueryService" найти посты.*/
    return await this.postsQueryService.findAll(query);
  }

  /*004. GET-запрос по поиску комментариев с пагинацией по ID поста, используя query-параметры.*/
  @ApiParam({ name: 'postId' })
  @Get(SETTINGS.GET_COMMENT_LIST_BY_POST_ID_PATH)
  public async getCommentListByPostId(
    @Param('postId') id: string,
    @Query() query: GetCommentListByPostIdQueryInputDTO
  ): Promise<PaginationMetaDataOutputDTO<CommentListOutputDTO>> {
    /*Просим query-сервис "commentsQueryService" найти комментарии по ID поста.*/
    return await this.commentsQueryService.findAllByPostId(id, query);
  }

  /*005. PUT-запрос по изменению поста по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Put(SETTINGS.UPDATE_POST_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updatePostById(@Param('id') id: string, @Body() body: UpdatePostInputDTO): Promise<void> {
    /*Просим сервис "postsService" изменить пост по ID.*/
    await this.postsService.update(id, body);
  }

  /*006. DELETE-запрос по удалению поста по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Delete(SETTINGS.DELETE_POST_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deletePostById(@Param('id') id: string): Promise<void> {
    /*Просим сервис "postsService" удалить пост по ID.*/
    await this.postsService.delete(id);
  }
}
