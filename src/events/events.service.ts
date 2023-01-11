import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { Event } from './model/entities/events.entity';
import { EventInterface } from './model/events.interface';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly eventsRepository: Repository<Event>
  ) {}

 async create(event: CreateEventDto)  {
  
   return this.eventsRepository.save({
    name:event.name,
    start_date:new Date(),
    end_date:new Date(),
    id_user:event.id_user,
    event_state:event.event_state,
    description:event.description
  })
     
  }   
      
  

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  async updateEvent(id: string, event:UpdateEventDto) {
    const updateEventDatabase = this.eventsRepository
      .update(id,{
        name: event.name,
        description: event.name,
        start_date: new Date(),
        end_date: new Date(),
        id_user: event.id_user,
        event_state: event.event_state,
      })
      
      
    return await updateEventDatabase;
  }
  remove(id: number) {
    return this.eventsRepository.delete({ id });
  }
}
