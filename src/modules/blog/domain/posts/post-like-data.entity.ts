import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostLikeDataDocumentType } from './document-types/post-like-data.document-type';
import { CreatePostDomainDTO } from './domain-dto/create-post-like-data.domain-dto';
import { PostLikeStatusDomainDTO } from './domain-dto/post-like-status.domain-dto';
import { UpdatePostDomainDTO } from './domain-dto/update-post-like-data.domain-dto';

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

  /*Метод для создания данных о лайке поста.*/
  static createInstance(dto: CreatePostDomainDTO): PostLikeDataDocumentType {
    const postLikeData = new this();
    postLikeData.postId = dto.postId;
    postLikeData.userId = dto.userId;
    postLikeData.login = dto.login;
    postLikeData.likeStatus = dto.likeStatus;
    return postLikeData as PostLikeDataDocumentType;
  }

  /*Метод для изменения данных о лайке поста.*/
  update(dto: UpdatePostDomainDTO): void {
    this.likeStatus = dto.likeStatus;
  }
}

/*Создаем схему для данных о лайке поста на основе класса для сущности данных о лайке поста.*/
export const PostLikeDataSchema = SchemaFactory.createForClass(PostLikeData);
/*Регистрируем методы класса для сущности данных о лайке поста в схеме для данных о лайке поста.*/
PostLikeDataSchema.loadClass(PostLikeData);
