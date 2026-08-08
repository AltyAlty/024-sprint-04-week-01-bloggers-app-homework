import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { PostSortFieldQueryInputDTO } from './post-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске постов.*/
export class GetPostListQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  sortBy: PostSortFieldQueryInputDTO = PostSortFieldQueryInputDTO.CreatedAt;
}
