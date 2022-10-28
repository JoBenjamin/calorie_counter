import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodRecordDocument } from 'src/foodrecord/foodrecord.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class StatService {
  constructor(
    @InjectModel('FoodRecord')
    private foodRecordModel: Model<FoodRecordDocument>,
  ) {}
  async getTodaysCalorieCount(req) {
    const userId = req.user._id;
    if (!userId) {
      throw new HttpException('COULDNT_IDENTIFY_USER', HttpStatus.BAD_REQUEST);
    }
    const todaysFoodRecords = await this.foodRecordModel.find({
      user: userId,
      date: {
        $gte: dayjs().startOf('day').toDate(),
      },
    });

    const calorieCount = todaysFoodRecords.reduce(
      (prev, current) => prev + current.calorieCount,
      0,
    );

    return calorieCount;
  }
}
