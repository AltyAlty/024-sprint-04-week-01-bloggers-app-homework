import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongoose';
import { Blog } from '../../domain/blogs/blog.entity';
import { BlogDocumentType } from '../../domain/blogs/document-types/blog.document-type';
/*Импортируем "BlogModelType" как тип, чтобы TS не использовал его в JS-коде.*/
import type { BlogModelType } from '../../domain/blogs/model-types/blog.model-type';

/*Репозиторий для блогов.*/
@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: BlogModelType) {}

  /*Метод для сохранения блога в БД.*/
  async save(blog: BlogDocumentType): Promise<void> {
    await blog.save();
  }

  /*Метод для поиска блога по ID в БД.*/
  async findById(id: string): Promise<BlogDocumentType | null> {
    /*Просим модель "BlogModel" найти блог по ID в БД.*/
    return this.BlogModel.findOne({ _id: id, deletedAt: null });
  }

  /*Метод для hard удаления блога по ID в БД.*/
  async deleteById(id: string): Promise<boolean> {
    /*Просим модель "BlogModel" удалить блог по ID в БД.*/
    const result: DeleteResult = await this.BlogModel.deleteOne({ _id: id });
    /*Возращаем статус операции по удалению блога по ID в БД.*/
    return result.deletedCount === 1;
  }
}
