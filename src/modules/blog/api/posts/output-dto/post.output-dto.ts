import { PostsQueryRepository } from '../../../infrastructure/posts/posts.query-repository';
import { ExtendedLikesInfoOutputDTO } from './extended-likes-info.output-dto';
import { NewestPostLikeOutputDTO } from './newest-post-like.output-dto';
import { NewestPostLikeListOutputDTO } from './newest-post-like-list.output-dto';
import { PostLikeStatusOutputDTO } from './post-like-status.output-dto';
import { PostListOutputDTO } from './post-list.output-dto';
import { PostDocumentType } from '../../../domain/posts/document-types/post.document-type';
import { PostLikeDataDocumentType } from '../../../domain/posts/document-types/post-like-data.document-type';
import { PostLikeDataListDocumentType } from '../../../domain/posts/document-types/post-like-data-list.document-type';
import { PostListDocumentType } from '../../../domain/posts/document-types/post-list.document-type';

/*Output DTO для поста.*/
export class PostOutputDTO {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  extendedLikesInfo: ExtendedLikesInfoOutputDTO;

  /*Маппер для преобразования поста из БД в подготовленный для отправки клиенту пост.*/
  static mapFromPostDocumentTypeToPostOutputDTO(
    post: PostDocumentType,
    likeStatus: PostLikeStatusOutputDTO,
    newestLikes: NewestPostLikeListOutputDTO
  ): PostOutputDTO {
    const postOutputDTO: PostOutputDTO = new PostOutputDTO();
    postOutputDTO.id = post._id.toString();
    postOutputDTO.title = post.title;
    postOutputDTO.shortDescription = post.shortDescription;
    postOutputDTO.content = post.content;
    postOutputDTO.blogId = post.blogId;
    postOutputDTO.blogName = post.blogName;
    postOutputDTO.createdAt = post.createdAt;

    postOutputDTO.extendedLikesInfo = {
      likesCount: post.extendedLikesInfo.likesCount,
      dislikesCount: post.extendedLikesInfo.dislikesCount,
      myStatus: likeStatus,
      newestLikes: newestLikes.map((postLikeData: NewestPostLikeOutputDTO) => ({
        addedAt: postLikeData.addedAt,
        userId: postLikeData.userId,
        login: postLikeData.login,
      })),
    };

    return postOutputDTO;
  }

  /*Маппер для преобразования постов из БД в подготовленные для отправки клиенту посты.*/
  static async mapFromPostListDocumentTypeToPostListOutputDTO(
    posts: PostListDocumentType,
    postsQueryRepository: PostsQueryRepository,
    userId: string | undefined
  ): Promise<PostListOutputDTO> {
    /*Если в виде постов был передан пустой массив, то возвращаем пустой массив.*/
    if (posts.length === 0) return [];
    /*Получаем ID постов.*/
    const postIds: string[] = posts.map((post: PostDocumentType): string => post._id.toString());
    /*Создаем Map формата "postId: likeStatus", чтобы избежать многочисленных запросов в БД для получения статусов лайков
    пользователя каждого поста.*/
    let postLikesDataMap: Map<string, PostLikeStatusOutputDTO> = new Map<string, PostLikeStatusOutputDTO>();

    /*Если был передан ID пользователя, то получаем статусы лайков пользователя каждого поста.*/
    if (userId) {
      /*Просим query-репозиторий "postsQueryRepository" найти данные о лайках постов по ID постов и ID пользователя в
      БД.*/
      const postLikesDataDB: PostLikeDataListDocumentType =
        await postsQueryRepository.findAllPostLikesDataByPostIdsAndUserId(postIds, userId);

      /*Заполняем Map статусами лайков пользователя каждого поста, не обращаясь в БД.*/
      postLikesDataMap = new Map(
        postLikesDataDB.map((postLikeDataDB: PostLikeDataDocumentType): [string, PostLikeStatusOutputDTO] => [
          postLikeDataDB.postId,
          postLikeDataDB.likeStatus as unknown as PostLikeStatusOutputDTO,
        ])
      );
    }

    /*Создаем Map формата "postId: PostLikeDataListDocumentType", чтобы избежать многочисленных запросов в БД для получения
    данных о трех последних лайках каждого поста.*/
    const newestLikesMap: Map<string, PostLikeDataListDocumentType> =
      /*Просим query-репозиторий "postsQueryRepository" найти данные о трех последних лайках постов по ID постов в БД.*/
      await postsQueryRepository.findLastThreeLikesForPostsByPostIds(postIds);

    /*Формируем массив подготовленных для отправки клиенту без пагинации постов.*/
    return posts.map((post: PostDocumentType): PostOutputDTO => {
      /*Получаем ID поста.*/
      const postId: string = post._id.toString();
      /*Получаем статус лайка поста.*/
      const likeStatus: PostLikeStatusOutputDTO = postLikesDataMap.get(postId) ?? PostLikeStatusOutputDTO.None;
      /*Получаем данные о трех последних лайках поста.*/
      const newestLikes: PostLikeDataListDocumentType = newestLikesMap.get(postId) ?? [];
      /*Преобразовываем пост из БД в подготовленный для отправки клиенту пост.*/
      return this.mapFromPostDocumentTypeToPostOutputDTO(post, likeStatus, newestLikes);
    });
  }
}
