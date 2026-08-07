import { Type } from 'class-transformer';
import { SortDirectionInputDTO } from './sort-direction.input-dto';

/*Input DTO для объекта с настройками пагинации по умолчанию.*/
export class DefaultPaginationSettingsInputDTO {
  @Type(() => Number)
  pageNumber: number = 1;

  @Type(() => Number)
  pageSize: number = 10;

  sortDirection: SortDirectionInputDTO = SortDirectionInputDTO.Desc;

  /*Метод для подсчета сколько записей надо пропустить перед тем, как начать отдавать запрошенную страницу
  "pageNumber"*/
  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
