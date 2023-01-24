import { Controller, Post, Body, Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { Event } from './model/entities/events.entity';
import { EventsService } from './events.service';
import { Param } from '@nestjs/common/decorators';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { GetEventDto } from './dto/get-event.dto';

@Controller('events')
export class EventsController {
  constructor( private readonly eventsService: EventsService) {}

  @Post('register')
  async register(@Body() event:CreateEventDto) {
    return this.eventsService.create(event);
  }

  @Get(':id')
  findEventByIdAdmin(@Param('id') id: string, @Body() Event: GetEventDto ){
    return this.eventsService.findEventByIdAdmin(+id,Event);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() Event: UpdateEventDto) {
    return this.eventsService.updateEvent(id, Event);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
