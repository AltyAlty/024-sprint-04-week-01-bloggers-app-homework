import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

/*Необязательный контроллер для модуля "AppModule".*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public hello(): string {
    return this.appService.hello();
  }
}
