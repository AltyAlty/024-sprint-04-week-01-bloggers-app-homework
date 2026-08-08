import { UserListOutputDTO } from './user-list.output-dto';
import { UserDocumentType } from '../../../domain/users/document-types/user.document-type';
import { UserListDocumentType } from '../../../domain/users/document-types/user-list.document-type';

/*Output DTO для пользователя.*/
export class UserOutputDTO {
  id: string;
  login: string;
  email: string;
  createdAt: Date;

  /*Маппер для преобразования пользователя из БД в подготовленного для отправки клиенту пользователя.*/
  static mapFromUserDocumentTypeToUserOutputDTO(user: UserDocumentType): UserOutputDTO {
    const userOutputDTO: UserOutputDTO = new UserOutputDTO();
    userOutputDTO.id = user._id.toString();
    userOutputDTO.id = user.id;
    userOutputDTO.login = user.login;
    userOutputDTO.email = user.email;
    userOutputDTO.createdAt = user.createdAt;
    return userOutputDTO;
  }

  /*Маппер для преобразования пользователей из БД в подготовленных для отправки клиенту пользователей.*/
  static mapFromUserListDocumentTypeToUserListOutputDTO(users: UserListDocumentType): UserListOutputDTO {
    return users.map((user: UserDocumentType) => {
      return this.mapFromUserDocumentTypeToUserOutputDTO(user);
    });
  }
}
