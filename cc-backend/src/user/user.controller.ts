import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { User, UserDocument, UserRolesEnum } from './user.schema';
import { hashPassword } from 'src/util/hashPassword';
import { v4 as uuid } from 'uuid';
import { dailyCalorieLimit } from 'src/seeder/data';
import { InviteUserDto } from './user.dto';

@Controller('user')
@UseGuards(AuthGuard('bearer'))
export class UserController {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  @Get('/all')
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async getAllUsers() {
    const users = await this.userModel.find({}, { _id: 1, email: 1 });
    return users;
  }

  @Post('/invite')
  async inviteNewUser(@Body() dto: InviteUserDto) {
    const userPrimer: User = {
      firstName: 'Best',
      lastName: 'Friend',
      accessToken: uuid(),
      password: hashPassword('1234'),
      dailyCalorieLimit: dailyCalorieLimit,
      email: dto.email,
      roles: [],
    };
    const newUser = await this.userModel.create(userPrimer);
    return newUser;
  }
}
