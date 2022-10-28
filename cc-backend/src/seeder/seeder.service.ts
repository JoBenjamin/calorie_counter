import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { Command } from 'nestjs-command';
import { foodNameList, testUsers } from './data';
import {
  FoodRecord,
  FoodRecordDocument,
} from 'src/foodrecord/foodrecord.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('FoodRecord')
    private foodRecordModel: Model<FoodRecordDocument>,
  ) {}

  @Command({
    command: 'seed',
  })
  async seedDatabase() {
    try {
      await this.clearDatabase();
      const users = await Promise.all(
        testUsers.map((testUser) => {
          return this.userModel.create(testUser);
        }),
      );

      for (let index = 0; index < 150; index++) {
        const user = this.pickRandomItem(users);
        const foodRecordPrimer: FoodRecord = {
          name: this.pickRandomItem(foodNameList),
          user: user._id,
          calorieCount: Math.round(Math.random() * 500) + 10,
          date: dayjs()
            .set('month', Math.round(8 + Math.random()))
            .set('date', Math.round(Math.random() * 29))
            .set('hour', 11)
            .toDate(),
        };
        await this.foodRecordModel.create(foodRecordPrimer);
      }
      console.log('Seeding complete!');
    } catch (error) {
      console.log(error);
      console.log('Seeding failed!');
    }
  }

  async clearDatabase() {
    await this.userModel.deleteMany();
    await this.foodRecordModel.deleteMany();
  }

  invokeRandomTimes(
    callback: Function,
    args: any[],
    min: number = 1,
    max: number = 1,
  ): any[] {
    const result = [];
    const invokeCount = min + Math.round(Math.random() * (max - min));
    for (let i = 0; i < invokeCount; i++) {
      result.push(callback(...args));
    }
    return result;
  }

  pickRandomItem(collection: any[], min: number = 1, max: number = 1) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    return collection[randomIndex];
  }
}
