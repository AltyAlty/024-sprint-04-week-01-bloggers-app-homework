import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostDocumentType } from './document-types/post.document-type';
import { CreatePostDomainDTO } from './domain-dto/create-post.domain-dto';
import { UpdatePostDomainDTO } from './domain-dto/update-post.domain-dto';
import { ExtendedLikesInfo, ExtendedLikesInfoSchema } from './schemas/extended-likes-info.schema';

/*Класс для сущности поста.*/
@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  title: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 1000 })
  shortDescription: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 2000 })
  content: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  blogId: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  blogName: string;

  @Prop({ type: ExtendedLikesInfoSchema })
  extendedLikesInfo: ExtendedLikesInfo;

  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  /*Виртуальное свойство для получения ID поста.*/
  public get id(): string {
    return (this as unknown as PostDocumentType)._id.toString();
  }

  /*Метод для создания поста.*/
  public static createInstance(dto: CreatePostDomainDTO): PostDocumentType {
    const post = new this();
    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;
    post.blogName = dto.blogName;
    post.extendedLikesInfo = { likesCount: 0, dislikesCount: 0 };
    return post as PostDocumentType;
  }

  /*Метод для изменения поста.*/
  public update(dto: UpdatePostDomainDTO): void {
    this.title = dto.title;
    this.shortDescription = dto.shortDescription;
    this.content = dto.content;
    this.blogId = dto.blogId;
  }

  /*Метод для soft удаления поста.*/
  public markAsDeleted(): void {
    if (this.deletedAt !== null) throw new Error('Post is already deleted');
    this.deletedAt = new Date();
  }
}

/*Создаем схему для поста на основе класса для сущности поста.*/
export const PostSchema = SchemaFactory.createForClass(Post);
/*Регистрируем методы класса для сущности поста в схеме для поста.*/
PostSchema.loadClass(Post);
