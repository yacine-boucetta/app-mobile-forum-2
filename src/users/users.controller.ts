import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body, UseGuards } from '@nestjs/common/decorators';
import { get } from 'http';
import { User } from './users.entity';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async create(@Body() user: any) {
    return this.usersService.create(user);
  }
  @Post('login')
  async login(@Body() user: any) {
    const { email, password } = user;
    return this.usersService.login(email, password);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
 

}
