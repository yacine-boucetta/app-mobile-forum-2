import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from 'src/users/dto/get_user.dto';
import { User } from 'src/users/model/entities/users.entity';
import { Repository} from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-dto';
import { Event } from './model/entities/events.entity';
import { UserEvent } from 'src/userEvent.entity';


@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserEvent)
    private userEventRepository: Repository<UserEvent>
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
    await this.eventsRepository.manager.save(newEvent);
       
  }

  async updateEventUsers(id: string, User:GetUserDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({email:User.email});
    const event = await this.eventsRepository.findOneBy({id:+id});
    const userEvent = new UserEvent();
    userEvent.user = user;
    userEvent.event = event;
    userEvent.isInvitated=false;

    this.userEventRepository
    .createQueryBuilder()
    .select("*")
    .where("userId = "+ user.id+" and eventId = "+event.id)
    .execute()
    .then(elm => {if (elm.length){
      return 
    }else{
      this.userEventRepository.save(userEvent)
    }
  })

  
  }

  async deleteEventUsers(id: string,id_user:string): Promise<void> {

  
    const user = await this.usersRepository.findOneBy({id:+id_user});
   
    const events = await this.eventsRepository.findOneBy({id:+id});

    const userEvent = new UserEvent();
    userEvent.user = user;
    userEvent.event = events;


    await this.userEventRepository
    .createQueryBuilder()
    .delete()
    .where("userId = "+ user.id+" and eventId = "+events.id)
    .execute()
  }


  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findEventByIdAdmin(id_user: number) {
    return this.eventsRepository.findBy({ id_user: id_user });
  }

  async findAllUserInEvent(id_event: number):Promise<User[]> {
    return await this.usersRepository
    .createQueryBuilder()
    .select("user.name,user.email,user.url,user.id")
    .innerJoin("user_event","user_event","user_event.userId = user.id")
    .innerJoin("event","event","user_event.eventId = event.id")
    .where("user_event.eventId = "+ id_event)
    .execute()
  }

async findInvitation(id_user:number){
 return await this.eventsRepository
  .createQueryBuilder()
  .select("event.description,event.start_date,event.end_date,event.name,event.id,user_event.id")
  .innerJoin("user_event","user_event","user_event.eventId = event.id")
  .innerJoin("user","user","user_event.userId = user.id")
  .where("user.id = "+ id_user +" and user_event.isInvitated = false")
  .execute()
}

delete_Invitation(id_user_event:number){
return this.userEventRepository.delete(id_user_event);
}

async accept_Invitation(id_invitation:number){
return await this.userEventRepository
.createQueryBuilder()
.update()
.set({isInvitated:true})
.where("user_event.id = " + id_invitation).execute()
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
    this.userEventRepository.createQueryBuilder()
    .delete()
    .where("user_event.eventId = "+ id)

    this.eventsRepository.delete({id});
  }
}


