import { Controller, Post, Body, Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { Event } from './model/entities/events.entity';
import { EventsService } from './events.service';
import { Param } from '@nestjs/common/decorators';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { GetEventDto } from './dto/get-event.dto';
import { UsersService } from 'src/users/users.service';
import { GetUserDto } from 'src/users/dto/get_user.dto';
import { UpdateEventUsersDto } from './dto/updateUserEvent.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('events')
export class EventsController {
  constructor( private readonly eventsService: EventsService,private usersService:UsersService) {}

  @Get('find/:id_user')
  findEventByIdAdmin(@Param('id_user') id: number){
    return this.eventsService.findEventByIdAdmin(+id);
  }

  @Get('')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get('userInvitation/:idUser')
  findInvitation(@Param('idUser') id: number){
    return this.eventsService.findInvitation(+id);
  }
  @Get('findUser/:id')
  findAllUserInEvent(@Param('id') id: number){
    return this.eventsService.findAllUserInEvent(+id);
  }

  @Get('findEvent/:id')
  findAllEventWithIdUser(@Param('id') id_user: number){
    return this.eventsService.findAllEventWithIdUser(+id_user);
  }

  @Post('accept_Invitation/:id_invitation')
  accept_Invitation(@Param('id_invitation') id_invitation:number){
    return this.eventsService.accept_Invitation(id_invitation);
  }
  @Post('register')
  async register(@Body() event:CreateEventDto) {
    return this.eventsService.create(event);
  }

  @Patch('adduser/:id')
  async updateEventUsers( @Param('id') eventId: string,@Body() email:GetUserDto
  ){
    return this.eventsService.updateEventUsers(eventId,email);
  }


  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() Event: UpdateEventDto) {
    return this.eventsService.updateEvent(id, Event);
  }

  @Delete('deluser/:id')
  async DeleteEventUsers( @Param('id') eventId: string,@Body() updateEventUsersDto: UpdateEventDto,
  ): Promise<void> {
    return this.eventsService.deleteEventUsers(eventId,updateEventUsersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Delete('deleteInvitation/:id')
  deleteInvitation(@Param('id') id:string){
    return this.eventsService.delete_Invitation(+id);
  }
}
