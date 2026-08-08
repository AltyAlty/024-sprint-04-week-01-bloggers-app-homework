import { Module } from '@nestjs/common';
import { Argon2Service } from './security/argon2.service';
import { BcryptService } from './security/bcrypt.service';

/*Глобальный модуль, предоставляющий функционал, который может использоваться во всех частях приложения.*/
@Module({
  providers: [Argon2Service, BcryptService],
  exports: [Argon2Service, BcryptService],
})
export class CoreModule {}
