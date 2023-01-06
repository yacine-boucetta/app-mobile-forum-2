import { Controller, Post, Body,Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Param } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() UserEntity: User) {
    return this.usersService.create(UserEntity);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string ,@Body() UserEntity: User){
      return this.usersService.updateUser(id, UserEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.usersService.remove(+id)
  }

}
