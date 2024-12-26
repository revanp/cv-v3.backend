import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.usersService.findOne(username);

      if (!user) {
        throw new BadRequestException('Invalid credentials.');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalid credentials.');
      }

      const accessToken = await this.jwtService.signAsync({
        username: user.username,
        email: user.email,
        name: user.name,
      });

      return {
        accessToken,
        username: user.username,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
