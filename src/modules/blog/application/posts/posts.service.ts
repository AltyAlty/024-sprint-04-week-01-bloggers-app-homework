import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsService } from '../blogs/blogs.service';
import { PostsRepository } from '../../infrastructure/posts/posts.repository';
import { CreatePostForBlogInputDTO } from '../../api/blogs/input-dto/create-post-for-blog.input-dto';
import { CreatePostInputDTO } from '../../api/posts/input-dto/create-post.input-dto';
import { UpdatePostInputDTO } from '../../api/posts/input-dto/update-post.input-dto';
import { BlogOutputDTO } from '../../api/blogs/output-dto/blog.output-dto';
import { NewestPostLikeListOutputDTO } from '../../api/posts/output-dto/newest-post-like-list.output-dto';
import { PostOutputDTO } from '../../api/posts/output-dto/post.output-dto';
import { PostLikeStatusOutputDTO } from '../../api/posts/output-dto/post-like-status.output-dto';
import { PostDocumentType } from '../../domain/posts/document-types/post.document-type';
import { PostLikeDataDocumentType } from '../../domain/posts/document-types/post-like-data.document-type';
import type { PostModelType } from '../../domain/posts/model-types/post.model-type';
import { Post } from '../../domain/posts/post.entity';

/*Сервис для постов.*/
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: PostModelType,
    private blogsService: BlogsService,
    private postsRepository: PostsRepository
  ) {}

  /*Метод для создания поста.*/
  async create(dto: CreatePostInputDTO): Promise<string> {
    /*Просим сервис "blogsService" найти блог по ID.*/
    const blog: BlogOutputDTO = await this.blogsService.findById(dto.blogId);
    /*Просим модель "PostModel" создать блог.*/
    const post: PostDocumentType = this.PostModel.createInstance({ ...dto, blogName: blog.name });
    /*Просим репозиторий "postsRepository" сохранить пост в БД.*/
    await this.postsRepository.save(post);
    /*Возвращаем ID созданного поста.*/
    return post.id;
  }

  /*Метод для создания поста в блоге.*/
  async createForBlog(dto: CreatePostForBlogInputDTO, blogId: string): Promise<string> {
    /*Просим сервис "blogsService" найти блог по ID.*/
    const blog: BlogOutputDTO = await this.blogsService.findById(blogId);
    /*Просим модель "PostModel" создать блог.*/
    const post: PostDocumentType = this.PostModel.createInstance({ ...dto, blogId, blogName: blog.name });
    /*Просим репозиторий "postsRepository" сохранить пост в БД.*/
    await this.postsRepository.save(post);
    /*Возвращаем ID созданного поста.*/
    return post.id;
  }

  /*Метод для поиска поста по ID.*/
  async findById(id: string, userId?: string): Promise<PostOutputDTO> {
    /*Просим репозиторий "PostsRepository" найти пост по ID в БД.*/
    const postDB: PostDocumentType | null = await this.postsRepository.findById(id);
    /*Если пост не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!postDB) throw new NotFoundException('Post not found');
    /*Формируем статус лайка поста.*/
    let likeStatus: PostLikeStatusOutputDTO = PostLikeStatusOutputDTO.None;

    /*Если в запросе был указан AT.*/
    if (userId) {
      /*Просим репозиторий "postsRepository" найти данные о лайке поста в БД.*/
      const postLikeDataDB: PostLikeDataDocumentType | null =
        await this.postsRepository.findPostLikeDataByPostIdAndUserId(id, userId);

      /*Если данные о лайке поста были найдены, то получаем статус лайка.*/
      if (postLikeDataDB) likeStatus = postLikeDataDB.likeStatus as unknown as PostLikeStatusOutputDTO;
    }

    /*Просим репозиторий "postsRepository" найти данные о трех последних лайках поста по ID поста в БД.*/
    const newestLikes: NewestPostLikeListOutputDTO = await this.postsRepository.findLastThreePostLikes(id);
    /*Если пост был найден, то преобразовываем пост из БД в подготовленный для отправки клиенту пост и возвращаем его.*/
    return PostOutputDTO.mapFromPostDocumentTypeToPostOutputDTO(postDB, likeStatus, newestLikes);
  }

  /*Метод для изменения поста по ID.*/
  async update(id: string, dto: UpdatePostInputDTO): Promise<void> {
    /*Просим репозиторий "postsRepository" найти пост по ID в БД.*/
    const postDB = await this.postsRepository.findById(id);
    /*Если пост не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!postDB) throw new NotFoundException('Post not found');
    /*Если пост был найден, то изменяем его.*/
    postDB.update(dto);
    /*Просим репозиторий "postsRepository" сохранить измененный пост.*/
    await this.postsRepository.save(postDB);
  }

  /*Метод для soft удаления поста по ID.*/
  async markAsDeleted(id: string) {
    /*Просим репозиторий "postsRepository" найти пост по ID в БД.*/
    const postDB = await this.postsRepository.findById(id);
    /*Если пост не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!postDB) throw new NotFoundException('Post not found');
    /*Если пост был найден, то помечаем его как удаленный.*/
    postDB.markAsDeleted();
    /*Просим репозиторий "postsRepository" сохранить измененный пост.*/
    await this.postsRepository.save(postDB);
  }

  /*Метод для hard удаления поста по ID.*/
  async delete(id: string): Promise<void> {
    /*Просим репозиторий "postsRepository" найти пост по ID в БД.*/
    const postDB = await this.postsRepository.findById(id);
    /*Если пост не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!postDB) throw new NotFoundException('Post not found');
    /*Если пост был найден, то просим репозиторий "postsRepository" удалить пост по ID в БД.*/
    const isDeleted: boolean = await this.postsRepository.deleteById(id);
    /*Если пост не был удален, то выбрасываем исключение с информацией об этом.*/
    if (!isDeleted) throw new NotFoundException('Post not found');
  }
}
