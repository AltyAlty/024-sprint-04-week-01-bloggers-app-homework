import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { PostSortFieldQueryInputDTO } from '../../../posts/input-dto/query/post-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске постов в блоге.*/
export class GetPostListByBlogIdQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  sortBy: PostSortFieldQueryInputDTO = PostSortFieldQueryInputDTO.CreatedAt;
}
