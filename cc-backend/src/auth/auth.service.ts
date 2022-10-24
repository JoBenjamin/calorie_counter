import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async getUserByToken(token: string) {
    const user = await this.userModel.findOne({ accessToken: token });
    return user;
  }
}
