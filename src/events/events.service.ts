import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDate } from 'util/types';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventDto } from './dto/get-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { Event } from './model/entities/events.entity';
import { EventInterface } from './model/events.interface';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly eventsRepository: Repository<Event>
  ) {}

 async create(event: CreateEventDto)  {

;
    return this.eventsRepository.save({
    name:event.name,
    start_date:event.start_date,
    end_date:event.end_date,
    id_user:event.id_user,
    event_state:event.event_state,
    description:event.description,
    url_event:event.url_event,
    isPrivate:event.isPrivate
  })

  }   
      


  findAll(): Promise<Event[]> {
    return  this.eventsRepository.find();
  }
  
  async findEventByIdAdmin(id_user: number) {
    return  this.eventsRepository.findBy({id_user:id_user});

  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  async updateEvent(id: string, event:UpdateEventDto) {
    const updateEventDatabase = this.eventsRepository
      .update(id,{
        name: event.name,
        description: event.name,
        start_date: event.start_date,
        end_date: event.end_date,
        id_user: event.id_user,
        event_state: event.event_state,
        isPrivate:event.isPrivate
      })
      
      
    return await updateEventDatabase;
  }
  remove(id: number) {
    return this.eventsRepository.delete({ id });
  }
}

