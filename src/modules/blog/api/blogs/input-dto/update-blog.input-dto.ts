import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

/*Валидационный Input DTO для изменения блога.*/
export class UpdateBlogInputDTO {
  @IsString({ message: 'Field "name" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "name" must not be empty' })
  @Length(1, 15, { message: 'Field "name" must be between 1 and 15 characters' })
  name: string;

  @IsString({ message: 'Field "description" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "description" must not be empty' })
  @Length(1, 500, { message: 'Field "description" must be between 1 and 500 characters' })
  description: string;

  @IsString({ message: 'Field "websiteUrl" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "websiteUrl" must not be empty' })
  @Length(5, 100, { message: 'Field "websiteUrl" must be between 5 and 100 characters' })
  @Matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/, {
    message: 'Field "websiteUrl" is invalid',
  })
  @IsUrl({}, { message: 'Field "websiteUrl" is invalid' })
  websiteUrl: string;
}
