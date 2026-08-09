import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommentDocumentType } from './document-types/comment.document-type';
import { CreateCommentDomainDTO } from './domain-dto/create-comment.domain-dto';
import { UpdateCommentDomainDTO } from './domain-dto/update-comment.domain-dto';
import { CommentatorInfo, CommentatorInfoSchema } from './schemas/commentator-info.schema';
import { LikesInfo, LikesInfoSchema } from './schemas/likes-info.schema';

/*Класс для сущности комментария.*/
@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 1000 })
  content: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  postId: string;

  @Prop({ type: CommentatorInfoSchema })
  commentatorInfo: CommentatorInfo;

  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: LikesInfoSchema })
  likesInfo: LikesInfo;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  /*Виртуальное свойство для получения ID комментария.*/
  public get id(): string {
    return (this as unknown as CommentDocumentType)._id.toString();
  }

  /*Метод для создания комментария.*/
  public static createInstance(dto: CreateCommentDomainDTO): CommentDocumentType {
    const comment = new this();
    comment.content = dto.content;
    comment.postId = dto.postId;
    comment.commentatorInfo = dto.commentatorInfo;
    comment.likesInfo = { likesCount: 0, dislikesCount: 0 };
    return comment as CommentDocumentType;
  }

  /*Метод для изменения комментария.*/
  public update(dto: UpdateCommentDomainDTO): void {
    this.content = dto.content;
  }

  /*Метод для soft удаления комментария.*/
  public markAsDeleted(): void {
    if (this.deletedAt !== null) throw new Error('Comment is already deleted');
    this.deletedAt = new Date();
  }
}

/*Создаем схему для комментария на основе класса для сущности комментария.*/
export const CommentSchema = SchemaFactory.createForClass(Comment);
/*Регистрируем методы класса для сущности комментария в схеме для комментария.*/
CommentSchema.loadClass(Comment);
