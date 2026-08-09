import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Argon2Service } from '../../../../core/security/argon2.service';
import { UsersRepository } from '../../infrastructure/users/users.repository';
import { CreateUserInputDTO } from '../../api/users/input-dto/create-user.input-dto';
import { UserOutputDTO } from '../../api/users/output-dto/user.output-dto';
import { UserDocumentType } from '../../domain/users/document-types/user.document-type';
import type { UserModelType } from '../../domain/users/model-types/user.model-type';
import { User } from '../../domain/users/user.entity';

/*Сервис для пользователей.*/
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: UserModelType,
    private readonly argon2Service: Argon2Service,
    private readonly usersRepository: UsersRepository
  ) {}

  /*Метод для создания пользователя.*/
  public async create(dto: CreateUserInputDTO): Promise<string> {
    /*Просим сервис "argon2Service" сгенерировать хеш для пароля.*/
    const passwordHash: string = await this.argon2Service.generatePasswordHash(dto.password);
    /*Просим модель "UserModel" создать пользователя.*/
    const user: UserDocumentType = this.UserModel.createInstance({ login: dto.login, email: dto.email, passwordHash });
    /*Просим репозиторий "usersRepository" сохранить пользователя в БД.*/
    await this.usersRepository.save(user);
    /*Возвращаем ID созданного пользователя.*/
    return user.id;
  }

  /*Метод для поиска пользователя по ID.*/
  public async findById(id: string): Promise<UserOutputDTO> {
    /*Просим репозиторий "usersRepository" найти пользователя по ID в БД.*/
    const user: UserDocumentType | null = await this.usersRepository.findById(id);
    /*Если пользователь не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!user) throw new NotFoundException('User not found');
    /*Если пользователь был найден, то преобразовываем пользователя из БД в подготовленного для отправки клиенту
    пользователя и возвращаем его.*/
    return UserOutputDTO.mapFromUserDocumentTypeToUserOutputDTO(user);
  }

  /*Метод для soft удаления пользователя по ID.*/
  public async markAsDeleted(id: string) {
    /*Просим репозиторий "usersRepository" найти пользователя по ID в БД.*/
    const user: UserDocumentType | null = await this.usersRepository.findById(id);
    /*Если пользователь не был найден, то выбрасываем исключение с информацией об этом.*/
    if (!user) throw new NotFoundException('User not found');
    /*Если пользователь был найден, то помечаем его как удаленного.*/
    user.markAsDeleted();
    /*Просим репозиторий "usersRepository" сохранить измененного пользователя.*/
    await this.usersRepository.save(user);
  }

  /*Метод для hard удаления пользователя по ID.*/
  public async delete(id: string): Promise<void> {
    /*Просим сервис "usersService" найти пользователя по ID в БД.*/
    await this.findById(id);
    /*Просим репозиторий "usersRepository" удалить пользователя по ID в БД.*/
    await this.usersRepository.deleteById(id);
  }
}
