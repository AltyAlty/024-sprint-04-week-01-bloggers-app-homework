import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

/*Необязательный контроллер для модуля "AppModule".*/
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public hello(): string {
    return 'Hello World!';
  }
}
