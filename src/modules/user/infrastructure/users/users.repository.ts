import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongoose';
import { UserDocumentType } from '../../domain/users/document-types/user.document-type';
import type { UserModelType } from '../../domain/users/model-types/user.model-type';
import { User } from '../../domain/users/user.entity';

/*Репозиторий для пользователей.*/
@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {}

  /*Метод для сохранения пользователя в БД.*/
  async save(user: UserDocumentType): Promise<void> {
    await user.save();
  }

  /*Метод для поиска пользователя по ID в БД.*/
  async findById(id: string): Promise<UserDocumentType | null> {
    /*Просим модель "UserModel" найти пользователя по ID в БД.*/
    return await this.UserModel.findOne({ _id: id, deletedAt: null });
  }

  /*Метод для hard удаления пользователя по ID в БД.*/
  async deleteById(id: string): Promise<boolean> {
    /*Просим модель "UserModel" удалить пользователя по ID в БД.*/
    const result: DeleteResult = await this.UserModel.deleteOne({ _id: id });
    /*Возращаем статус операции по удалению пользователя по ID в БД.*/
    return result.deletedCount === 1;
  }
}
