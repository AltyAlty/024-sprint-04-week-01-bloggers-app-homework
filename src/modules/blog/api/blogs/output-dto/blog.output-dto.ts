import { BlogListOutputDTO } from './blog-list.output-dto';
import { BlogDocumentType } from '../../../domain/blogs/document-types/blog.document-type';
import { BlogListDocumentType } from '../../../domain/blogs/document-types/blog-list.document-type';

/*Output DTO для блога.*/
export class BlogOutputDTO {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  isMembership: boolean;

  /*Маппер для преобразования блога из БД в подготовленный для отправки клиенту блог.*/
  static mapFromBlogDocumentTypeToBlogOutputDTO(blog: BlogDocumentType): BlogOutputDTO {
    const blogOutputDTO: BlogOutputDTO = new BlogOutputDTO();
    blogOutputDTO.id = blog._id.toString();
    blogOutputDTO.name = blog.name;
    blogOutputDTO.description = blog.description;
    blogOutputDTO.websiteUrl = blog.websiteUrl;
    blogOutputDTO.createdAt = blog.createdAt;
    blogOutputDTO.isMembership = blog.isMembership;
    return blogOutputDTO;
  }

  /*Маппер для преобразования блогов из БД в подготовленные для отправки клиенту блоги.*/
  static mapFromBlogListDocumentTypeToBlogListOutputDTO(blogs: BlogListDocumentType): BlogListOutputDTO {
    return blogs.map((blog: BlogDocumentType) => {
      return this.mapFromBlogDocumentTypeToBlogOutputDTO(blog);
    });
  }
}
