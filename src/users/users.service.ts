import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async findAll() {
    return await this.db.user.findMany();
  }

  async findOne() {
    return await this.db.user.findFirst();
  }
}
