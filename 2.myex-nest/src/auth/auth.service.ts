import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dots/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }
  
  async register(body: CreateUserDto) {
    const { name, email, password } = body;

    const user = await this.usersService.find(email);
    if (user.length) {
      console.log(user.length)
      throw new BadRequestException('Email already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    const hashPassword = salt + '.' + hash.toString('hex');

    return this.usersService.create(name, email, hashPassword);
  }

  async login(@Body() body: LoginUserDto) {
    const [user] = await this.usersService.find(body.email);
    if (!user) {
      throw new BadRequestException('Username or Password is incorrect');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(body.password, salt, 64)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Username or Password is incorrect');
    }
    return user;
  }
}

