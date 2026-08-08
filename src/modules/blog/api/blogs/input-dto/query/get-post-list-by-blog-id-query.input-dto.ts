import { IsEnum, IsOptional } from 'class-validator';
import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { PostSortFieldQueryInputDTO } from '../../../posts/input-dto/query/post-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске постов по ID блога.*/
export class GetPostListByBlogIdQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  @IsOptional()
  @IsEnum(PostSortFieldQueryInputDTO)
  sortBy: PostSortFieldQueryInputDTO = PostSortFieldQueryInputDTO.CreatedAt;
}
