import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createFoodRecordDto } from './foodrecord.dto';
import { FoodRecordDocument } from './foodrecord.schema';

@Controller('foodrecord')
export class FoodrecordController {
  constructor(
    @InjectModel('FoodRecord')
    private foodRecordModel: Model<FoodRecordDocument>,
  ) {}
  @Post()
  async createFoodRecord(@Body() createFoodRecordDto: createFoodRecordDto) {
    const newRecord = await this.foodRecordModel.create(createFoodRecordDto);
    return newRecord;
  }
}
