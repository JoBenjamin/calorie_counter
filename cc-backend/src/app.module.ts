import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodrecordModule } from './foodrecord/foodrecord.module';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './seeder/seeder.module';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/calorieCounter',
    ),
    UserModule,
    FoodrecordModule,
    AuthModule,
    CommandModule,
    SeederModule,
    StatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
