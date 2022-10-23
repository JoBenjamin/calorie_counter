import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = FoodRecord & Document;

@Schema()
export class FoodRecord {
  @Prop()
  name: string;

  @Prop()
  calorieCount: number;

  @Prop()
  date: Date;
}

export const FoodRecordSchema = SchemaFactory.createForClass(FoodRecord);
