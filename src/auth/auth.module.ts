import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { DbService } from 'src/db.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, DbService],
})
export class AuthModule {}
