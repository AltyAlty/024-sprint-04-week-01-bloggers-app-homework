import { CommentatorInfo } from '../schemas/commentator-info.schema';

/*Domain DTO для создания комментария.*/
export class CreateCommentDomainDTO {
  content: string;
  postId: string;
  commentatorInfo: CommentatorInfo;
}
