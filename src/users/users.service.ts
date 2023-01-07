import { Injectable, Inject, Body } from '@nestjs/common';


import { EntitySchemaEmbeddedColumnOptions, Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {

  constructor(
    @Inject('user')
    private usersRepository: Repository<User>,
  ) {}
  
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id:number) {
    return this.usersRepository.findOneBy({ id });
  }
  
  
  async create(userentity: User) {
    
    this.usersRepository.create(userentity);
    const insertUserDatabse = this.usersRepository

    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{
     email:userentity.email,
     name:userentity.name,
     lastname:userentity.lastname,
     password:await bcrypt.hash(userentity.password,10)
    }]
    )
    .execute();
    // const insertUsecreatedUser.id,createdUser.name,createdUser.lastname,createdUser.passwordrDatabse= this.usersRepository'
    // .query('INSERT INTO user (email,name,lastname,password) Value ("createdUser.id",'createdUser.name','createdUser.lastname','createdUser.password) ')
    await insertUserDatabse;
  }
  async login(email: any, password: any): Promise<{ success: boolean, message: string, user?: any }> {
    const user = await this.usersRepository.findOneBy({email});
    if (!user) {
      return { success: false, message: 'Login failed. Invalid username or password.' };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return { success: true, message: 'Login successful.', user };
    }
    return { success: false, message: 'Login failed. Invalid username or password.' };
  }
  
}