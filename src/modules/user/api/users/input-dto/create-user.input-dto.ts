import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

/*Валидационный Input DTO для создания пользователя.*/
export class CreateUserInputDTO {
  @IsString({ message: 'Field "login" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "login" must not be empty' })
  @Length(3, 10, { message: 'Field "login" must be between 3 and 10 characters' })
  @Matches(/^[a-zA-Z0-9_-]*$/, { message: 'Field "login" can only contain letters, numbers, underscores and hyphens' })
  login: string;

  @IsString({ message: 'Field "password" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "password" must not be empty' })
  @Length(6, 20, { message: 'Field "password" must be between 6 and 20 characters' })
  password: string;

  @IsString({ message: 'Field "email" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "email" must not be empty' })
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, { message: 'Field "email" is invalid' })
  @IsEmail({}, { message: 'Field "email" is invalid' })
  email: string;
}
