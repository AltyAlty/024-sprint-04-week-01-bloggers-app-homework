import { CommentLikeStatusOutputDTO } from './comment-like-status.output-dto';

/*Output DTO для данных о лайках комментария.*/
export class LikesInfoOutputDTO {
  likesCount: number;
  dislikesCount: number;
  myStatus: CommentLikeStatusOutputDTO;
}
