import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsRepository } from '../../infrastructure/blogs/blogs.repository';
import { CreateBlogInputDTO } from '../../api/blogs/input-dto/create-blog.input-dto';
import { UpdateBlogInputDTO } from '../../api/blogs/input-dto/update-blog.input-dto';
import { BlogOutputDTO } from '../../api/blogs/output-dto/blog.output-dto';
import { Blog } from '../../domain/blogs/blog.entity';
import { BlogDocumentType } from '../../domain/blogs/document-types/blog.document-type';
/*Импортируем "BlogModelType" как тип, чтобы TS не использовал его в JS-коде.*/
import type { BlogModelType } from '../../domain/blogs/model-types/blog.model-type';

/*Сервис для блогов.*/
@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private readonly BlogModel: BlogModelType,
    private readonly blogsRepository: BlogsRepository
  ) {}

  /*Метод для создания блога.*/
  public async create(dto: CreateBlogInputDTO): Promise<string> {
    /*Просим модель "BlogModel" создать блог.*/
    const blog: BlogDocumentType = this.BlogModel.createInstance(dto);
    /*Просим репозиторий "blogsRepository" сохранить блог в БД.*/
    await this.blogsRepository.save(blog);
    /*Возвращаем ID созданного блога.*/
    return blog.id;
  }

  /*Метод для поиска блога по ID.*/
  public async findById(id: string): Promise<BlogOutputDTO> {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blog: BlogDocumentType | null = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blog) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то преобразовываем блог из БД в подготовленный для отправки клиенту блог и возвращаем его.*/
    return BlogOutputDTO.mapFromBlogDocumentTypeToBlogOutputDTO(blog);
  }

  /*Метод для изменения блога по ID.*/
  public async update(id: string, dto: UpdateBlogInputDTO): Promise<void> {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blog: BlogDocumentType | null = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blog) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то изменяем его.*/
    blog.update(dto);
    /*Просим репозиторий "blogsRepository" сохранить измененный блог.*/
    await this.blogsRepository.save(blog);
  }

  /*Метод для soft удаления блога по ID.*/
  public async markAsDeleted(id: string) {
    /*Просим репозиторий "blogsRepository" найти блог по ID в БД.*/
    const blog: BlogDocumentType | null = await this.blogsRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blog) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то помечаем его как удаленный.*/
    blog.markAsDeleted();
    /*Просим репозиторий "blogsRepository" сохранить измененный блог.*/
    await this.blogsRepository.save(blog);
  }

  /*Метод для hard удаления блога по ID.*/
  public async delete(id: string): Promise<void> {
    /*Просим сервис "blogsService" найти блог по ID в БД.*/
    await this.findById(id);
    /*Просим репозиторий "blogsRepository" удалить блог по ID в БД.*/
    await this.blogsRepository.deleteById(id);
  }
}
