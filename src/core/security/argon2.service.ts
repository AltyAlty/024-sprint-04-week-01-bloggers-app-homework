import { Injectable } from '@nestjs/common';
import { Algorithm, hash, verify, Version } from '@node-rs/argon2';

/*Сервис для работы с библиотекой @node-rs/argon2.*/
@Injectable()
export class Argon2Service {
  /*Метод для генерации хеша пароля.*/
  public async generatePasswordHash(password: string): Promise<string> {
    return hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      outputLen: 32,
      parallelism: 4,
      algorithm: 2 as Algorithm,
      version: 0x13 as Version,
    });
  }

  /*Метод для проверки валидности пароля по хешу.*/
  public async checkPasswordByHash(password: string, hash: string): Promise<boolean> {
    return verify(hash, password);
  }
}
