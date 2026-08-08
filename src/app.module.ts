import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SETTINGS } from './core/settings/settings';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { TestingModule } from './testing/testing.module';

/*Главный обязательный модуль приложения.*/
@Module({
  imports: [MongooseModule.forRoot(SETTINGS.MONGO_URL), BlogModule, UserModule, TestingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
