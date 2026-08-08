import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostLikeStatusDomainDTO } from './domain-dto/post-like-status.domain-dto';

/*Класс для сущности данных о лайке поста.*/
@Schema()
export class PostLikeData {
  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  postId: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  userId: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  login: string;

  @Prop({ type: String, required: true, enum: Object.values(PostLikeStatusDomainDTO) })
  likeStatus: string;

  @Prop({ type: Date, immutable: true, default: Date.now })
  addedAt: Date;
}

/*Создаем схему для данных о лайке поста на основе класса для сущности данных о лайке поста.*/
export const PostLikeDataSchema = SchemaFactory.createForClass(PostLikeData);
/*Регистрируем методы класса для сущности данных о лайке поста в схеме для данных о лайке поста.*/
PostLikeDataSchema.loadClass(PostLikeData);
