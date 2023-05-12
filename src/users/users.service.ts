import { Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './model/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email:string){
    console.log(email)
    return this.usersRepository.findOneBy({email:email});
  }
  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  
  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    var passwordHash= user.password;
    if(user.password){
      passwordHash = await bcrypt.hash(user.password,10);
    }
    return this.usersRepository.update(id,
    {
      email:user.email,
      name:user.name,
      url:user.url,
      lastname:user.lastname,
      password:passwordHash,
      isAdmin:user.isAdmin,
    });
  }


 async remove(id: number) {
    const getUserbefore= await this.usersRepository.findAndCountBy({isAdmin:true});
    if(getUserbefore[1]==1){
        return"your application need an administrator";
    }else{
        return this.usersRepository.delete({ id });
    }
  }
}
