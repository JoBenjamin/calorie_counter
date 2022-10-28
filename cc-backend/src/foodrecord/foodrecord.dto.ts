import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { FoodRecord } from './foodrecord.schema';

export class createFoodRecordDto extends OmitType(FoodRecord, [
  'date',
  'user',
] as const) {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsMongoId()
  @IsOptional()
  user: string;
}

export class editFoodRecordDto extends PartialType(createFoodRecordDto) {}
