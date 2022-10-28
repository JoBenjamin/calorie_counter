import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
}
