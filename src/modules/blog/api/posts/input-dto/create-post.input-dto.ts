import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

/*Input DTO для создания поста с валидацией при помощи библиотеки class-validator.*/
export class CreatePostInputDTO {
  @IsString({ message: 'Field "title" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "title" must not be empty' })
  @Length(1, 30, { message: 'Field "title" must be between 1 and 30 characters' })
  title: string;

  @IsString({ message: 'Field "shortDescription" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "shortDescription" must not be empty' })
  @Length(1, 100, { message: 'Field "shortDescription" must be between 1 and 100 characters' })
  shortDescription: string;

  @IsString({ message: 'Field "content" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "content" must not be empty' })
  @Length(1, 1000, { message: 'Field "content" must be between 1 and 1000 characters' })
  content: string;

  @IsString({ message: 'Field "blogId" must be a string' })
  @Transform(({ value }: { value: string }): string => value?.trim())
  @IsNotEmpty({ message: 'Field "blogId" must not be empty' })
  @IsMongoId({ message: 'Field "blogId" must be an ObjectId' })
  blogId: string;
}
