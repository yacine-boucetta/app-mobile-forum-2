import { Controller, Post, Body,Delete } from '@nestjs/common';
import { Get, Patch, Put } from '@nestjs/common/decorators';
import { Event } from './events.entity';
import { EventsService } from './events.service';
import { Param } from '@nestjs/common/decorators';
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('register')
  async register(@Body() eventEntity: Event) {
    return this.eventsService.create(eventEntity);
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
  updateUser(@Param('id') id: string ,@Body() UserEntity: Event){
      return this.eventsService.updateEvent(id, UserEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.eventsService.remove(+id)
  }

}
