import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import mongoose, { Document, ObjectId } from 'mongoose';

export type FoodRecordDocument = FoodRecord & Document;

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

  @Prop({ ref: 'User', type: mongoose.Types.ObjectId })
  @IsMongoId()
  user: ObjectId;
}

export const FoodRecordSchema = SchemaFactory.createForClass(FoodRecord);
