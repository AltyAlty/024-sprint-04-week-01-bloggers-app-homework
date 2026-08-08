import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../domain/comments/comment.entity';
import { CommentDocumentType } from '../../domain/comments/document-types/comment.document-type';
import type { CommentModelType } from '../../domain/comments/model-types/comment.model-type';

/*Репозиторий для комментариев.*/
@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comment.name) private CommentModel: CommentModelType) {}

  /*Метод для сохранения комментария в БД.*/
  async save(comment: CommentDocumentType): Promise<void> {
    await comment.save();
  }
}
