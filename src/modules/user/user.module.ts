import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './api/users/users.controller';
import { Argon2Service } from '../../core/security/argon2.service';
import { BcryptService } from '../../core/security/bcrypt.service';
import { UsersService } from './application/users/users.service';
import { UsersQueryService } from './application/users/users.query-service';
import { UsersRepository } from './infrastructure/users/users.repository';
import { UsersQueryRepository } from './infrastructure/users/users.query-repository';
import { CoreModule } from '../../core/core.module';
import { User, UserSchema } from './domain/users/user.entity';

/*Модуль для пользователей.*/
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CoreModule],
  controllers: [UsersController],
  providers: [Argon2Service, BcryptService, UsersService, UsersQueryService, UsersRepository, UsersQueryRepository],
})
export class UserModule {}
