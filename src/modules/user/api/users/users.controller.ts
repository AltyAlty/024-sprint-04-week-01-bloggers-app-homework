import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { UsersService } from '../../application/users/users.service';
import { UsersQueryService } from '../../application/users/users.query-service';
import { CreateUserInputDTO } from './input-dto/create-user.input-dto';
import { GetUserListQueryInputDTO } from './input-dto/query/get-user-list-query.input-dto';
import { PaginationMetaDataOutputDTO } from '../../../../core/pagination/output-dto/pagination-meta-data.output-dto';
import { UserOutputDTO } from './output-dto/user.output-dto';
import { UserListOutputDTO } from './output-dto/user-list.output-dto';
import { SETTINGS } from '../../../../core/settings/settings';

/*Контроллер для постов.*/
@Controller(SETTINGS.POSTS_PREFIX)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryService: UsersQueryService
  ) {}

  /*001. POST-запрос по созданию пользователя.*/
  @Post(SETTINGS.CREATE_USER_PATH)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserInputDTO): Promise<UserOutputDTO> {
    /*Просим сервис "usersService" создать пользователя.*/
    const userId: string = await this.usersService.create(body);
    /*Просим сервис "usersService" найти созданного пользователя по ID.*/
    return await this.usersService.findById(userId);
  }

  /*002. GET-запрос по поиску пользователей с пагинацией, используя query-параметры.*/
  @Get(SETTINGS.GET_USER_LIST_PATH)
  async getUserList(@Query() query: GetUserListQueryInputDTO): Promise<PaginationMetaDataOutputDTO<UserListOutputDTO>> {
    /*Просим query-сервис "usersQueryService" найти блоги.*/
    return await this.usersQueryService.findAll(query);
  }

  /*003. DELETE-запрос по удалению пользователя по ID, используя URI-параметры.*/
  @ApiParam({ name: 'id' })
  @Delete(SETTINGS.DELETE_USER_BY_ID_PATH)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: string): Promise<void> {
    /*Просим сервис "usersService" удалить блог по ID.*/
    await this.usersService.delete(id);
  }
}
