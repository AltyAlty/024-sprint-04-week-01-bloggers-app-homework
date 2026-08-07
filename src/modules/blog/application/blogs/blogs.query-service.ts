import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsQueryRepository } from '../../infrastructure/blogs/blogs.query-repository';
import { GetBlogListQueryInputDTO } from '../../api/blogs/input-dto/query/get-blog-list-query.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { BlogOutputDTO } from '../../api/blogs/output-dto/blog.output-dto';
import { BlogListOutputDTO } from '../../api/blogs/output-dto/blog-list.output-dto';
import { Blog } from '../../domain/blogs/blog.entity';
import { BlogDocumentType } from '../../domain/blogs/document-types/blog.document-type';
import { BlogListDocumentType } from '../../domain/blogs/document-types/blog-list.document-type';
import type { BlogModelType } from '../../domain/blogs/model-types/blog.model-type';

/*Query-сервис для блогов.*/
@Injectable()
export class BlogsQueryService {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    private blogsQueryRepository: BlogsQueryRepository
  ) {}

  /*Метод для поиска блога по ID.*/
  async findById(id: string): Promise<BlogOutputDTO> {
    /*Просим query-репозиторий "blogsQueryRepository" найти блог по ID в БД.*/
    const blogDB: BlogDocumentType | null = await this.blogsQueryRepository.findById(id);
    /*Если блог не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!blogDB) throw new NotFoundException('Blog not found');
    /*Если блог был найден, то преобразовываем блог из БД в подготовленный для отправки клиенту блог и возвращаем его.*/
    return BlogOutputDTO.mapFromBlogDocumentTypeToBlogOutputDTO(blogDB);
  }

  /*Метод для поиска блогов.*/
  async findAll(query: GetBlogListQueryInputDTO): Promise<PaginationMetaDataOutputDTO<BlogOutputDTO[]>> {
    /*Просим query-репозиторий "blogsQueryRepository" найти блоги в БД.*/
    const { items, totalCount }: { items: BlogListDocumentType; totalCount: number } =
      await this.blogsQueryRepository.findAll(query);

    /*Преобразовываем блоги из БД в подготовленные для отправки клиенту блоги.*/
    const blogListOutput: BlogListOutputDTO = BlogOutputDTO.mapFromBlogListDocumentTypeToBlogListOutputDTO(items);

    /*Преобразовываем подготовленные для отправки клиенту блоги в подготовленные для отправки клиенту блоги с
    пагинацией.*/
    return PaginationMetaDataOutputDTO.mapToOutputDTO({
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
      items: blogListOutput,
    });
  }
}
