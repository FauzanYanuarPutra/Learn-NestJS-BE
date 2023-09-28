import { Body, Controller, Get, Post, Session, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dots/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserDto } from 'src/users/dots/user.dto';
import { serialize } from 'src/interceptors/serialize.interceptors';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorators';
import { UserSchema } from 'src/users/user.entity';

@Controller('auth')
@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body);
    session.userId = user.id;
    return user
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.login(body);
    session.userId = user.id;
    return user
  }

  @Post('/logout')
  async logout(@Session() session: any) {
    session.currentUser = null
    session.userId = null
    return 'logout'
  }

  @Get('/user')
  async user(@CurrentUser() currentUser: UserSchema) {
    return currentUser
  }
}


