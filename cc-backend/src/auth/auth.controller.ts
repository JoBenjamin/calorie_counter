import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('bearer'))
export class AuthController {
  @Get('/whoami')
  async verifyUser(@Req() req) {
    if (!req.user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);
    }
    return req.user;
  }
}
