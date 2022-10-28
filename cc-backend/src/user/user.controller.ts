import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserDocument, UserRolesEnum } from './user.schema';

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
}
