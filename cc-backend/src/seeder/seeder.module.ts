import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodRecordSchema } from 'src/foodrecord/foodrecord.schema';
import { UserSchema } from 'src/user/user.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'FoodRecord', schema: FoodRecordSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
