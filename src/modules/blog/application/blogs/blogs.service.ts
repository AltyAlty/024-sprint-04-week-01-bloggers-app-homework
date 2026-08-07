import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsRepository } from '../../infrastructure/blogs/blogs.repository';
import { UpdateBlogInputDTO } from '../../api/blogs/input-dto/update-blog.input-dto';
import { BlogOutputDTO } from '../../api/blogs/output-dto/blog.output-dto';
import { Blog } from '../../domain/blogs/blog.entity';
import { BlogDocumentType } from '../../domain/blogs/document-types/blog.document-type';
import { CreateBlogDomainDTO } from '../../domain/blogs/domain-dto/create-blog.domain-dto';
/*Импортируем "BlogModelType" как тип, чтобы TS не использовал его в JS-коде.*/
import type { BlogModelType } from '../../domain/blogs/model-types/blog.model-type';

/*Сервис для блогов.*/
@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    private blogsRepository: BlogsRepository
  ) {}

  /*Метод для создания блога.*/
  async create(dto: CreateBlogDomainDTO): Promise<string> {
    /*Просим модель "BlogModel" создать блог.*/
    const blog: BlogDocumentType = this.BlogModel.create(dto);
    /*Просим репозиторий "blogsRepository" сохранить блог в БД.*/
    await this.blogsRepository.save(blog);
    /*Возвращаем ID созданного блога.*/
    return blog.id;
  }

  /*Метод для поиска блога по ID.*/
  async findById(id: string): Promise<BlogOutputDTO> {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blogDB: BlogDocumentType | null = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blogDB) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то преобразовываем блог из БД в подготовленный для отправки клиенту блог и возвращаем его.*/
    return BlogOutputDTO.mapFromBlogDocumentTypeToBlogOutputDTO(blogDB);
  }

  /*Метод для изменения блога по ID.*/
  async update(id: string, dto: UpdateBlogInputDTO): Promise<void> {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blogDB = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blogDB) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то изменяем его.*/
    blogDB.update(dto);
    /*Возвращаем измененный блог.*/
    await this.blogsRepository.save(blogDB);
  }

  /*Метод для soft удаления блога по ID.*/
  async markAsDeleted(id: string) {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blogDB = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blogDB) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то помечаем его как удаленный.*/
    blogDB.markAsDeleted();
    await this.blogsRepository.save(blogDB);
  }

  /*Метод для hard удаления блога по ID.*/
  async delete(id: string): Promise<void> {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blogDB = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blogDB) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то просим репозиторий "blogsRepository" удалить блог по ID в БД.*/
    const isDeleted: boolean = await this.blogsRepository.deleteById(id);
    /*Если блог не был удален, то выбрасываем исключение с информацией об этом.*/
    if (!isDeleted) throw new NotFoundException('Blog not found');
  }
}
