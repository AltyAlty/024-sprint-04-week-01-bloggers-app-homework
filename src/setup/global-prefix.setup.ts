import { INestApplication } from '@nestjs/common';
import { SETTINGS } from '../core/settings/settings';

/*Функция для установки глобального префикса ко всем маршрутам приложения.*/
export function globalPrefixSetup(app: INestApplication) {
  app.setGlobalPrefix(SETTINGS.GLOBAL_PREFIX);
}
