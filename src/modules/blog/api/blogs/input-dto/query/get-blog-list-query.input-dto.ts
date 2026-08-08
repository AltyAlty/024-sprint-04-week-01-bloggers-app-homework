import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { BlogSortFieldQueryInputDTO } from './blog-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске блогов. Наследуется от класса "DefaultPaginationSettingsInputDTO", где
уже есть поля пагинации по умолчанию.*/
export class GetBlogListQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  sortBy: BlogSortFieldQueryInputDTO = BlogSortFieldQueryInputDTO.CreatedAt;
  searchNameTerm: string | null = null;
}
