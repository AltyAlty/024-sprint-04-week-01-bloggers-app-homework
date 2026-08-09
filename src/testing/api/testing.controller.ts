import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TestingService } from '../application/testing.service';
import { SETTINGS } from '../../core/settings/settings';

/*Контроллер для тестирования приложения.*/
@Controller(SETTINGS.TESTING_PREFIX)
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  /*001. DELETE-запрос по очистке БД.*/
  @Delete(SETTINGS.CLEAR_DB_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async clearDb(): Promise<void> {
    await this.testingService.clearDb();
  }
}
