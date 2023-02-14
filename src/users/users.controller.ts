import { Controller, Post, Body, Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { User } from './model/entities/users.entity';
import { UsersService } from './users.service';
import { Param } from '@nestjs/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOneByEmail(@Param('email') email:string){
    return this.usersService.findOneByEmail(email)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto){
    return this.usersService.updateUser(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
