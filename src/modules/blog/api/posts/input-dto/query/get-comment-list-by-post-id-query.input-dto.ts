import { IsEnum, IsOptional } from 'class-validator';
import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { CommentSortFieldQueryInputDTO } from '../../../comments/input-dto/query/comment-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске комментариев по ID поста.*/
export class GetCommentListByPostIdQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  @IsOptional()
  @IsEnum(CommentSortFieldQueryInputDTO)
  sortBy: CommentSortFieldQueryInputDTO = CommentSortFieldQueryInputDTO.CreatedAt;
}
