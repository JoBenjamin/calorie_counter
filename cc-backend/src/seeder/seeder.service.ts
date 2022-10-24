import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Command } from 'nestjs-command';
import { hashPassword } from 'src/util/hashPassword';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SeederService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  @Command({
    command: 'add:user',
  })
  async createNewUser() {
    try {
      const newUser: User = {
        firstName: 'Daniel',
        lastName: 'Velazquez',
        dailyCalorieLimit: 8800,
        email: 'danvel@gmail.com',
        password: hashPassword('tokimeki'),
        accessToken: uuid(),
      };

      await this.userModel.create(newUser);
      console.log('New user successfully created');
    } catch (error) {
      console.log(error);
      console.log('Failed to create new user');
    }
  }
}
