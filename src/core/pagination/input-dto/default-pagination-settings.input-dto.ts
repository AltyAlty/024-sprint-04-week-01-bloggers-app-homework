import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { SortDirectionInputDTO } from './sort-direction.input-dto';

/*Input DTO для объекта с настройками пагинации по умолчанию.*/
export class DefaultPaginationSettingsInputDTO {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @IsOptional()
  @IsEnum(SortDirectionInputDTO)
  sortDirection: SortDirectionInputDTO = SortDirectionInputDTO.Desc;

  /*Метод для подсчета сколько записей надо пропустить перед тем, как начать отдавать запрошенную страницу
  "pageNumber"*/
  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
