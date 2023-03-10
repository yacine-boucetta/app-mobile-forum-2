import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from 'src/users/dto/get_user.dto';
import { User } from 'src/users/model/entities/users.entity';
import { Entity, getConnection, In, RelationQueryBuilder, Repository} from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { UpdateEventUsersDto } from './dto/updateUserEvent.dto';
import { Event } from './model/entities/events.entity';



@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(event: CreateEventDto) {

    const reqsUser=await this.usersRepository.findOneBy({id:event.id_user});
    const newUser =new User();
    newUser.id=reqsUser.id;
    this.usersRepository.save(newUser);

    const newEvent = new Event();
      newEvent.name = event.name,
      newEvent.url_event = event.url_event,
      newEvent.id_user = event.id_user,
      newEvent.start_date = new Date(),
      newEvent.end_date = new Date(),
      newEvent.isPrivate = event.isPrivate,
      newEvent.description = event.description,
      newEvent.users = [newUser];

    await this.eventsRepository.manager.save(newEvent);
  }

  async updateEventUsers(id: string, email:GetUserDto): Promise<void> {
    const reqsUser=await this.usersRepository.findBy({email:email.email});
    let newUser =new User();
    newUser.id=reqsUser[0].id;
    await this.usersRepository.save(newUser);

    await this.eventsRepository
    .createQueryBuilder()
    .relation(Event, "users")
    .of(id)
    .add(newUser);

  }

   async deleteEventUsers(id: string, event: UpdateEventDto): Promise<void> {
    const reqsUser=await this.usersRepository.findOneBy({id:event.id_user});
    const newUser =new User();
    newUser.id=reqsUser.id;
    this.usersRepository.save(newUser);

    this.eventsRepository
      .createQueryBuilder()
      .relation(Event, "users")
      .of(id)
      .remove(newUser)
  }


  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findEventByIdAdmin(id_user: number) {
    return this.eventsRepository.findBy({ id_user: id_user });
  }

  async findAllUserInEvent(id_event: number) {

  return await  this.eventsRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect("event.users", "user")
    .where("event.id=:id",{id:id_event})
    .getMany()
  }

  async findAllEventWithIdUser(id_user: number) {

    return await  this.usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect("user.events", "event")
      .where("user.id=:id",{id:id_user})
      .getMany()
    }

  findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  async updateEvent(id: string, event: UpdateEventDto) {
 
    let test = new Array();
    
    const updateEventDatabase = await this.eventsRepository.findOneBy({id:+id} );
    updateEventDatabase.name= event.name,
    updateEventDatabase.description= event.description,
    updateEventDatabase.start_date= event.start_date,
    updateEventDatabase.end_date= event.end_date,
    updateEventDatabase.id_user= event.id_user,
    updateEventDatabase.isPrivate= event.isPrivate;

    return await this.eventsRepository.manager.save(updateEventDatabase);
  }
  remove(id: number) {
    return this.eventsRepository.delete({ id });
  }
}


