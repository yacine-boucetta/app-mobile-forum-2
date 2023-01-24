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

  async create(user: CreateUserDto): Promise<UserInterface> {
    const passwordHash= await bcrypt.hash(user.password,10);
    return this.usersRepository.save(
      {
        email:user.email,
        name:user.name,
        url:user.url,
        lastname:user.lastname,
        password: passwordHash,
      }
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email:string){
    return this.usersRepository.findOneBy({ email});
  }
  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
  
  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    const passwordHash= await bcrypt.hash(user.password,10);
    
    return this.usersRepository.update(id,
    {
      email:user.email,
      name:user.name,
      url:user.url,
      lastname:user.lastname,
      password: passwordHash
    });
  }


  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
