import { PostLikeStatusDomainDTO } from './post-like-status.domain-dto';

/*Domain DTO для создания лайка поста.*/
export class CreatePostDomainDTO {
  postId: string;
  userId: string;
  login: string;
  likeStatus: PostLikeStatusDomainDTO;
}
