import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/users/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersService } from 'src/users/users.service';
// import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, CurrentUserInterceptor],

})
export class AuthModule { }




