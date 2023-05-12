import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { PicturesService } from 'src/pictures/pictures.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AdminGuard } from './admin.guard';


@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(
        private readonly usersService: UsersService,
        private readonly picturesService: PicturesService,
        private readonly eventsService:EventsService
        ) {}
    
    @Get('users')
    
    findAllUser() {
      return this.usersService.findAll();
    }
  
    @Patch('updateUser/:id')
    updateUserbyAdmin(@Param('id') id: string, @Body() user: UpdateUserDto){
      return this.usersService.updateUser(+id, user);
    }
  
    @Delete(':id')
    removeUser(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }

    @Get('pictures')
    findAllPicture() {
      return this.picturesService.findAll();
    }

    @Delete('pictures/:id')
    removePicture(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }

    @Get('events')
    findAllEvent() {
      return this.eventsService.findAll();
    }

    @Delete('events/:id')
    removeEvent(@Param('id') id: string) {
      return this.eventsService.remove(+id);
    }


  }
  

