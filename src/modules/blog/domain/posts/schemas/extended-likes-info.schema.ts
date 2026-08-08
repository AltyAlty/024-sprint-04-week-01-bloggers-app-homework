import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/*Схема для поля "extendedLikesInfo" в сущности поста.*/
@Schema({ _id: false })
export class ExtendedLikesInfo {
  @Prop({ type: Number, required: false, min: 0, default: 0 })
  likesCount: number;
  @Prop({ type: Number, required: false, min: 0, default: 0 })
  dislikesCount: number;
}

export const ExtendedLikesInfoSchema = SchemaFactory.createForClass(ExtendedLikesInfo);
