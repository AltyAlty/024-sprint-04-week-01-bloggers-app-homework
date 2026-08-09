import { Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../infrastructure/users/users.query-repository';
import { GetUserListQueryInputDTO } from '../../api/users/input-dto/query/get-user-list-query.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { UserOutputDTO } from '../../api/users/output-dto/user.output-dto';
import { UserListOutputDTO } from '../../api/users/output-dto/user-list.output-dto';
import { UserListDocumentType } from '../../domain/users/document-types/user-list.document-type';

/*Query-сервис для пользователей.*/
@Injectable()
export class UsersQueryService {
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  /*Метод для поиска блогов.*/
  public async findAll(dto: GetUserListQueryInputDTO): Promise<PaginationMetaDataOutputDTO<UserListOutputDTO>> {
    /*Просим query-репозиторий "usersQueryRepository" найти пользователей в БД.*/
    const { items, totalCount }: { items: UserListDocumentType; totalCount: number } =
      await this.usersQueryRepository.findAll(dto);

    /*Преобразовываем пользователей из БД в подготовленных для отправки клиенту пользователей.*/
    const userListOutput: UserListOutputDTO = UserOutputDTO.mapFromUserListDocumentTypeToUserListOutputDTO(items);

    /*Преобразовываем подготовленных для отправки клиенту пользователей в подготовленных для отправки клиенту с
    пагинацией пользователей и возвращаем их.*/
    return PaginationMetaDataOutputDTO.mapToOutputDTO({
      page: dto.pageNumber,
      pageSize: dto.pageSize,
      totalCount: totalCount,
      items: userListOutput,
    });
  }
}
