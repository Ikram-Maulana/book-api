import { JwtGuard } from './../guard/jwt.guards';
import { LoginResponse } from './interface/login-response.interface';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Patch('/:id/revoke')
  @UseGuards(JwtGuard)
  async revokeRefreshToken(@Body() id: string): Promise<void> {
    return await this.authService.revokeRefreshToken(id);
  }
}
