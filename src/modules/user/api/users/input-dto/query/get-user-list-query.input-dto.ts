import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { UserSortFieldQueryInputDTO } from './user-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске пользователей.*/
export class GetUserListQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  sortBy: UserSortFieldQueryInputDTO = UserSortFieldQueryInputDTO.CreatedAt;
  searchLoginTerm: string | null = null;
  searchEmailTerm: string | null = null;
}
