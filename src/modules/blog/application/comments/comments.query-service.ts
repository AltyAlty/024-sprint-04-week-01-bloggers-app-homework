import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsQueryService } from '../posts/posts.query-service';
import { CommentsQueryRepository } from '../../infrastructure/comments/comments.query-repository';
import { GetCommentListByPostIdQueryInputDTO } from '../../api/posts/input-dto/query/get-comment-list-by-post-id-query.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { CommentOutputDTO } from '../../api/comments/output-dto/comment.output-dto';
import { CommentLikeStatusOutputDTO } from '../../api/comments/output-dto/comment-like-status.output-dto';
import { CommentListOutputDTO } from '../../api/comments/output-dto/comment-list.output-dto';
import { CommentDocumentType } from '../../domain/comments/document-types/comment.document-type';
import { CommentLikeDataDocumentType } from '../../domain/comments/document-types/comment-like-data.document-type';
import { CommentListDocumentType } from '../../domain/comments/document-types/comment-list.document-type';
import { PostListDocumentType } from '../../domain/posts/document-types/post-list.document-type';

/*Query-сервис для комментариев.*/
@Injectable()
export class CommentsQueryService {
  constructor(
    private postsQueryService: PostsQueryService,
    private commentsQueryRepository: CommentsQueryRepository
  ) {}

  /*Метод для поиска комментария по ID.*/
  async findById(id: string, userId?: string): Promise<CommentOutputDTO> {
    /*Просим query-репозиторий "commentsQueryRepository" найти комментарий по ID в БД.*/
    const commentDB: CommentDocumentType | null = await this.commentsQueryRepository.findById(id);
    /*Если комментарий не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!commentDB) throw new NotFoundException('Comment not found');
    /*Если комментарий был найден, то формируем статус лайка комментария.*/
    let likeStatus: CommentLikeStatusOutputDTO = CommentLikeStatusOutputDTO.None;

    /*Если в запросе был указан AT.*/
    if (userId) {
      /*Просим query-репозиторий "commentsQueryRepository" найти данные о лайке комментария в БД.*/
      const commentLikeDataDB: CommentLikeDataDocumentType | null =
        await this.commentsQueryRepository.findCommentLikeDataByPostIdAndUserId(id, userId);

      /*Если данные о лайке комментария были найдены, то получаем статус лайка.*/
      if (commentLikeDataDB) likeStatus = commentLikeDataDB.likeStatus as unknown as CommentLikeStatusOutputDTO;
    }

    /*Преобразовываем комментарий из БД в подготовленный для отправки клиенту комментарий и возвращаем его.*/
    return CommentOutputDTO.mapFromCommentDocumentTypeToCommentOutputDTO(commentDB, likeStatus);
  }

  /*Метод для поиска комментариев по ID поста.*/
  public async findAllByPostId(
    postId: string,
    dto: GetCommentListByPostIdQueryInputDTO,
    userId?: string
  ): Promise<PaginationMetaDataOutputDTO<CommentListOutputDTO>> {
    /*Просим query-сервис "postsQueryService" найти пост по ID.*/
    await this.postsQueryService.findById(postId);

    /*Просим query-репозиторий "commentsQueryRepository" найти комментарии по ID поста в БД.*/
    const { items, totalCount }: { items: CommentListDocumentType; totalCount: number } =
      await this.commentsQueryRepository.findAllByPostId(postId, dto);

    /*Преобразовываем комментарии из БД в подготовленные для отправки клиенту комментарии.*/
    const commentListOutput: CommentListOutputDTO =
      await CommentOutputDTO.mapFromCommentListDocumentTypeToCommentListOutputDTO(
        items,
        this.commentsQueryRepository,
        userId
      );

    /*Преобразовываем подготовленные для отправки клиенту комментарии в подготовленные для отправки клиенту с
    пагинацией комментарии.*/
    return PaginationMetaDataOutputDTO.mapToOutputDTO({
      page: dto.pageNumber,
      pageSize: dto.pageSize,
      totalCount: totalCount,
      items: commentListOutput,
    });
  }
}
