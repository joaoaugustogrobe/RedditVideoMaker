import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    let userExists;
    try {
      userExists = await this.findUserByEmail(user.email);
      const jwt = this.generateJwt({
        sub: userExists.id,
        displayName: userExists.displayName,
        email: userExists.email,
      });
      console.log('user found, returning token', jwt);

      return jwt;
    } catch (e) {
      console.log('FAILED TO FETCH USER PROFILE FROM DB!');
      console.error(e);
    }

    if (!userExists) {
      return this.registerUser(user);
    }
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.findOneBy({ email });
    return user ? user : null;
  }

  async registerUser(user) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return this.generateJwt({
        sub: newUser[0].id,
        displayName: newUser[0].displayName,
        email: newUser[0].email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userRepository.findOneBy({ email: details.email });
    //update user - last login, profile pic, etc
    console.log('User from DB', user);
    if (user) return user;
    console.log('User not found, creating before return user');

    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }
}
