import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbService } from 'src/db.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, DbService],
  controllers: [UsersController],
})
export class UsersModule {}
