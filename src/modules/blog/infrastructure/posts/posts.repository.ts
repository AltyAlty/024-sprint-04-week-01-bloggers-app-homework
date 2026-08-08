import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongoose';
import { NewestPostLikeListOutputDTO } from '../../api/posts/output-dto/newest-post-like-list.output-dto';
import { PostDocumentType } from '../../domain/posts/document-types/post.document-type';
import { PostLikeDataDocumentType } from '../../domain/posts/document-types/post-like-data.document-type';
import { PostLikeStatusDomainDTO } from '../../domain/posts/domain-dto/post-like-status.domain-dto';
import type { PostModelType } from '../../domain/posts/model-types/post.model-type';
import type { PostLikeDataModelType } from '../../domain/posts/model-types/post-like-data.model-type';
import { Post } from '../../domain/posts/post.entity';
import { PostLikeData } from '../../domain/posts/post-like-data.entity';

/*Репозиторий для постов.*/
@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    @InjectModel(PostLikeData.name) private PostLikeDataModel: PostLikeDataModelType
  ) {}

  /*Метод для сохранения поста в БД.*/
  async save(post: PostDocumentType): Promise<void> {
    await post.save();
  }

  /*Метод для поиска поста по ID в БД.*/
  async findById(id: string): Promise<PostDocumentType | null> {
    /*Просим модель "PostModel" найти пост по ID в БД.*/
    return await this.PostModel.findOne({ _id: id, deletedAt: null });
  }

  /*Метод для поиска данных о лайке поста по ID поста и ID пользователя в БД.*/
  public async findPostLikeDataByPostIdAndUserId(
    postId: string,
    userId: string
  ): Promise<PostLikeDataDocumentType | null> {
    /*Просим модель "PostLikeDataModel" найти данные о лайке поста по ID поста и ID пользователя в БД.*/
    return await this.PostLikeDataModel.findOne({ postId, userId });
  }

  /*Метод для поиска данных о трех последних лайках поста по ID поста в БД.*/
  public async findLastThreePostLikes(postId: string): Promise<NewestPostLikeListOutputDTO> {
    /*Просим модель "PostLikeDataModel" найти данные о трех последних лайках поста по ID поста в БД.*/
    return await this.PostLikeDataModel.find(
      { postId, likeStatus: PostLikeStatusDomainDTO.Like },
      /*Указываем какие поля включать в результат.*/
      { addedAt: 1, userId: 1, login: 1, _id: 0 }
    )
      /*Сортируем найденные данные о лайках поста по полю "addedAt" в порядке убывания.*/
      .sort({ addedAt: -1 })
      /*Ограничиваем количество возвращаемых данных о лайках поста до трех.*/
      .limit(3)
      .lean();
  }

  /*Метод для hard удаления поста по ID в БД.*/
  async deleteById(id: string): Promise<boolean> {
    /*Просим модель "PostModel" удалить пост по ID в БД.*/
    const result: DeleteResult = await this.PostModel.deleteOne({ _id: id });
    /*Возращаем статус операции по удалению поста по ID в БД.*/
    return result.deletedCount === 1;
  }
}
