import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DefaultPaginationSettingsInputDTO } from '../../../../../../core/pagination/input-dto/default-pagination-settings.input-dto';
import { BlogSortFieldQueryInputDTO } from './blog-sort-field-query.input-dto';

/*Input DTO для query-параметров при поиске блогов. Наследуется от класса "DefaultPaginationSettingsInputDTO", где
уже есть поля пагинации по умолчанию.*/
export class GetBlogListQueryInputDTO extends DefaultPaginationSettingsInputDTO {
  @IsOptional()
  @IsEnum(BlogSortFieldQueryInputDTO)
  sortBy: BlogSortFieldQueryInputDTO = BlogSortFieldQueryInputDTO.CreatedAt;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  searchNameTerm: string | null = null;
}
