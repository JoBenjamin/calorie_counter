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

  async getAdminStats() {
    return {
      lastSeven: await this.getLastSevenDaysCount(),
      weekBefore: await this.getWeekBeforeCount(),
      userAverage: await this.getUserAverage(),
    };
  }

  async getLastSevenDaysCount() {
    const marker = dayjs().subtract(7, 'd').toDate();
    const items = await this.foodRecordModel.find({
      date: {
        $gte: marker,
      },
    });
    return items.length;
  }

  async getWeekBeforeCount() {
    const firstMarker = dayjs().subtract(14, 'd').toDate();
    const secondMarker = dayjs().subtract(7, 'd').toDate();
    const items = await this.foodRecordModel.find({
      date: {
        $gte: firstMarker,
        $lt: secondMarker,
      },
    });
    return items.length;
  }

  async getUserAverage() {
    const marker = dayjs().subtract(7, 'd').toDate();
    const items = await this.foodRecordModel.find({
      date: {
        $gte: marker,
      },
    });

    const totalCalories = items.reduce(
      (prev, current) => prev + current.calorieCount,
      0,
    );

    const userSet = new Set();

    items.forEach((item) => {
      userSet.add(item.user.toString());
    });

    const average = (totalCalories / userSet.size).toFixed(0);
    return average;
  }
}
