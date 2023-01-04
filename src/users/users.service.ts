import { Injectable, Inject } from '@nestjs/common';
import { EntitySchemaEmbeddedColumnOptions, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  findAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('user')
    private usersRepository: Repository<User>,
  ) {}

  async create(userentity: User): Promise<User> {
    const createdUser = this.usersRepository.create(userentity);
    return await createdUser;
}


 
}