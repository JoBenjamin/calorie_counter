import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodrecordController } from './foodrecord.controller';
import { FoodRecordSchema } from './foodrecord.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FoodRecord', schema: FoodRecordSchema },
    ]),
  ],
  controllers: [FoodrecordController],
})
export class FoodrecordModule {}
