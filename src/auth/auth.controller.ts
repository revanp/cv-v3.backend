import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: { username: string; password: string }) {
    return await this.authService.login(payload.username, payload.password);
  }
}
