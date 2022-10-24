import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, BearerStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
