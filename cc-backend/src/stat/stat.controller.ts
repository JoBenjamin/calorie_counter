import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRolesEnum } from 'src/user/user.schema';
import { StatService } from './stat.service';

@Controller('stat')
@UseGuards(AuthGuard('bearer'))
export class StatController {
  constructor(private statService: StatService) {}
  @Get('calorie-count')
  async getTodaysCalorieCount(@Req() req) {
    const result = await this.statService.getTodaysCalorieCount(req);
    return result;
  }

  @Get('/admin')
  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async getAdminStats() {
    const result = await this.statService.getAdminStats();
    return result;
  }
}
