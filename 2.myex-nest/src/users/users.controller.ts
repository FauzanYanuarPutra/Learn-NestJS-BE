import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dots/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dots/update-user';
import { serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dots/user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { UserSchema } from './user.entity';
import { CurrentUserInterceptor } from 'src/auth/interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  findAllUsers(@Query('email') email: string){
    return this.usersService.find(email);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOneBy(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('/user/current-user')
  @UseGuards(AuthGuard)
  async user(@CurrentUser() currentUser: UserSchema) {
    return currentUser
  }

}
