import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Role } from '../role.enum';
import { sleep } from 'src/utils';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      //Change dotenv to nestjs env variables
      clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH2_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH2_GOOGLE_REDIRECT,
      scope: ['email', 'profile'], //Check if the setup is correct in google console oauth screen
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    // prevent double callback in _executeRequest - https://github.com/ciaranj/node-oauth/pull/363
    await sleep(1000);

    // check how to get refreshToken
    // const user = await this.authService.validateUser({
    //   email: profile.emails[0].value,
    //   displayName: profile.displayName,
    //   role: Role.Regular,
    // });
    const JWTToken = await this.authService.signIn({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });

    done(null, {
      email: profile.emails[0].value,
      displayName: profile.displayName,
      JWT: JWTToken,
    });
  }
}
