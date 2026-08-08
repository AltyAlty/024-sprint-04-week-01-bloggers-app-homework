import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/*Схема для поля "commentatorInfo" в сущности комментария.*/
@Schema({ _id: false })
export class CommentatorInfo {
  @Prop({ type: Number, required: true, trim: true, minlength: 1, maxlength: 100 })
  userId: string;
  @Prop({ type: Number, required: true, trim: true, minlength: 1, maxlength: 100 })
  userLogin: string;
}

export const CommentatorInfoSchema = SchemaFactory.createForClass(CommentatorInfo);
