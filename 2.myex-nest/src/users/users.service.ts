import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from './user.entity';
import {  Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserSchema) private userRepository: Repository<UserSchema>) { }
  
  find(email?:string) {
    return this.userRepository.find({
      where: { 
        email
      }
    });
  }

  async findOneBy(id: string | number) {
    const numId = Number(id);
    if (isNaN(numId)) {
      throw new BadRequestException('Id must be a valid number');
    }
    const user = await this.userRepository.findOneBy({ id: numId });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return user;
  }
  
  create(name: string, email: string, password: string) {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }

  async update(id: string, attrs: Partial<UserSchema>) {
    const user = await this.findOneBy(id);
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOneBy(id);
    return this.userRepository.remove(user);
  }
}


