import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SETTINGS } from './core/settings/settings';
import { BlogModule } from './modules/blog/blog.module';

/*Главный модуль приложения. Обязателен.*/
@Module({
  imports: [MongooseModule.forRoot(SETTINGS.MONGO_URL), BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
