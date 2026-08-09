import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/*Схема для поля "likesInfo" в сущности комментария.*/
@Schema({ _id: false })
export class LikesInfo {
  @Prop({ type: Number, required: true, min: 0, default: 0 })
  likesCount: number;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  dislikesCount: number;
}

export const LikesInfoSchema = SchemaFactory.createForClass(LikesInfo);
