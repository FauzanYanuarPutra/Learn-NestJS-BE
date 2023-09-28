import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dots/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dots/update-user';
import { serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dots/user.dto';

@Controller('users')
@serialize(UserDto)
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
}
