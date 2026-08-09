import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { CommentsQueryService } from '../../application/comments/comments.query-service';
import { CommentOutputDTO } from './output-dto/comment.output-dto';
import { SETTINGS } from '../../../../core/settings/settings';

/*Контроллер для комментариев.*/
@Controller(SETTINGS.COMMENTS_PREFIX)
export class CommentsController {
  constructor(private readonly commentsQueryService: CommentsQueryService) {}

  /*001. GET-запрос по поиску комментария по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Get(SETTINGS.GET_COMMENT_BY_ID_PATH)
  @HttpCode(HttpStatus.OK)
  public async getPostById(@Param('id') id: string): Promise<CommentOutputDTO> {
    /*Просим query-сервис "commentsQueryService" найти комментарий по ID.*/
    return await this.commentsQueryService.findById(id);
  }
}
