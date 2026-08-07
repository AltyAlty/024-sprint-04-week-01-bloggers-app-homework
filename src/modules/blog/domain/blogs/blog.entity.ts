import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BlogDocumentType } from './document-types/blog.document-type';
import { CreateBlogDomainDTO } from './domain-dto/create-blog.domain-dto';
import { UpdateBlogDomainDTO } from './domain-dto/update-blog.domain-dto';

/*Класс для сущности блога.*/
@Schema({ timestamps: true })
export class Blog {
  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 100 })
  name: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 1000 })
  description: string;

  @Prop({ type: String, required: true, trim: true, minlength: 1, maxlength: 1000 })
  websiteUrl: string;

  @Prop({ type: Boolean, default: false })
  isMembership: boolean;

  /*Явно создаем поля "createdAt" и "updatedAt" без декоратора "@Prop()", так как хоть флаг "timestamps" и создает эти
  поля в схеме и документах, но TS о них не знает.*/
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  /*Виртуальное свойство для получения ID блога.*/
  get id(): string {
    return (this as unknown as BlogDocumentType)._id.toString();
  }

  /*Метод для создания блога.*/
  static create(dto: CreateBlogDomainDTO): BlogDocumentType {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    blog.isMembership = false;
    return blog as BlogDocumentType;
  }

  /*Метод для изменения блога.*/
  update(dto: UpdateBlogDomainDTO): void {
    this.name = dto.name;
    this.description = dto.description;
    this.websiteUrl = dto.websiteUrl;
  }

  /*Метод для soft удаления блога.*/
  markAsDeleted(): void {
    if (this.deletedAt !== null) throw new Error('Blog is already deleted');
    this.deletedAt = new Date();
  }
}

/*Создаем схему для блога на основе класса для сущности блога.*/
export const BlogSchema = SchemaFactory.createForClass(Blog);
/*Регистрируем методы класса для сущности блога в схеме для блога, то есть обычные методы класса станут методами
документа, а статические методы станут методами модели.*/
BlogSchema.loadClass(Blog);
