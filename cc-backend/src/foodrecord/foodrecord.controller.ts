import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createFoodRecordDto } from './foodrecord.dto';
import { FoodRecordDocument } from './foodrecord.schema';
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
    const newRecord = await this.foodRecordModel.create(createFoodRecordDto);
    console.log('New food entry created by: ', req.user);
    return newRecord;
  }
}
