import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './events.entity';


@Injectable()
export class EventsService {
  constructor(
    @Inject('event')
    private eventsRepository: Repository<Event>,
  ) {}

  async create(eventsentity: Event) {

    const insertEventDatabse = this.eventsRepository
      .createQueryBuilder()
      .insert()
      .into(Event)
      .values([
        {
            name: eventsentity.name,
            description: eventsentity.name,
            start_date: eventsentity.start_date,
            end_date: eventsentity.end_date,
            id_user: eventsentity.id_user,
            event_state: eventsentity.event_state
        }
      ])
      .execute();
    await insertEventDatabse;
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

async  updateEvent(id: string,eventsentity:Event) {
    const updateEventDatabase = this.eventsRepository
    .createQueryBuilder()
    .update(Event)
    .set({
        name: eventsentity.name,
        description: eventsentity.name,
        start_date: eventsentity.start_date,
        end_date: eventsentity.end_date,
        id_user: eventsentity.id_user,
        event_state: eventsentity.event_state
    })
    .where("id = :id", { id: id})
    .execute()
    return await updateEventDatabase;
  }
  remove(id: number) {
    return this.eventsRepository.delete({ id });
  }
}