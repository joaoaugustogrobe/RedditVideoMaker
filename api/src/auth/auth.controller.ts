import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    console.log('> HandleLogin');
    return {
      msg: 'Google Authentication',
    };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    console.log('> Handle redirect', req.user);
    const token = await this.authService.signIn(req.user);
    console.log('token', token);

    // return { mgs: 'ok', token };
    return res
      .status(HttpStatus.OK)
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .json({ msg: 'ok', token });
  }
}
