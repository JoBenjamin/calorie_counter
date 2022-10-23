import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Prop()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsPositive()
  dailyCalorieLimit: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
