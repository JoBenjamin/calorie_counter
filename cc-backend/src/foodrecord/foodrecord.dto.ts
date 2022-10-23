import { OmitType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { FoodRecord } from './foodrecord.schema';

export class createFoodRecordDto extends OmitType(FoodRecord, [
  'date',
] as const) {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
