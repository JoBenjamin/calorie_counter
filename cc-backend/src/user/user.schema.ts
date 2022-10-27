import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRolesEnum {
  ADMIN = 'ADMIN',
}

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
  @IsString()
  @IsUUID()
  accessToken: string;

  @Prop()
  @IsString()
  password: string;

  @Prop()
  @IsPositive()
  dailyCalorieLimit: number;

  @Prop()
  @IsArray()
  @IsEnum(UserRolesEnum, { each: true })
  roles: UserRolesEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
