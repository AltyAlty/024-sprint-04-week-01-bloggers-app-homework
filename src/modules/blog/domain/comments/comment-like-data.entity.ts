import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommentLikeStatusDomainDTO } from './domain-dto/comment-like-status.domain-dto';

/*Класс для сущности данных о лайке комментария.*/
@Schema()
export class CommentLikeData {
  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  commentId: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  userId: string;

  @Prop({ type: String, required: true, enum: Object.values(CommentLikeStatusDomainDTO) })
  likeStatus: string;
}

/*Создаем схему для данных о лайке комментария на основе класса для сущности данных о лайке комментария.*/
export const CommentLikeDataSchema = SchemaFactory.createForClass(CommentLikeData);
/*Регистрируем методы класса для сущности данных о лайке комментария в схеме для данных о лайке комментария.*/
CommentLikeDataSchema.loadClass(CommentLikeData);
