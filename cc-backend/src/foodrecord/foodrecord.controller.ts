import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { createFoodRecordDto } from './foodrecord.dto';
import { FoodRecord, FoodRecordDocument } from './foodrecord.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRolesEnum } from 'src/user/user.schema';
import { RolesGuard } from 'src/guards/roles.guard';

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
    let foodRecords;
    if (req.user.roles.includes('ADMIN')) {
      foodRecords = await this.foodRecordModel.find().populate('user', 'email');
    } else {
      foodRecords = await this.foodRecordModel.find({ user: req.user._id });
    }
    return foodRecords;
  }

  @Delete('/:id')
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async deleteFoodRecord(@Param('id') id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('INVALID_ID', HttpStatus.BAD_REQUEST);
    }
    const result = await this.foodRecordModel.findByIdAndDelete(id);
    return result;
  }
}
