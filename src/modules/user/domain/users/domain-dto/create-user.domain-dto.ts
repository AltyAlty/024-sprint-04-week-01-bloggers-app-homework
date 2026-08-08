/*Domain DTO для создания пользователя.*/
export class CreateUserDomainDTO {
  login: string;
  email: string;
  passwordHash: string;
}
