import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentsRepository } from '../../infrastructure/comments/comments.repository';
import { Comment } from '../../domain/comments/comment.entity';
import type { CommentModelType } from '../../domain/comments/model-types/comment.model-type';

/*Сервис для комментариев.*/
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly CommentModel: CommentModelType,
    private readonly commentsRepository: CommentsRepository
  ) {}
}
