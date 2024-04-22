import { Module } from '@nestjs/common';
import { DataBaseService } from './dataBase.service';
import { DataBaseController } from './dataBase.controller';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  providers: [DataBaseService],
  controllers: [DataBaseController],
})
export class DatabaseModule {}