import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { normalizeEmail } from '../../../../core/utils/email/normalize-email.util';
import { UserDocumentType } from './document-types/user.document-type';
import { CreateUserDomainDTO } from './domain-dto/create-user.domain-dto';

/*Класс для сущности пользователя.*/
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, trim: true, minlength: 1, maxlength: 100 })
  login: string;

  @Prop({ type: String, required: true, unique: true, trim: true, minlength: 1, maxlength: 1000 })
  originalEmail: string;

  @Prop({ type: String, required: true, unique: true, trim: true, minlength: 1, maxlength: 1000 })
  email: string;

  @Prop({ type: String, required: true, minlength: 1, maxlength: 100 })
  passwordHash: string;

  @Prop({ type: Boolean, default: false })
  isConfirmed: boolean;

  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  /*Виртуальное свойство для получения ID пользователя.*/
  public get id(): string {
    return (this as unknown as UserDocumentType)._id.toString();
  }

  /*Метод для создания пользователя.*/
  public static createInstance(dto: CreateUserDomainDTO): UserDocumentType {
    const user = new this();
    user.login = dto.login;
    user.originalEmail = dto.email;
    user.email = normalizeEmail(dto.email);
    user.passwordHash = dto.passwordHash;
    return user as UserDocumentType;
  }

  /*Метод для soft удаления пользователя.*/
  public markAsDeleted(): void {
    if (this.deletedAt !== null) throw new Error('User is already deleted');
    this.deletedAt = new Date();
  }
}

/*Создаем схему для пользователя на основе класса для сущности пользователя.*/
export const UserSchema = SchemaFactory.createForClass(User);
/*Регистрируем методы класса для сущности пользователя в схеме для пользователя.*/
UserSchema.loadClass(User);
