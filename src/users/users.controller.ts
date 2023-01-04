import { Controller, Post, Body } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { User } from './users.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post('register')
    async register(@Body() UserEntity: User){
        return  this.usersService.create(UserEntity)
    }

    @Get()
    findAll() {
      return this.usersService.findAll();
    }
}
