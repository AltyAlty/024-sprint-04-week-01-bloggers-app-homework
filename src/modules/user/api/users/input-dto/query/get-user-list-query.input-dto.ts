import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { UserSortFieldQueryInputDTO } from './user-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске пользователей.*/
export class GetUserListQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  @IsOptional()
  @IsEnum(UserSortFieldQueryInputDTO)
  sortBy: UserSortFieldQueryInputDTO = UserSortFieldQueryInputDTO.CreatedAt;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchLoginTerm: string | null = null;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchEmailTerm: string | null = null;
}
