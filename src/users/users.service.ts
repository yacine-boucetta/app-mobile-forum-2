import { Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './model/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEvent } from 'src/userEvent.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UserEvent) private userEventRepository: Repository<UserEvent>
  ) {}

  async create(user: CreateUserDto) {
    const passwordHash= await bcrypt.hash(user.password,10);
    const getUserbefore= await this.usersRepository.findAndCountBy({isAdmin:true});
  
    if(getUserbefore[1] >=1){
    return this.usersRepository.save(
      {
        email:user.email,
        name:user.name,
        url:user.url,
        lastname:user.lastname,
        password: passwordHash,
        isAdmin:false,
      }
    )}
    else{
      return this.usersRepository.save(
        {
          email:user.email,
          name:user.name,
          url:user.url,
          lastname:user.lastname,
          password: passwordHash,
          isAdmin:true,
        }
    )};
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email:string){
    return await this.usersRepository.findOneBy({email:email});
  }
  async findOne(id: number) {
    return  await this.usersRepository.findOneBy({ id });
  }
  
  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    var passwordHash= user.password;
    if(user.password){
      passwordHash = await bcrypt.hash(user.password,10);
    }


    const updateuserDatabase = await this.usersRepository.findOneBy({id:id} );
    updateuserDatabase.id= id;
    updateuserDatabase.email=user.email;
    updateuserDatabase.isAdmin=false;
    updateuserDatabase.name=user.name;
    updateuserDatabase.url=user.url;
    updateuserDatabase.lastname=user.lastname;
    updateuserDatabase.password=passwordHash;


    return await this.usersRepository.manager.save(updateuserDatabase);
 
  }


 async remove(id: number) {
  
    const getUserbefore= await this.usersRepository.findAndCountBy({isAdmin:true});
    if(getUserbefore[1]==1){
        return"your application need an administrator";
    }else{
      this.userEventRepository.createQueryBuilder()
  .delete()
  .where("user_event.userID=:id",{id:id})
        return this.usersRepository.delete({ id });
    }
  }
}
