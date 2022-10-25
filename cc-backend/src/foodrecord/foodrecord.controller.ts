import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createFoodRecordDto } from './foodrecord.dto';
import { FoodRecord, FoodRecordDocument } from './foodrecord.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('foodrecord')
@UseGuards(AuthGuard('bearer'))
export class FoodrecordController {
  constructor(
    @InjectModel('FoodRecord')
    private foodRecordModel: Model<FoodRecordDocument>,
  ) {}

  @Post()
  async createFoodRecord(
    @Body() createFoodRecordDto: createFoodRecordDto,
    @Req() req,
  ) {
    const foodRecordPrimer: FoodRecord = {
      ...createFoodRecordDto,
      date: new Date(createFoodRecordDto.date),
      user: req.user._id,
    };
    const newRecord = await this.foodRecordModel.create(foodRecordPrimer);
    return newRecord;
  }

  @Get()
  async getFoodRecords(@Req() req) {
    const foodRecords = await this.foodRecordModel.find({ user: req.user._id });
    return foodRecords;
  }
}
