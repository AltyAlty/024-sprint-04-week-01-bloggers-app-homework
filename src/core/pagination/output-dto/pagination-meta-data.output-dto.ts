/*Output DTO для запросов списков с пагинацией. Сделан абстрактным, чтобы от него нельзя было создать экземпляр, но при
этом все еще можно было использовать как тип.*/
export abstract class PaginationMetaDataOutputDTO<T> {
  page: number;
  pageSize: number;
  pagesCount: number;
  totalCount: number;
  abstract items: T;

  /*Маппер для преобразования элементов списка в подготовленные для отправки клиенту с пагинацией элементы списка.*/
  public static mapToOutputDTO<T>(data: {
    page: number;
    pageSize: number;
    totalCount: number;
    items: T;
  }): PaginationMetaDataOutputDTO<T> {
    return {
      totalCount: data.totalCount,
      pagesCount: Math.ceil(data.totalCount / data.pageSize),
      page: data.page,
      pageSize: data.pageSize,
      items: data.items,
    };
  }
}
