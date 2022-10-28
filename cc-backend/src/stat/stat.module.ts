import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodRecordSchema } from 'src/foodrecord/foodrecord.schema';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FoodRecord', schema: FoodRecordSchema },
    ]),
  ],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
