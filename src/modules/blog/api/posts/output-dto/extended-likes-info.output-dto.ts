import { NewestPostLikeListOutputDTO } from './newest-post-like-list.output-dto';
import { PostLikeStatusOutputDTO } from './post-like-status.output-dto';

/*Output DTO для данных о лайках поста.*/
export class ExtendedLikesInfoOutputDTO {
  likesCount: number;
  dislikesCount: number;
  myStatus: PostLikeStatusOutputDTO;
  newestLikes: NewestPostLikeListOutputDTO;
}
