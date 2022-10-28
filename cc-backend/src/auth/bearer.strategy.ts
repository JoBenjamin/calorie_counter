import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(token) {
    const user = await this.authService.getUserByToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      _id: user._id,
      email: user.email,
      roles: user.roles,
      dailyCalorieLimit: user.dailyCalorieLimit,
    };
  }
}
