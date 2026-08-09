import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter } from 'mongoose';
import { GetCommentListByPostIdQueryInputDTO } from '../../api/posts/input-dto/query/get-comment-list-by-post-id-query.input-dto';
import { Comment } from '../../domain/comments/comment.entity';
import { CommentLikeData } from '../../domain/comments/comment-like-data.entity';
import { CommentDocumentType } from '../../domain/comments/document-types/comment.document-type';
import { CommentLikeDataDocumentType } from '../../domain/comments/document-types/comment-like-data.document-type';
import { CommentLikeDataListDocumentType } from '../../domain/comments/document-types/comment-like-data-list.document-type';
import { CommentListDocumentType } from '../../domain/comments/document-types/comment-list.document-type';
import type { CommentModelType } from '../../domain/comments/model-types/comment.model-type';
import type { CommentLikeDataModelType } from '../../domain/comments/model-types/comment-like-data.model-type';

/*Query-репозиторий для комментариев.*/
@Injectable()
export class CommentsQueryRepository {
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: CommentModelType,
    @InjectModel(CommentLikeData.name) private readonly CommentLikeDataModel: CommentLikeDataModelType
  ) {}

  /*Метод для поиска комментария по ID в БД.*/
  public async findById(id: string): Promise<CommentDocumentType | null> {
    /*Просим модель "CommentModel" найти комментарий по ID в БД.*/
    return await this.CommentModel.findOne({ _id: id, deletedAt: null });
  }

  /*Метод для поиска данных о лайке комментария по ID комментария и ID пользователя в БД.*/
  public async findCommentLikeDataByPostIdAndUserId(
    commentId: string,
    userId: string
  ): Promise<CommentLikeDataDocumentType | null> {
    /*Просим модель "CommentLikeDataModel" найти данные о лайке комментария по ID комментария и ID пользователя в БД.*/
    return await this.CommentLikeDataModel.findOne({ commentId, userId });
  }

  /*Метод для поиска комментариев по ID поста в БД.*/
  public async findAllByPostId(
    postId: string,
    dto: GetCommentListByPostIdQueryInputDTO
  ): Promise<{ items: CommentListDocumentType; totalCount: number }> {
    /*Переменная "skip" обозначает сколько записей надо пропустить перед тем, как начать отдавать запрошенную страницу
    "pageNumber".*/
    const skip: number = dto.calculateSkip();
    /*Динамически собираем фильтр для поиска в MongoDB. Начинаем с пустого фильтра.*/
    const filter: QueryFilter<CommentDocumentType> = {};
    /*Добавляем в фильтр ID поста.*/
    filter.postId = postId;

    /*Просим модель "CommentModel" найти комментарии в посте по ID в БД и подсчитать общее количество документов,
    подходящих под фильтр, без учета пагинации.*/
    const [items, totalCount]: [CommentListDocumentType, number] = await Promise.all([
      this.CommentModel.find(filter)
        .sort({ [dto.sortBy]: dto.sortDirection })
        .skip(skip)
        .limit(dto.pageSize),
      this.CommentModel.countDocuments(filter),
    ]);

    /*Возвращаем данные по комментариям.*/
    return { items, totalCount };
  }

  /*Метод для поиска данных о лайках комментариев по ID комментариев и ID пользователя в БД.*/
  public async findAllCommentLikesDataByCommentIdsAndUserId(
    commentIds: string[],
    userId: string
  ): Promise<CommentLikeDataListDocumentType> {
    /*Просим модель "CommentLikeDataModel" найти данные о лайках комментариев по ID комментариев и ID пользователя в
    БД.*/
    return await this.CommentLikeDataModel.find({ commentId: { $in: commentIds }, userId }).lean();
  }
}
