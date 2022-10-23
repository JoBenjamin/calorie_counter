import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = FoodRecord & Document;

@Schema()
export class FoodRecord {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsPositive()
  calorieCount: number;

  @Prop()
  @IsDate()
  date: Date;
}

export const FoodRecordSchema = SchemaFactory.createForClass(FoodRecord);
