import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
import { Command } from 'nestjs-command';
import { testUsers } from './data';
import { FoodRecordDocument } from 'src/foodrecord/foodrecord.schema';

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
      await Promise.all(
        testUsers.map((testUser) => {
          return this.userModel.create(testUser);
        }),
      );

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
}
