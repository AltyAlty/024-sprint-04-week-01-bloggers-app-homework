import { CommentsQueryRepository } from '../../../infrastructure/comments/comments.query-repository';
import { CommentLikeStatusOutputDTO } from './comment-like-status.output-dto';
import { CommentListOutputDTO } from './comment-list.output-dto';
import { CommentatorInfoOutputDTO } from './commentator-info.output-dto';
import { LikesInfoOutputDTO } from './likes-info.output-dto';
import { CommentDocumentType } from '../../../domain/comments/document-types/comment.document-type';
import { CommentLikeDataDocumentType } from '../../../domain/comments/document-types/comment-like-data.document-type';
import { CommentLikeDataListDocumentType } from '../../../domain/comments/document-types/comment-like-data-list.document-type';
import { CommentListDocumentType } from '../../../domain/comments/document-types/comment-list.document-type';

/*Output DTO для комментария.*/
export class CommentOutputDTO {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfoOutputDTO;
  createdAt: Date;
  likesInfo: LikesInfoOutputDTO;

  /*Маппер для преобразования комментария из БД в подготовленный для отправки клиенту комментарий.*/
  static mapFromCommentDocumentTypeToCommentOutputDTO(
    comment: CommentDocumentType,
    likeStatus: CommentLikeStatusOutputDTO
  ): CommentOutputDTO {
    const commentOutputDTO: CommentOutputDTO = new CommentOutputDTO();
    commentOutputDTO.id = comment._id.toString();
    commentOutputDTO.content = comment.content;
    commentOutputDTO.commentatorInfo = comment.commentatorInfo;
    commentOutputDTO.createdAt = comment.createdAt;

    commentOutputDTO.likesInfo = {
      likesCount: comment.likesInfo.likesCount,
      dislikesCount: comment.likesInfo.dislikesCount,
      myStatus: likeStatus,
    };

    return commentOutputDTO;
  }

  /*Маппер для преобразования комментариев из БД в подготовленные для отправки клиенту комментарии.*/
  static async mapFromCommentListDocumentTypeToCommentListOutputDTO(
    comments: CommentListDocumentType,
    commentsQueryRepository: CommentsQueryRepository,
    userId: string | undefined
  ): Promise<CommentListOutputDTO> {
    /*Если в виде комментариев был передан пустой массив, то возвращаем пустой массив.*/
    if (comments.length === 0) return [];
    /*Получаем ID комментариев.*/
    const commentIds: string[] = comments.map((comment: CommentDocumentType): string => comment._id.toString());
    /*Создаем Map формата "commentId: likeStatus", чтобы избежать многочисленных запросов в БД для получения статусов
  лайков пользователя каждого комментария.*/
    let commentLikesDataMap: Map<string, CommentLikeStatusOutputDTO> = new Map<string, CommentLikeStatusOutputDTO>();

    /*Если был передан ID пользователя, то получаем статусы лайков пользователя каждого комментария.*/
    if (userId) {
      /*Просим query-репозиторий "commentsQueryRepository" найти данные о лайках комментариев по ID комментариев и ID
    пользователя в БД.*/
      const commentLikesDataDB: CommentLikeDataListDocumentType =
        await commentsQueryRepository.findAllCommentLikesDataByCommentIdsAndUserId(commentIds, userId);

      /*Заполняем Map статусами лайков пользователя каждого комментария, не обращаясь в БД.*/
      commentLikesDataMap = new Map(
        commentLikesDataDB.map(
          (commentLikeDataDB: CommentLikeDataDocumentType): [string, CommentLikeStatusOutputDTO] => [
            commentLikeDataDB.commentId,
            commentLikeDataDB.likeStatus as unknown as CommentLikeStatusOutputDTO,
          ]
        )
      );
    }

    /*Формируем массив подготовленных для отправки клиенту без пагинации комментариев.*/
    return comments.map((comment: CommentDocumentType): CommentOutputDTO => {
      /*Получаем статус лайка комментария.*/
      const likeStatus: CommentLikeStatusOutputDTO =
        commentLikesDataMap.get(comment._id.toString()) ?? CommentLikeStatusOutputDTO.None;

      /*Преобразовываем комментарий из БД в подготовленный для отправки клиенту комментарий.*/
      return this.mapFromCommentDocumentTypeToCommentOutputDTO(comment, likeStatus);
    });
  }
}
